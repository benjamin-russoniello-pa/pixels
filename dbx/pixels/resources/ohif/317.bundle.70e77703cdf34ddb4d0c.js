"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([[317],{55317:(o,e,t)=>{t.r(e),t.d(e,{default:()=>C});var n=t(14283);const i=JSON.parse('{"UU":"@ohif/mode-segmentation"}').UU;var a=t(21683);const{windowLevelPresets:s}=n.defaults;function r(o,e,t,n,i,a,s){return{id:e,icon:t,label:n,type:o,commands:i,tooltip:a,uiType:s}}const l=r.bind(null,"action"),c=r.bind(null,"toggle"),m=r.bind(null,"tool");function d(o,e,t){return{id:o.toString(),title:e,subtitle:t,type:"action",commands:[{commandName:"setWindowLevel",commandOptions:{...s[o]},context:"CORNERSTONE"}]}}const p=["default","mpr","SRToolGroup"];function u(o){return p.map((e=>({commandName:"setToolActive",commandOptions:{toolGroupId:e,toolName:o},context:"CORNERSTONE"})))}const N=[{id:"Zoom",type:"ohif.radioGroup",props:{type:"tool",icon:"tool-zoom",label:"Zoom",commands:u("Zoom")}},{id:"WindowLevel",type:"ohif.splitButton",props:{groupId:"WindowLevel",primary:m("WindowLevel","tool-window-level","Window Level",[{commandName:"setToolActive",commandOptions:{toolName:"WindowLevel"},context:"CORNERSTONE"}],"Window Level"),secondary:{icon:"chevron-down",label:"W/L Manual",isActive:!0,tooltip:"W/L Presets"},isAction:!0,renderer:a.d4,items:[d(1,"Soft tissue","400 / 40"),d(2,"Lung","1500 / -600"),d(3,"Liver","150 / 90"),d(4,"Bone","2500 / 480"),d(5,"Brain","80 / 40")]}},{id:"Pan",type:"ohif.radioGroup",props:{type:"tool",icon:"tool-move",label:"Pan",commands:u("Pan")}},{id:"Capture",type:"ohif.action",props:{icon:"tool-capture",label:"Capture",type:"action",commands:[{commandName:"showDownloadViewportModal",commandOptions:{},context:"CORNERSTONE"}]}},{id:"Layout",type:"ohif.layoutSelector",props:{rows:3,columns:3}},{id:"MPR",type:"ohif.action",props:{type:"toggle",icon:"icon-mpr",label:"MPR",commands:[{commandName:"toggleHangingProtocol",commandOptions:{protocolId:"mpr"},context:"DEFAULT"}]}},{id:"Crosshairs",type:"ohif.radioGroup",props:{type:"tool",icon:"tool-crosshair",label:"Crosshairs",commands:[{commandName:"setToolActive",commandOptions:{toolName:"Crosshairs",toolGroupId:"mpr"},context:"CORNERSTONE"}]}},{id:"MoreTools",type:"ohif.splitButton",props:{isRadio:!0,groupId:"MoreTools",primary:l("Reset","tool-reset","Reset View",[{commandName:"resetViewport",commandOptions:{},context:"CORNERSTONE"}],"Reset"),secondary:{icon:"chevron-down",label:"",isActive:!0,tooltip:"More Tools"},items:[l("Reset","tool-reset","Reset View",[{commandName:"resetViewport",commandOptions:{},context:"CORNERSTONE"}],"Reset"),l("rotate-right","tool-rotate-right","Rotate Right",[{commandName:"rotateViewportCW",commandOptions:{},context:"CORNERSTONE"}],"Rotate +90"),l("flip-horizontal","tool-flip-horizontal","Flip Horizontally",[{commandName:"flipViewportHorizontal",commandOptions:{},context:"CORNERSTONE"}],"Flip Horizontal"),c("ImageSliceSync","link","Stack Image Sync",[{commandName:"toggleImageSliceSync",commandOptions:{},context:"CORNERSTONE"}]),c("ReferenceLines","tool-referenceLines","Reference Lines",[{commandName:"toggleReferenceLines",commandOptions:{},context:"CORNERSTONE"}]),m("StackScroll","tool-stack-scroll","Stack Scroll",[{commandName:"setToolActive",commandOptions:{toolName:"StackScroll"},context:"CORNERSTONE"}],"Stack Scroll"),l("invert","tool-invert","Invert",[{commandName:"invertViewport",commandOptions:{},context:"CORNERSTONE"}],"Invert Colors"),c("cine","tool-cine","Cine",[{commandName:"toggleCine",context:"CORNERSTONE"}],"Cine"),m("Magnify","tool-magnify","Magnify",[{commandName:"setToolActive",commandOptions:{toolName:"Magnify"},context:"CORNERSTONE"}],"Magnify"),l("TagBrowser","list-bullets","Dicom Tag Browser",[{commandName:"openDICOMTagViewer",commandOptions:{},context:"DEFAULT"}],"Dicom Tag Browser")]}}];function S(o){const{toolNames:e,Enums:t}=o.exports;return{active:[{toolName:e.WindowLevel,bindings:[{mouseButton:t.MouseBindings.Primary}]},{toolName:e.Pan,bindings:[{mouseButton:t.MouseBindings.Auxiliary}]},{toolName:e.Zoom,bindings:[{mouseButton:t.MouseBindings.Secondary}]},{toolName:e.StackScrollMouseWheel,bindings:[]}],passive:[{toolName:"CircularBrush",parentTool:"Brush",configuration:{activeStrategy:"FILL_INSIDE_CIRCLE"}},{toolName:"CircularEraser",parentTool:"Brush",configuration:{activeStrategy:"ERASE_INSIDE_CIRCLE"}},{toolName:"SphereBrush",parentTool:"Brush",configuration:{activeStrategy:"FILL_INSIDE_SPHERE"}},{toolName:"SphereEraser",parentTool:"Brush",configuration:{activeStrategy:"ERASE_INSIDE_SPHERE"}},{toolName:"ThresholdCircularBrush",parentTool:"Brush",configuration:{activeStrategy:"THRESHOLD_INSIDE_CIRCLE",strategySpecificConfiguration:{THRESHOLD:{threshold:[-500,500]}}}},{toolName:"ThresholdSphereBrush",parentTool:"Brush",configuration:{activeStrategy:"THRESHOLD_INSIDE_SPHERE",strategySpecificConfiguration:{THRESHOLD:{threshold:[-500,500]}}}},{toolName:e.CircleScissors},{toolName:e.RectangleScissors},{toolName:e.SphereScissors},{toolName:e.StackScroll},{toolName:e.Magnify},{toolName:e.SegmentationDisplay}],disabled:[{toolName:e.ReferenceLines}]}}const g=function(o,e,t){!function(o,e,t,n){const i=S(o.getModuleEntry("@ohif/extension-cornerstone.utilityModule.tools"));e.createToolGroupAndAddTools(n,i)}(o,e,0,"default"),function(o,e,t){const n=o.getModuleEntry("@ohif/extension-cornerstone.utilityModule.tools"),i=S(n);i.disabled.push({toolName:n.exports.toolNames.Crosshairs,configuration:{viewportIndicators:!1,autoPan:{enabled:!1,panSize:10}}},{toolName:n.exports.toolNames.ReferenceLines}),e.createToolGroupAndAddTools("mpr",i)}(o,e)},h="@ohif/extension-default.layoutTemplateModule.viewerLayout",y="@ohif/extension-default.sopClassHandlerModule.stack",E="@ohif/extension-default.panelModule.seriesList",f="@ohif/extension-cornerstone.viewportModule.cornerstone",R="@ohif/extension-cornerstone-dicom-seg.panelModule.panelSegmentationWithTools",T="@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg",v="@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg",O={"@ohif/extension-default":"^3.0.0","@ohif/extension-cornerstone":"^3.0.0","@ohif/extension-cornerstone-dicom-seg":"^3.0.0"};const C={id:i,modeFactory:function({modeConfiguration:o}){return{id:i,routeName:"segmentation",displayName:"Segmentation",onModeEnter:({servicesManager:o,extensionManager:e,commandsManager:t})=>{const{measurementService:n,toolbarService:i,toolGroupService:a}=o.services;let s;n.clearMeasurements(),g(e,a,t);({unsubscribe:s}=a.subscribe(a.EVENTS.VIEWPORT_ADDED,(()=>{i.recordInteraction({groupId:"WindowLevel",interactionType:"tool",commands:[{commandName:"setToolActive",commandOptions:{toolName:"WindowLevel"},context:"CORNERSTONE"}]}),s()}))),i.init(e),i.addButtons(N),i.createButtonSection("primary",["Zoom","WindowLevel","Pan","Capture","Layout","MPR","Crosshairs","MoreTools"])},onModeExit:({servicesManager:o})=>{const{toolGroupService:e,syncGroupService:t,toolbarService:n,segmentationService:i,cornerstoneViewportService:a}=o.services;e.destroy(),t.destroy(),i.destroy(),a.destroy()},validationTags:{study:[],series:[]},isValidMode:({modalities:o})=>{const e=o.split("\\");return 1!==e.length||!["SM","US","MG","OT","DOC","CR"].includes(e[0])},routes:[{path:"template",layoutTemplate:({location:o,servicesManager:e})=>({id:h,props:{leftPanels:[E],rightPanels:[R],viewports:[{namespace:f,displaySetsToDisplay:[y]},{namespace:v,displaySetsToDisplay:[T]}]}})}],extensions:O,sopClassHandlers:[y,T],hotkeys:[...n.ot.defaults.hotkeyBindings]}},extensionDependencies:O}}}]);
//# sourceMappingURL=317.bundle.70e77703cdf34ddb4d0c.js.map