import hashlib
from io import BytesIO

import os
import zipfile

from PIL import Image
from pyspark.ml.image import ImageSchema
from pyspark.sql.functions import udf, pandas_udf
from pyspark.sql.types import ArrayType, StringType

import pandas as pd

def to_image(data: bytes):
    """Converts PNG image based bytes data and converts it into OpenCV compatible Image type. This is the basis of diplaying images stored in Spark dataframes witin Databricks.
    :param bytes data - PNG image bytes
    """
    sig = hashlib.md5(data).hexdigest()

    b = BytesIO(initial_bytes=data)
    format = "RGBA"
    r, g, b, a = Image.open(b).convert(format).split()  # Convert to get matrix of pixel values
    imgx = Image.merge(format, (b, g, r, a))  # Flip color bands
    return {
        "image": [
            f"file-{sig}.png",
            imgx.height,
            imgx.width,
            4,  #
            ImageSchema.ocvTypes["CV_8UC4"],
            imgx.tobytes(),
        ]
    }

def _file_reader_helper(path):
    """Helper function to determine file reader based on path"""
    if path.startswith("s3://"):
        import s3fs
        from botocore.exceptions import NoCredentialsError

        fs = s3fs.S3FileSystem(anon=False)
        try:
            fs.exists(path)
        except NoCredentialsError:
            fs = s3fs.S3FileSystem(anon=True)
        fp = fs.open(path)
    elif path.startswith("dbfs:/Volumes/"):
        fp = open(path.replace("dbfs:/Volumes/","/Volumes/"), 'rb')
    elif path.startswith("dbfs:/"):
        fp = open(path.replace("dbfs:/","/dbfs/"), 'rb')
    else:
        fp = open(path, 'rb')
    return fp.read()

@udf
def identify_type_udf(path:str):
    """Identifies the file type of a file based on the magic string."""
    import magic
    return magic.from_buffer(_file_reader_helper(path))


def unzip(path, unzipped_base_path):
    """Unzips a file and returns a list of files that were unzipped."""
    list = []
    bytex = BytesIO(_file_reader_helper(path))

    # Check if file is zip
    is_zip = zipfile.is_zipfile(bytex)
    if not is_zip:
        return [path]
    
    zip_archive = zipfile.ZipFile(bytex, 'r')
    for file_name in zip_archive.namelist():
        if (not os.path.basename(file_name).startswith('.') and not file_name.endswith('/')):

            file_object = zip_archive.open(file_name, 'r')
            file_like_object = file_object.read()

            file_path = os.path.join(unzipped_base_path, file_name)

            file_dir = os.path.dirname(file_path)
            if not os.path.exists(file_dir):
                os.makedirs(file_dir)

            with open(file_path, 'wb') as f:
                f.write(file_like_object)
            
            list.append(file_path)
    return list

@pandas_udf(ArrayType(StringType()))
def unzip_pandas_udf(col1, col2):
    return pd.Series([ unzip(path, volume_base_path) for path, volume_base_path in zip(col1, col2) ])

DICOM_MAGIC_STRING = "DICOM medical imaging data"
ZIP_MAGIC_STRING = "Zip archive data"
