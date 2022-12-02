# Databricks notebook source
# MAGIC %md 
# MAGIC You may find this solution accelerator at https://github.com/databricks-industry-solutions/pixels. 

# COMMAND ----------

# MAGIC %md
# MAGIC 
# MAGIC # Scale Dicom based image processing
# MAGIC 
# MAGIC ---
# MAGIC 
# MAGIC ![Dicom Image processing](https://dicom.offis.uni-oldenburg.de/images/dicomlogo.gif)
# MAGIC 
# MAGIC About DICOM: Overview
# MAGIC DICOM® — Digital Imaging and Communications in Medicine — is the international standard for medical images and related information. It defines the formats for medical images that can be exchanged with the data and quality necessary for clinical use.
# MAGIC 
# MAGIC DICOM® is implemented in almost every radiology, cardiology imaging, and radiotherapy device (X-ray, CT, MRI, ultrasound, etc.), and increasingly in devices in other medical domains such as ophthalmology and dentistry. With hundreds of thousands of medical imaging devices in use, DICOM® is one of the most widely deployed healthcare messaging Standards in the world. There are literally billions of DICOM® images currently in use for clinical care.
# MAGIC 
# MAGIC Since its first publication in 1993, DICOM® has revolutionized the practice of radiology, allowing the replacement of X-ray film with a fully digital workflow. Much as the Internet has become the platform for new consumer information applications, DICOM® has enabled advanced medical imaging applications that have “changed the face of clinical medicine”. From the emergency department, to cardiac stress testing, to breast cancer detection, DICOM® is the standard that makes medical imaging work — for doctors and for patients.
# MAGIC 
# MAGIC DICOM® is recognized by the International Organization for Standardization as the ISO 12052 standard.
# MAGIC 
# MAGIC ---
# MAGIC ## About databricks.pixels
# MAGIC - Use `databricks.pixels` python package for simplicity
# MAGIC   - Catalog your images
# MAGIC   - Extract Metadata
# MAGIC   - Display thumbnails
# MAGIC   
# MAGIC - Scale up Image processing over multiple-cores and nodes
# MAGIC - Delta lake & Delta Engine accelerate metadata research.
# MAGIC - Delta lake (optionally) to speed up small file processing
# MAGIC - Mix of Spark and Python scale out processing
# MAGIC - Core libraries `python-gdcm` `pydicom`, well maintained 'standard' python packages for processing Dicom files.
# MAGIC 
# MAGIC author: douglas.moore@databricks.com
# MAGIC 
# MAGIC tags: dicom, dcm, pre-processing, visualization, repos, python, spark, pyspark, package, image catalog, mamograms, dcm file

# COMMAND ----------

# DBTITLE 1,This token is no longer needed once this repo becomes public - when that happens please adjust the block below
token = dbutils.secrets.get("solution-accelerator-cicd", "github-pat") 

# COMMAND ----------

# DBTITLE 1,Install requirements
# MAGIC %pip install git+https://token:$token@github.com/databricks-industry-solutions/pixels.git

# COMMAND ----------

# DBTITLE 1,Collect raw input path and catalog table
dbutils.widgets.text("path", "s3://hls-eng-data-public/dicom/ddsm/", label="1.0 Path to directory tree containing files. /dbfs or s3:// supported")
dbutils.widgets.text("table", "hive_metastore.pixels_solacc.object_catalog", label="2.0 Catalog Schema Table to store object metadata into")
dbutils.widgets.dropdown("mode",defaultValue="overwrite",choices=["overwrite","append"], label="3.0 Update mode on object metadata table")

path = dbutils.widgets.get("path")
table = dbutils.widgets.get("table")
write_mode = dbutils.widgets.get("mode")

spark.conf.set('c.table',table)
print(F"{path}, {table}, {write_mode}")

# COMMAND ----------

# DBTITLE 1,Reinitiate the database we use for this accelerator
database_name = table.split(".")[1]
spark.sql(f"DROP DATABASE IF EXISTS {database_name} CASCADE")
spark.sql(f"CREATE DATABASE {database_name}")

# COMMAND ----------

# MAGIC %md ### List a few sample raw Dicom files on cloud storage

# COMMAND ----------

if path.startswith("s3"):
  display(dbutils.fs.ls(path))
else:
  display(dbutils.fs.ls(F"file:///{path}"))

# COMMAND ----------

# MAGIC %md ## Catalog the objects and files
# MAGIC `databricks.pixels.Catalog` just looks at the file metadata
# MAGIC The Catalog function recursively list all files, parsing the path and filename into a dataframe. This dataframe can be saved into a file 'catalog'. This file catalog can be the basis of further annotations

