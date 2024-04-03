"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([[270],{62889:(e,t,i)=>{i.r(t),i.d(t,{default:()=>z});const n=JSON.parse('{"UU":"@ohif/extension-dicom-microscopy"}').UU;var o=i(41766),s=i(21683),r=i(14283),a=i(80619),c=i(23109);function d(e,t){let i=!1;Array.isArray(e[0])||(e=[e],i=!0);const n=t[t.length-1],o=n.ImageOrientationSlide,s=function(e){if(e.PixelSpacing)return e.PixelSpacing;const t=e.SharedFunctionalGroupsSequence[0];return t.PixelMeasuresSequence[0].PixelSpacing}(n),r=n.TotalPixelMatrixOriginSequence[0],a=[Number(r.XOffsetInSlideCoordinateSystem),Number(r.YOffsetInSlideCoordinateSystem)];return e=e.map((e=>{const t=[e[0],e[1]],i=function(e){if(!("offset"in e))throw new Error('Option "offset" is required.');if(!Array.isArray(e.offset))throw new Error('Option "offset" must be an array.');if(2!==e.offset.length)throw new Error('Option "offset" must be an array with 2 elements.');const t=e.offset;if(!("orientation"in e))throw new Error('Option "orientation" is required.');if(!Array.isArray(e.orientation))throw new Error('Option "orientation" must be an array.');if(6!==e.orientation.length)throw new Error('Option "orientation" must be an array with 6 elements.');const i=e.orientation;if(!("spacing"in e))throw new Error('Option "spacing" is required.');if(!Array.isArray(e.spacing))throw new Error('Option "spacing" must be an array.');if(2!==e.spacing.length)throw new Error('Option "spacing" must be an array with 2 elements.');const n=e.spacing;if(!("point"in e))throw new Error('Option "point" is required.');if(!Array.isArray(e.point))throw new Error('Option "point" must be an array.');if(2!==e.point.length)throw new Error('Option "point" must be an array with 2 elements.');const o=e.point,s=[[i[0]*n[1],i[3]*n[0],t[0]],[i[1]*n[1],i[4]*n[0],t[1]],[0,0,1]],r=(0,c.WCD)(s),a=[[o[0]],[o[1]],[1]],d=(0,c.lwT)(r,a),l=Number(d[1][0].toFixed(4));return[Number(d[0][0].toFixed(4)),l]}({offset:a,orientation:o,spacing:s,point:t});return[i[0],-(i[1]+1),0]})),i?e[0]:e}const l={color:"rgba(255,255,255,0.4)"},u={color:"rgba(255,255,255,0.0)"},h={color:"rgb(0,255,0)",width:1.5},m={color:"rgb(255,255,0)",width:1.5},p={active:{image:{circle:{fill:l,stroke:m,radius:5}},fill:l,stroke:m},default:{image:{circle:{fill:u,stroke:h,radius:5}},fill:u,stroke:h}},g={ROI_ADDED:"dicommicroscopyviewer_roi_added",ROI_MODIFIED:"dicommicroscopyviewer_roi_modified",ROI_REMOVED:"dicommicroscopyviewer_roi_removed",ROI_DRAWN:"dicommicroscopyviewer_roi_drawn",ROI_SELECTED:"dicommicroscopyviewer_roi_selected",MOVE_STARTED:"dicommicroscopyviewer_move_started",MOVE_ENDED:"dicommicroscopyviewer_move_ended",LOADING_STARTED:"dicommicroscopyviewer_loading_started",LOADING_ENDED:"dicommicroscopyviewer_loading_ended",LOADING_ERROR:"dicommicroscopyviewer_loading_error",FRAME_LOADING_STARTED:"dicommicroscopyviewer_frame_loading_started",FRAME_LOADING_ENDED:"dicommicroscopyviewer_frame_loading_ended",FRAME_LOADING_ERROR:"dicommicroscopyviewer_frame_loading_ended"},I={ADDED:"added",MODIFIED:"modified",REMOVED:"removed",UPDATED:"updated",SELECTED:"selected"};class f extends r.Rc{constructor(e,t,i,n,o){super(I),this.viewer=e,this.viewportId=t,this.container=i,this.studyInstanceUID=n,this.seriesInstanceUID=o,this.onRoiAdded=this.roiAddedHandler.bind(this),this.onRoiModified=this.roiModifiedHandler.bind(this),this.onRoiRemoved=this.roiRemovedHandler.bind(this),this.onRoiSelected=this.roiSelectedHandler.bind(this),this.contextMenuCallback=()=>{};const s=Object.getOwnPropertySymbols(this.viewer);this._drawingSource=s.find((e=>"drawingSource"===e.description)),this._pyramid=s.find((e=>"pyramid"===e.description)),this._map=s.find((e=>"map"===e.description)),this._affine=s.find((e=>"affine"===e.description)),this.registerEvents(),this.activateDefaultInteractions()}addContextMenuCallback(e){this.contextMenuCallback=e}destroy(){this.unregisterEvents()}publish(e,t){this._broadcastEvent(e,{roiGraphic:t,managedViewer:this})}registerEvents(){this.container.addEventListener(g.ROI_ADDED,this.onRoiAdded),this.container.addEventListener(g.ROI_MODIFIED,this.onRoiModified),this.container.addEventListener(g.ROI_REMOVED,this.onRoiRemoved),this.container.addEventListener(g.ROI_SELECTED,this.onRoiSelected)}unregisterEvents(){this.container.removeEventListener(g.ROI_ADDED,this.onRoiAdded),this.container.removeEventListener(g.ROI_MODIFIED,this.onRoiModified),this.container.removeEventListener(g.ROI_REMOVED,this.onRoiRemoved),this.container.removeEventListener(g.ROI_SELECTED,this.onRoiSelected)}roiAddedHandler(e){const t=e.detail.payload;this.publish(I.ADDED,t),this.publish(I.UPDATED,t)}roiModifiedHandler(e){const t=e.detail.payload;this.publish(I.MODIFIED,t),this.publish(I.UPDATED,t)}roiRemovedHandler(e){const t=e.detail.payload;this.publish(I.REMOVED,t),this.publish(I.UPDATED,t)}roiSelectedHandler(e){const t=e.detail.payload;this.publish(I.SELECTED,t)}runSilently(e){this.unregisterEvents(),e(),this.registerEvents()}clearRoiGraphics(){this.runSilently((()=>this.viewer.removeAllROIs()))}showROIs(){this.viewer.showROIs()}hideROIs(){this.viewer.hideROIs()}addRoiGraphic(e){this.runSilently((()=>this.viewer.addROI(e,p.default)))}addRoiGraphicWithLabel(e,t){this.runSilently((()=>this.viewer.addROI(e,p.default))),this._broadcastEvent(I.ADDED,{roiGraphic:e,managedViewer:this,label:t})}setROIStyle(e,t){this.viewer.setROIStyle(e,t)}removeRoiGraphic(e){this.viewer.removeROI(e)}updateROIProperties({uid:e,properties:t}){this.viewer.updateROI({uid:e,properties:t})}toggleOverviewMap(){this.viewer.toggleOverviewMap()}activateDefaultInteractions(){document.querySelector(".DicomMicroscopyViewer").addEventListener("contextmenu",(e=>{e.preventDefault()}),!1);this.activateInteractions([["dragPan",{bindings:{mouseButtons:["middle"]}}],["dragZoom",{bindings:{mouseButtons:["right"]}}],["modify",{}]])}activateInteractions(e){const t={draw:e=>e?"activateDrawInteraction":"deactivateDrawInteraction",modify:e=>e?"activateModifyInteraction":"deactivateModifyInteraction",translate:e=>e?"activateTranslateInteraction":"deactivateTranslateInteraction",snap:e=>e?"activateSnapInteraction":"deactivateSnapInteraction",dragPan:e=>e?"activateDragPanInteraction":"deactivateDragPanInteraction",dragZoom:e=>e?"activateDragZoomInteraction":"deactivateDragZoomInteraction",select:e=>e?"activateSelectInteraction":"deactivateSelectInteraction"};Object.keys(t).forEach((i=>{const n=e.find((e=>e[0]===i));if(n){const[e,i]=n,o=t[e](!0);this.viewer[o](i)}else{const e=t[i](!1);this.viewer[e]()}}))}_getMapView(){return this._getMap().getView()}_getMap(){const e=Object.getOwnPropertySymbols(this.viewer).find((e=>"Symbol(map)"===String(e)));return window.map=this.viewer[e],this.viewer[e]}getViewState(){const e=this._getMapView();return{center:e.getCenter(),resolution:e.getResolution(),zoom:e.getZoom()}}setViewState(e){const t=this._getMapView();t.setZoom(e.zoom),t.setResolution(e.resolution),t.setCenter(e.center)}setViewStateByExtent(e){const t=e.getCoordinates();Array.isArray(t[0])&&!t[2]?this._jumpToPolyline(t):Array.isArray(t[0])?this._jumpToPolygonOrEllipse(t):this._jumpToPoint(t)}_jumpToPoint(e){const t=d(e,this.viewer[this._pyramid].metadata);this._getMapView().setCenter(t)}_jumpToPolyline(e){const t=d(e,this.viewer[this._pyramid].metadata),i=this._getMapView(),n=t[0],o=t[1],s=[(n[0]+o[0])/2,(n[1]+o[1])/2];i.setCenter(s)}_jumpToPolygonOrEllipse(e){const t=this.viewer[this._pyramid].metadata;let i=1/0,n=-1/0,o=1/0,s=-1/0;e.forEach((e=>{let r=d(e,t);const[a,c]=r;a<i?i=a:a>n&&(n=a),c<o?o=c:c>s&&(s=c)}));const r=n-i,a=s-o;i-=.5*r,n+=.5*r,o-=.5*a,s+=.5*a;const c=this._getMap();c.getView().fit([i,o,n,s],c.getSize())}}const S=f;const E={LABEL_UPDATED:"labelUpdated",GRAPHIC_UPDATED:"graphicUpdated",VIEW_UPDATED:"viewUpdated",REMOVED:"removed"};class v extends r.Rc{constructor(e,t,i,n="",o=null){super(E),this.uid=e.uid,this.roiGraphic=e,this.studyInstanceUID=t,this.seriesInstanceUID=i,this.label=n,this.viewState=o,this.setMeasurements(e)}getScoord3d(){const e=this.roiGraphic;return e[Object.getOwnPropertySymbols(e).find((e=>"Symbol(scoord3d)"===String(e)))]}getCoordinates(){const e=this.getScoord3d();return e[Object.getOwnPropertySymbols(e).find((e=>"Symbol(coordinates)"===String(e)))]}destroy(){this._broadcastEvent(E.REMOVED,this)}setRoiGraphic(e){this.roiGraphic=e,this.setMeasurements(),this._broadcastEvent(E.GRAPHIC_UPDATED,this)}setMeasurements(){const e=this.roiGraphic.scoord3d.graphicType,t=this.roiGraphic.scoord3d.graphicData;switch(e){case"ELLIPSE":const e=t[0],i=t[1];let n=i[0]-e[0],o=i[1]-e[1];n*=n,o*=o;const s=Math.sqrt(n+o)/2,r=Math.PI*s*s;this._area=r,this._length=void 0;break;case"POLYGON":const a=function(e){const t=e.length;let i=0,n=t-1;for(let o=0;o<t;o++)i+=(e[n][0]+e[o][0])*(e[n][1]-e[o][1]),n=o;return Math.abs(i/2)}(t);this._area=a,this._length=void 0;break;case"POINT":this._area=void 0,this._length=void 0;break;case"POLYLINE":let c=0;for(let e=1;e<t.length;e++){const i=t[e-1],n=t[e];let o=n[0]-i[0],s=n[1]-i[1];o*=o,s*=s,c+=Math.sqrt(o+s)}this._area=void 0,this._length=c}}setViewState(e){this.viewState=e,this._broadcastEvent(E.VIEW_UPDATED,this)}setLabel(e,t){this.label=e||t&&t.CodeMeaning,this.finding=t||{CodingSchemeDesignator:"@ohif/extension-dicom-microscopy",CodeValue:e,CodeMeaning:e},this._broadcastEvent(E.LABEL_UPDATED,this)}getLabel(){return this.label?`${this.label}`:""}getDetailedLabel(){return this.label?`${this.label}`:"(empty)"}getLength(){return this._length}getArea(){return this._area}}const D=v;var y;const b={ANNOTATION_UPDATED:"annotationUpdated",ANNOTATION_SELECTED:"annotationSelected",ANNOTATION_REMOVED:"annotationRemoved",RELABEL:"relabel",DELETE:"delete"};class R extends r.Rc{constructor(e){super(b),this.serviceManager=void 0,this.managedViewers=new Set,this.roiUids=new Set,this.annotations={},this.selectedAnnotation=null,this.pendingFocus=!1,this.serviceManager=e,this._onRoiAdded=this._onRoiAdded.bind(this),this._onRoiModified=this._onRoiModified.bind(this),this._onRoiRemoved=this._onRoiRemoved.bind(this),this._onRoiUpdated=this._onRoiUpdated.bind(this),this._onRoiSelected=this._onRoiSelected.bind(this),this.isROIsVisible=!0}clear(){this.managedViewers.forEach((e=>e.destroy())),this.managedViewers.clear();for(const e in this.annotations)delete this.annotations[e];this.roiUids.clear(),this.selectedAnnotation=null,this.pendingFocus=!1}clearAnnotations(){Object.keys(this.annotations).forEach((e=>{this.removeAnnotation(this.annotations[e])}))}_onRoiAdded(e){const{roiGraphic:t,managedViewer:i,label:n}=e,{studyInstanceUID:o,seriesInstanceUID:s}=i,r=i.getViewState(),a=new D(t,o,s,"",r);if(this.roiUids.add(t.uid),this.annotations[t.uid]=a,a.subscribe(E.LABEL_UPDATED,(()=>{this._broadcastEvent(b.ANNOTATION_UPDATED,a)})),void 0!==n)a.setLabel(n);else{const e=e=>i.updateROIProperties({uid:t.uid,properties:{label:e.label,finding:e.finding}});this.triggerRelabel(a,!0,e)}}_onRoiModified(e){const{roiGraphic:t,managedViewer:i}=e,n=this.getAnnotation(t.uid);n&&(n.setRoiGraphic(t),n.setViewState(i.getViewState()))}_onRoiRemoved(e){const{roiGraphic:t}=e;this.roiUids.delete(t.uid),this.annotations[t.uid].destroy(),delete this.annotations[t.uid],this._broadcastEvent(b.ANNOTATION_REMOVED,t)}_onRoiUpdated(e){const{roiGraphic:t,managedViewer:i}=e;this.synchronizeViewers(i),this._broadcastEvent(b.ANNOTATION_UPDATED,this.getAnnotation(t.uid))}_onRoiSelected(e){const{roiGraphic:t}=e,i=this.getAnnotation(t.uid);i&&i!==this.getSelectedAnnotation()&&(this.selectedAnnotation&&this.clearSelection(),this.selectedAnnotation=i,this._broadcastEvent(b.ANNOTATION_SELECTED,i))}_addManagedViewerSubscriptions(e){e._roiAddedSubscription=e.subscribe(I.ADDED,this._onRoiAdded),e._roiModifiedSubscription=e.subscribe(I.MODIFIED,this._onRoiModified),e._roiRemovedSubscription=e.subscribe(I.REMOVED,this._onRoiRemoved),e._roiUpdatedSubscription=e.subscribe(I.UPDATED,this._onRoiUpdated),e._roiSelectedSubscription=e.subscribe(I.UPDATED,this._onRoiSelected)}_removeManagedViewerSubscriptions(e){e._roiAddedSubscription&&e._roiAddedSubscription.unsubscribe(),e._roiModifiedSubscription&&e._roiModifiedSubscription.unsubscribe(),e._roiRemovedSubscription&&e._roiRemovedSubscription.unsubscribe(),e._roiUpdatedSubscription&&e._roiUpdatedSubscription.unsubscribe(),e._roiSelectedSubscription&&e._roiSelectedSubscription.unsubscribe(),e._roiAddedSubscription=null,e._roiModifiedSubscription=null,e._roiRemovedSubscription=null,e._roiUpdatedSubscription=null,e._roiSelectedSubscription=null}_getManagedViewersForSeries(e,t){return Array.from(this.managedViewers).filter((i=>i.studyInstanceUID===e&&i.seriesInstanceUID===t))}getManagedViewersForStudy(e){return Array.from(this.managedViewers).filter((t=>t.studyInstanceUID===e))}_restoreAnnotations(e){const{studyInstanceUID:t,seriesInstanceUID:i}=e;this.getAnnotationsForSeries(t,i).forEach((t=>{e.addRoiGraphic(t.roiGraphic)}))}addViewer(e,t,i,n,o){const s=new S(e,t,i,n,o);return this._restoreAnnotations(s),e._manager=s,this.managedViewers.add(s),this._addManagedViewerSubscriptions(s),this.pendingFocus&&(this.pendingFocus=!1,this.focusAnnotation(this.selectedAnnotation,t)),s}_potentiallyLoadSR(e,t){const i=r.DicomMetadataStore.getStudy(e),n=t.find((e=>"SM"===e.Modality)),{FrameOfReferenceUID:o,othersFrameOfReferenceUID:s}=n;if(!i)return;let a=o?t.filter((e=>e.ReferencedFrameOfReferenceUID===o||s.includes(e.ReferencedFrameOfReferenceUID))):[];if(!a.length)return;if(a=a.filter((e=>"SR"===e.Modality)),a.some((e=>!0===e.isLoaded)))return;let c=0,d=a[0];a.forEach((e=>{const t=Number(`${e.SeriesDate}${e.SeriesTime}`);t>c&&(c=t,d=e)})),d.isLoading=!0,d.load(n)}removeViewer(e){const t=e._manager;this._removeManagedViewerSubscriptions(t),t.destroy(),this.managedViewers.delete(t)}toggleROIsVisibility(){this.isROIsVisible?this.hideROIs():this.showROIs,this.isROIsVisible=!this.isROIsVisible}hideROIs(){this.managedViewers.forEach((e=>e.hideROIs()))}showROIs(){this.managedViewers.forEach((e=>e.showROIs()))}getAnnotation(e){return this.annotations[e]}getAnnotations(){const e=[];return Object.keys(this.annotations).forEach((t=>{e.push(this.getAnnotation(t))})),e}getAnnotationsForStudy(e){return this.getAnnotations().filter((t=>t.studyInstanceUID===e))}getAnnotationsForSeries(e,t){return this.getAnnotations().filter((i=>i.studyInstanceUID===e&&i.seriesInstanceUID===t))}getSelectedAnnotation(){return this.selectedAnnotation}clearSelection(){this.selectedAnnotation&&this.setROIStyle(this.selectedAnnotation.uid,{stroke:{color:"#00ff00"}}),this.selectedAnnotation=null}selectAnnotation(e){this.selectedAnnotation&&this.clearSelection(),this.selectedAnnotation=e,this._broadcastEvent(b.ANNOTATION_SELECTED,e),this.setROIStyle(e.uid,p.active)}toggleOverviewMap(e){const t=Array.from(this.managedViewers).find((t=>t.viewportId===e));t&&t.toggleOverviewMap()}removeAnnotation(e){const{uid:t,studyInstanceUID:i,seriesInstanceUID:n}=e;Array.from(this.managedViewers).filter((e=>e.studyInstanceUID===i&&e.seriesInstanceUID===n)).forEach((e=>e.removeRoiGraphic(t))),this.annotations[t]&&(this.roiUids.delete(t),this.annotations[t].destroy(),delete this.annotations[t],this._broadcastEvent(b.ANNOTATION_REMOVED,e))}focusAnnotation(e,t){const i=Array.from(this.managedViewers).find((e=>e.viewportId===t));i?i.setViewStateByExtent(e):this.pendingFocus=!0}synchronizeViewers(e){const{studyInstanceUID:t,seriesInstanceUID:i}=e,n=this._getManagedViewersForSeries(t,i);n.forEach((e=>this._removeManagedViewerSubscriptions(e))),n.forEach((n=>{if(n===e)return;const o=this.getAnnotationsForSeries(t,i);n.clearRoiGraphics(),o.forEach((e=>{n.addRoiGraphic(e.roiGraphic)}))})),n.forEach((e=>this._addManagedViewerSubscriptions(e)))}activateInteractions(e){this.managedViewers.forEach((t=>t.activateInteractions(e))),this.activeInteractions=e}triggerRelabel(e,t=!1,i){i||(i=({label:t})=>this.managedViewers.forEach((i=>i.updateROIProperties({uid:e.uid,properties:{label:t}})))),this._broadcastEvent(b.RELABEL,{roiAnnotation:e,deleteCallback:()=>this.removeAnnotation(e),successCallback:i,newAnnotation:t})}triggerDelete(e){this._broadcastEvent(b.DELETE,e)}setROIStyle(e,t){this.managedViewers.forEach((i=>i.setROIStyle(e,t)))}}y=R,R.REGISTRATION=e=>({name:"microscopyService",altName:"MicroscopyService",create:({configuration:t={}})=>new y(e)});var w=i(31426);function O({uiDialogService:e,title:t="Annotation",defaultValue:i="",callback:n=((e,t)=>{})}){const r="microscopy-input-dialog",a=({action:t,value:i})=>{switch(t.id){case"save":n(i.value,t.id);break;case"cancel":n("",t.id)}e.dismiss({id:r})};e&&e.create({id:r,centralize:!0,isDraggable:!1,showOverlay:!0,content:s.lG,contentProps:{title:t,value:{value:i},noCloseButton:!0,onClose:()=>e.dismiss({id:r}),actions:[{id:"cancel",text:"Cancel",type:s.Ny.NW.secondary},{id:"save",text:"Save",type:s.Ny.NW.primary}],onSubmit:a,body:({value:e,setValue:t})=>o.createElement(s.pd,{label:"Enter your annotation",labelClassName:"text-white text-[14px] leading-[1.2]",autoFocus:!0,className:"border-primary-main bg-black",type:"text",value:e.defaultValue,onChange:e=>{e.persist(),t((t=>({...t,value:e.target.value})))},onKeyPress:t=>{"Enter"===t.key&&a({value:e,action:{id:"save"}})}})}})}const{datasetToBuffer:A}=w.Ay.data,_=(e,t)=>{let i=1;if("km"==t||!t&&e>1e6)t="km",i=1e-6;else if("m"==t||!t&&e>1e3)t="m",i=.001;else if("μm"==t||!t&&e<1)t="μm",i=1e3;else{if(t&&"mm"!=t)throw new Error(`Unknown length unit ${t}`);t="mm"}return`${(e*i).toFixed(2)} ${t}`};const M=(0,a.CI)(["MicroscopyTable","Common"])((function(e){const{microscopyService:t}=e.servicesManager.services,[i,n]=(0,o.useState)(null),[r,a]=(0,o.useState)([]),[c,d]=(0,o.useState)(null),{servicesManager:l,extensionManager:u}=e,{uiDialogService:h,displaySetService:m}=l.services;(0,o.useEffect)((()=>{const t=e.viewports.get(e.activeViewportId);if(t?.displaySetInstanceUIDs[0]){const e=m.getDisplaySetByUID(t.displaySetInstanceUIDs[0]);e&&n(e.StudyInstanceUID)}}),[e.viewports,e.activeViewportId]),(0,o.useEffect)((()=>{const e=()=>{const e=t.getAnnotationsForStudy(i);a(e)},n=()=>{const e=t.getSelectedAnnotation();d(e)},{unsubscribe:o}=t.subscribe(b.ANNOTATION_UPDATED,e),{unsubscribe:s}=t.subscribe(b.ANNOTATION_SELECTED,n),{unsubscribe:r}=t.subscribe(b.ANNOTATION_REMOVED,(()=>{e()}));return e(),n(),()=>{o(),s(),r()}}),[i]);const p=r.map(((e,t)=>{const i=e.getDetailedLabel(),n=e.getArea(),o=e.getLength(),s=e.roiGraphic.properties.shortAxisLength,r=c===e,{uid:a}=e,d=[];return void 0!==n?d.push((e=>{let t=1,i="mm";return e>1e6?(i="m",t=1e-6):e<1&&(i="μm",t=1e6),`${(e*t).toFixed(2)} ${i}²`})(n)):void 0!==o&&d.push(s?`${_(o,"μm")} x ${_(s,"μm")}`:`${_(o,"μm")}`),{uid:a,index:t,label:i,isActive:r,displayText:d,roiAnnotation:e}}));return p.length,o.createElement(o.Fragment,null,o.createElement("div",{className:"ohif-scrollbar overflow-y-auto overflow-x-hidden","data-cy":"measurements-panel"},o.createElement(s.V,{title:"Measurements",servicesManager:e.servicesManager,data:p,onClick:({uid:i})=>{const n=t.getAnnotation(i);t.selectAnnotation(n),t.focusAnnotation(n,e.activeViewportId)},onEdit:({uid:t,isActive:i})=>{e.commandsManager.runCommand("setLabel",{uid:t},"MICROSCOPY")}})))})),C=M;const{utils:U}=r.Ay,N="1.2.840.10008.5.1.4.1.1.77.1.6",T="@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySopClassHandler";function V({servicesManager:e,extensionManager:t}){return{name:"DicomMicroscopySopClassHandler",sopClassUids:[N],getDisplaySetsFromSeries:e=>function(e,t,i){if(!e||!e.length)throw new Error("No instances were provided");const n=e[0];let o=n,s=+o.NumberOfFrames||1;for(const t of e){const e=+t.NumberOfFrames||1;e<s&&(o=t,s=e)}let r=null;o&&(1==s&&(r=o.imageId),!r)&&(r=i.getActiveDataSource()[0].getImageIdsForInstance({instance:o,thumbnail:!0}));const{FrameOfReferenceUID:a,SeriesDescription:c,ContentDate:d,ContentTime:l,SeriesNumber:u,StudyInstanceUID:h,SeriesInstanceUID:m,SOPInstanceUID:p,SOPClassUID:g}=n,I=(e=e.map((e=>(e.FrameOfReferenceUID=n.FrameOfReferenceUID,e)))).filter((e=>e)).map((e=>e.FrameOfReferenceUID)).filter(((e,t,i)=>i.indexOf(e)===t));return I.length>1&&console.warn("Expected FrameOfReferenceUID of difference instances within a series to be the same, found multiple different values",I),[{plugin:"microscopy",Modality:"SM",altImageText:"Microscopy",displaySetInstanceUID:U.guid(),SOPInstanceUID:p,SeriesInstanceUID:m,StudyInstanceUID:h,FrameOfReferenceUID:a,SOPClassHandlerId:T,SOPClassUID:g,SeriesDescription:c||"Microscopy Data",SeriesDate:d,SeriesTime:l,SeriesNumber:u,firstInstance:o,instance:n,numImageFrames:0,numInstances:1,imageIdForThumbnail:r,others:e,othersFrameOfReferenceUID:I}]}(e,0,t)}}const P={IMAGING_MEASUREMENTS:"126010",MEASUREMENT_GROUP:"125007",IMAGE_REGION:"111030",FINDING:"121071",TRACKING_UNIQUE_IDENTIFIER:"112039",LENGTH:"410668003",AREA:"42798000",SHORT_AXIS:"G-A186",LONG_AXIS:"G-A185",ELLIPSE_AREA:"G-D7FE"};function L(e){return Array.isArray(e)?e:[e]}const G=w.Ay.adapters.DICOMMicroscopyViewer.MeasurementReport;async function F(e,t,n){const o=t.metadata,{StudyInstanceUID:s,FrameOfReferenceUID:r}=n,a=e.getManagedViewersForStudy(s);if(!a||!a.length)return;t.isLoaded=!0;const{rois:c,labels:d}=await async function(e,t){const n=G.generateToolState(e),o=Object.getOwnPropertyNames(n),s=await i.e(525).then(i.t.bind(i,95226,23)),r=function(e){const{ContentSequence:t}=e,i=L(t.find((e=>e.ConceptNameCodeSequence.CodeValue===P.IMAGING_MEASUREMENTS)).ContentSequence).filter((e=>e.ConceptNameCodeSequence.CodeValue===P.MEASUREMENT_GROUP));return i}(e),a=[],c=[];return o.forEach((e=>{const i=n[e];let o;const d=e.toUpperCase(),l=r.filter((e=>L(e.ContentSequence).find((e=>e.ConceptNameCodeSequence.CodeValue===P.IMAGE_REGION)).GraphicType===d));i.forEach(((i,n)=>{const r={},d={coordinates:i,frameOfReferenceUID:t};if("Polygon"===e)o=new s.scoord3d.Polygon(d);else if("Polyline"===e)o=new s.scoord3d.Polyline(d);else if("Point"===e)o=new s.scoord3d.Point(d);else{if("Ellipse"!==e)throw new Error("Unsupported tool type");o=new s.scoord3d.Ellipse(d)}const u=l[n],h=L(u.ContentSequence).find((e=>e.ConceptNameCodeSequence.CodeValue===P.FINDING)),m=L(u.ContentSequence).find((e=>e.ConceptNameCodeSequence.CodeValue===P.TRACKING_UNIQUE_IDENTIFIER));if(m){const e=/\(([^)]+)\)/.exec(m.TextValue);e&&e[1]&&(r.presentationState=JSON.parse(e[1]),r.marker=r.presentationState.marker)}let p=L(u.ContentSequence).filter((e=>[P.LENGTH,P.AREA,P.SHORT_AXIS,P.LONG_AXIS,P.ELLIPSE_AREA].includes(e.ConceptNameCodeSequence.CodeValue))),g=L(u.ContentSequence).filter((e=>[P.TRACKING_UNIQUE_IDENTIFIER].includes(e.ConceptNameCodeSequence.CodeValue)));g=g.map((e=>{const t={...e};return t.ConceptNameCodeSequence=L(t.ConceptNameCodeSequence),t})),p=p.map((e=>{const t={...e};return t.ConceptNameCodeSequence=L(t.ConceptNameCodeSequence),t})),p&&p.length&&(r.measurements=p,console.log("[SR] retrieving measurements...",p)),g&&g.length&&(r.evaluations=g,console.log("[SR] retrieving evaluations...",g));const I=new s.roi.ROI({scoord3d:o,properties:r});a.push(I),h?c.push(h.ConceptCodeSequence.CodeValue):c.push("")}))})),{rois:a,labels:c}}(o,r),l=a[0];for(let e=0;e<c.length;e++){const t=c[e];t[Object.getOwnPropertySymbols(t).find((e=>"properties"===e.description))].evaluations=[],l.addRoiGraphicWithLabel(t,d[e])}}const{utils:x}=r.Ay,q="1.2.840.10008.5.1.4.1.1.88.34",k="@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler";function H(e,t,i){if(!e||!e.length)throw new Error("No instances were provided");const{displaySetService:n,microscopyService:o}=t.services,s=e[0],a=r.DicomMetadataStore.getSeries(s.StudyInstanceUID,s.SeriesInstanceUID).instances[0],c=function(e){const{ContentSequence:t}=e,i=L(t.find((e=>e.ConceptNameCodeSequence.CodeValue===P.IMAGING_MEASUREMENTS)).ContentSequence).find((e=>e.ConceptNameCodeSequence.CodeValue===P.MEASUREMENT_GROUP));return L(i.ContentSequence).find((e=>e.ConceptNameCodeSequence.CodeValue===P.IMAGE_REGION)).ReferencedFrameOfReferenceUID}(a),{FrameOfReferenceUID:d,SeriesDescription:l,ContentDate:u,ContentTime:h,SeriesNumber:m,StudyInstanceUID:p,SeriesInstanceUID:g,SOPInstanceUID:I,SOPClassUID:f}=s,S={plugin:"microscopy",Modality:"SR",altImageText:"Microscopy SR",displaySetInstanceUID:x.guid(),SOPInstanceUID:I,SeriesInstanceUID:g,StudyInstanceUID:p,ReferencedFrameOfReferenceUID:c,SOPClassHandlerId:k,SOPClassUID:f,SeriesDescription:l,SeriesDate:u,SeriesTime:h,SeriesNumber:m,instance:s,metadata:a,isDerived:!0,isLoading:!1,isLoaded:!1,loadError:!1,load:function(e){return F(o,S,e).catch((e=>{throw S.isLoaded=!1,S.loadError=!0,new Error(e)}))}};return S.getSourceDisplaySet=function(){let e=[];return r.DicomMetadataStore.getStudy(p).series.forEach((t=>{const i=n.getDisplaySetsForSeries(t.SeriesInstanceUID);e=e.concat(i)})),function(e,t){const{ReferencedFrameOfReferenceUID:i}=t,n=e.filter((e=>e.displaySetInstanceUID!==t.displaySetInstanceUID)),o=n.find((e=>"SM"===e.Modality&&(e.FrameOfReferenceUID===i||e.othersFrameOfReferenceUID.includes(i))));return!o&&n.length>=1?(console.warn("No display set with FrameOfReferenceUID",i,"single series, assuming data error, defaulting to only series."),n.find((e=>"SM"===e.Modality))):o}(e,S)},[S]}function j({servicesManager:e,extensionManager:t}){return{name:"DicomMicroscopySRSopClassHandler",sopClassUids:[q],getDisplaySetsFromSeries:t=>H(t,e)}}function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},B.apply(this,arguments)}const $=o.lazy((()=>Promise.all([i.e(504),i.e(191),i.e(644),i.e(825),i.e(335),i.e(544)]).then(i.bind(i,17919)))),W=e=>o.createElement(o.Suspense,{fallback:o.createElement("div",null,"Loading...")},o.createElement($,e)),z={id:n,async preRegistration({servicesManager:e,commandsManager:t,configuration:i={},appConfig:n}){e.registerService(R.REGISTRATION(e))},getViewportModule:({servicesManager:e,extensionManager:t,commandsManager:i})=>[{name:"microscopy-dicom",component:n=>{const{viewportOptions:r}=n,[a,c]=(0,s.ih)(),{activeViewportId:d}=a,l=(0,o.useMemo)((()=>n.displaySets.map((e=>e.displaySetInstanceUID)).join("-")),[n.displaySets]);return o.createElement(W,B({key:l,servicesManager:e,extensionManager:t,commandsManager:i,activeViewportId:d,setViewportActive:e=>{c.setActiveViewportId(e)},viewportData:r},n))}}],getSopClassHandlerModule:({servicesManager:e,commandsManager:t,extensionManager:i})=>[V({servicesManager:e,extensionManager:i}),j({servicesManager:e,extensionManager:i})],getPanelModule:function({commandsManager:e,extensionManager:t,servicesManager:i}){return[{name:"measure",iconName:"tab-linear",iconLabel:"Measure",label:"Measurements",secondaryLabel:"Measurements",component:()=>{const[{activeViewportId:n,viewports:r}]=(0,s.ih)();return o.createElement(C,{viewports:r,activeViewportId:n,onSaveComplete:()=>{},onRejectComplete:()=>{},commandsManager:e,servicesManager:i,extensionManager:t})}}]},getCommandsModule:function({servicesManager:e,commandsManager:t,extensionManager:i}){const{viewportGridService:n,uiDialogService:o,microscopyService:s}=e.services,r={deleteMeasurement:({uid:e})=>{if(e){const t=s.getAnnotation(e);t&&s.removeAnnotation(t)}},setLabel:({uid:e})=>{const t=s.getAnnotation(e);O({uiDialogService:o,defaultValue:"",callback:(e,i)=>{if("save"===i)t.setLabel(e),s.triggerRelabel(t)}})},setToolActive:({toolName:e,toolGroupId:t="MICROSCOPY"})=>{const i=["dragPan",{bindings:{mouseButtons:["middle"]}}],n=["dragZoom",{bindings:{mouseButtons:["right"]}}];if(["line","box","circle","point","polygon","freehandpolygon","freehandline"].indexOf(e)>=0){const t={geometryType:e,vertexEnabled:!0,styleOptions:p.default,bindings:{mouseButtons:["left"]}};"line"===e?(t.minPoints=2,t.maxPoints=2):"point"===e&&(delete t.styleOptions,delete t.vertexEnabled),s.activateInteractions([["draw",t],i,n])}else"dragPan"==e?s.activateInteractions([["dragPan",{bindings:{mouseButtons:["left","middle"]}}],n]):s.activateInteractions([[e,{bindings:{mouseButtons:["left"]}}],i,n])},toggleOverlays:()=>{const e=document.getElementsByClassName("microscopy-viewport-overlay");let t=!1;for(let i=0;i<e.length;i++)0===i&&(t=e.item(0).classList.contains("hidden")),e.item(i).classList.toggle("hidden");const{activeViewportId:i,viewports:o}=n.getState();s.toggleOverviewMap(i)},toggleAnnotations:()=>{s.toggleROIsVisibility()}};return{actions:r,definitions:{deleteMeasurement:{commandFn:r.deleteMeasurement,storeContexts:[],options:{}},setLabel:{commandFn:r.setLabel,storeContexts:[],options:{}},setToolActive:{commandFn:r.setToolActive,storeContexts:[],options:{}},toggleOverlays:{commandFn:r.toggleOverlays,storeContexts:[],options:{}},toggleAnnotations:{commandFn:r.toggleAnnotations,storeContexts:[],options:{}}},defaultContext:"MICROSCOPY"}}}}}]);
//# sourceMappingURL=270.bundle.3c201bb3b4f402105ae2.js.map