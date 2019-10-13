/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var a=e.Categories,t=e.Severity,i=e.Audiences;var r={id:"nonMultipartFileUploadRequiresXHR",audiences:[i.Control],categories:[a.Usability],enabled:true,minversion:"1.28",title:"FileUploader: To disable multipart upload you should enable XHR",description:"The FileUploader 'useMultipart' property is disabled, but the required 'sendXHR' property is not enabled",resolution:"Either enable the 'sendXHR' property of the FileUploader or set the 'useMultipart' property to true",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.unified.FileUploader"}],check:function(e,a,i){i.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(a){if(!a.getUseMultipart()&&!a.getSendXHR()){var i=a.getId(),r=a.getMetadata().getElementName();e.addIssue({severity:t.High,details:"FileUploader '"+r+"' ("+i+") multipart upload cannot be disabled",context:{id:i}})}})}};var l={id:"fileUploaderParametersRequireXHRDisabled",audiences:[i.Control],categories:[a.Usability],enabled:true,minversion:"1.28",title:"FileUploader: XHR enabled but non-XHR parameter aggregation specified",description:"The FileUploader XHR is enabled but parameters are specified into the non-XHR (i.e. form-based) upload 'parameters' aggregation",resolution:"Either disable the 'sendXHR' property of the FileUploader, or use the 'headerParameters' aggregation to specify parameters for XHR upload",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.unified.FileUploader"}],check:function(e,a,i){i.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(a){if(a.getParameters().length&&!a.getHeaderParameters().length&&a.getSendXHR()){var i=a.getId(),r=a.getMetadata().getElementName();e.addIssue({severity:t.High,details:"FileUploader '"+r+"' ("+i+") has enabled XHR but specified non-XHR parameter aggregation",context:{id:i}})}})}};var d={id:"fileUploaderHeaderParametersRequireXHREnabled",audiences:[i.Control],categories:[a.Usability],enabled:true,minversion:"1.28",title:"FileUploader: XHR disabled but XHR parameter aggregation specified",description:"The FileUploader has specified headerParameters, but the required XHR is disabled",resolution:"Either enable the 'sendXHR' property of the FileUploader, or use the 'parameters' aggregation to specify parameters for form-based upload",resolutionurls:[{text:"API Reference: FileUploader",href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.unified.FileUploader"}],check:function(e,a,i){i.getElementsByClassName("sap.ui.unified.FileUploader").forEach(function(a){if(a.getHeaderParameters().length&&!a.getParameters().length&&!a.getSendXHR()){var i=a.getId(),r=a.getMetadata().getElementName();e.addIssue({severity:t.High,details:"FileUploader '"+r+"' ("+i+") headerParameters require XHR",context:{id:i}})}})}};return[r,l,d]},true);