# COMMAND ----------

from databricks.pixels import Catalog, DicomFrames
catalog_df = Catalog.catalog(spark, path)
display(catalog_df)

# COMMAND ----------

# MAGIC %md ## Save and explore the metadata

# COMMAND ----------

# DBTITLE 1,Save Metadata as a 'object metadata catalog'
Catalog.save(catalog_df, table=table, mode=write_mode)

# COMMAND ----------

# MAGIC %sql select count(*) from ${c.table}

# COMMAND ----------

# MAGIC %md ## Load Catalog from Delta Lake

# COMMAND ----------

from databricks.pixels import Catalog
catalog_df = Catalog.load(spark, table=table)
display(catalog_df)

# COMMAND ----------

catalog_df.count()

# COMMAND ----------

# MAGIC %md ## Extract Metadata from the Dicom images
# MAGIC Using the Catalog dataframe, we can now open each Dicom file and extract the metadata from the Dicom file header. This operation runs in parallel, speeding up processing. The resulting `dcm_df` does not in-line the entire Dicom file. Dicom files tend to be larger so we process Dicom files only by reference.
# MAGIC 
# MAGIC Under the covers we use PyDicom and gdcm to parse the Dicom files
# MAGIC 
# MAGIC The Dicom metadata is extracted into a JSON string formatted column named `meta`

# COMMAND ----------

meta_df.limit(10).display()

# COMMAND ----------

def dicom_meta_udf(path:str, deep:bool = True) -> dict:
    """Extract metadata from header of dicom image file
      path: local path like /dbfs/mnt/... or s3://<bucket>/path/to/object.dcm
    """
    from pydicom import dcmread
    from pydicom.errors import InvalidDicomError
    import numpy as np
    import s3fs

    if path.startswith("s3://"):
        """Read from S3 directly"""
        fs = s3fs.S3FileSystem(anon=True)
        fp = fs.open(path)
    else:
      """Read from local filesystem"""
      fp = open(path, 'rb')
    with dcmread(fp, defer_size=1000, stop_before_pixels=(not deep)) as ds:
        js = ds.to_json_dict()
        # remove binary images
        if '60003000' in js:
            del js['60003000']
        if '7FE00010' in js:
            del js['7FE00010']

        if deep:
            a = ds.pixel_array
            a.flags.writeable = False
            js['hash'] = hash(a.data.tobytes())
            js['img_min'] = np.min(a)
            js['img_max'] = np.max(a)
            js['img_avg'] = np.average(a)
            js['img_shape_x'] = a.shape[0]
            js['img_shape_y'] = a.shape[1]

        return str(js)

# COMMAND ----------

pathx = "s3://hls-eng-data-public/dicom/ddsm/normals/patient4506/4506.LEFT_CC.dcm"
dicom_meta_udf(pathx)

# COMMAND ----------

# DBTITLE 1,Use a Transformer for metadata extraction
from databricks.pixels import DicomMetaExtractor # The transformer
meta = DicomMetaExtractor()
meta_df = meta.transform(catalog_df.repartition(10_000))
Catalog.save(meta_df, table=table, mode=write_mode)
display(spark.table(table))

# COMMAND ----------

# MAGIC %md ## Analyze Metadata

# COMMAND ----------

# MAGIC %sql 
# MAGIC select count(1) from ${c.table}

# COMMAND ----------

# MAGIC %sql
# MAGIC SELECT meta:['00100010'].Value[0].Alphabetic as patient_name, meta:hash, meta:img_min, meta:img_max, path, meta
# MAGIC FROM ${c.table}

# COMMAND ----------

# DBTITLE 1,Query the object metadata table using the JSON notation
# MAGIC %sql
# MAGIC SELECT rowid, meta:hash, meta:['00100010'].Value[0].Alphabetic as patient_name, meta:img_min, meta:img_max, path, meta
# MAGIC FROM ${c.table}
# MAGIC WHERE array_contains( path_tags, 'patient7747' )
# MAGIC order by patient_name

# COMMAND ----------

# MAGIC %md ## Filter Dicom Images

# COMMAND ----------

from databricks.pixels import Catalog
dcm_df_filtered = Catalog.load(spark, table=table).filter('meta:img_max < 1000').repartition(1000)
dcm_df_filtered.count()

# COMMAND ----------

# MAGIC %md # Display Dicom Images

# COMMAND ----------

from databricks.pixels import DicomFrames
plots = DicomFrames(dcm_df_filtered.limit(100), withMeta=True, inputCol="local_path").plotx()

# COMMAND ----------

plots

# COMMAND ----------

# MAGIC %md
# MAGIC Done

# COMMAND ----------


