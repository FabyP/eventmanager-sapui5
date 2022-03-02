/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Batch","./_GroupLock","./_Helper","./_V2Requestor","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery"],function(e,t,r,n,o,i,s){"use strict";var a={Accept:"multipart/mixed"},u="sap.ui.model.odata.v4.lib._Requestor",c,h=/^\d+$/;function f(e){var t;e=e.toLowerCase();for(t in this.headers){if(t.toLowerCase()===e){return this.headers[t]}}}function d(e,t,n,o){this.mBatchQueue={};this.mHeaders=t||{};this.oModelInterface=o;this.sQueryParams=r.buildQuery(n);this.mRunningChangeRequests={};this.oSecurityTokenPromise=null;this.iSessionTimer=0;this.iSerialNumber=0;this.sServiceUrl=e}d.prototype.mFinalHeaders={"Content-Type":"application/json;charset=UTF-8;IEEE754Compatible=true"};d.prototype.mPredefinedPartHeaders={Accept:"application/json;odata.metadata=minimal;IEEE754Compatible=true"};d.prototype.mPredefinedRequestHeaders={Accept:"application/json;odata.metadata=minimal;IEEE754Compatible=true","OData-MaxVersion":"4.0","OData-Version":"4.0","X-CSRF-Token":"Fetch"};d.prototype.addChangeSet=function(e){var t=[],r=this.getOrCreateBatchQueue(e);t.iSerialNumber=this.getSerialNumber();r.iChangeSet+=1;r.splice(r.iChangeSet,0,t)};d.prototype.batchRequestSent=function(e,t){if(t){if(e in this.mRunningChangeRequests){this.mRunningChangeRequests[e]+=1}else{this.mRunningChangeRequests[e]=1}}};d.prototype.batchResponseReceived=function(e,t){if(t){this.mRunningChangeRequests[e]-=1;if(this.mRunningChangeRequests[e]===0){delete this.mRunningChangeRequests[e]}}};d.prototype.buildQueryString=function(e,t,n,o){return r.buildQuery(this.convertQueryOptions(e,t,n,o))};d.prototype.cancelChanges=function(e){if(this.mRunningChangeRequests[e]){throw new Error("Cannot cancel the changes for group '"+e+"', the batch request is running")}this.cancelChangesByFilter(function(){return true},e)};d.prototype.cancelChangesByFilter=function(e,t){var r=false,n=this;function o(t){var o=n.mBatchQueue[t],i,s,a,u,c;for(c=o.length-1;c>=0;c-=1){if(Array.isArray(o[c])){s=o[c];for(u=s.length-1;u>=0;u-=1){i=s[u];if(i.$cancel&&e(i)){i.$cancel();a=new Error("Request canceled: "+i.method+" "+i.url+"; group: "+t);a.canceled=true;i.$reject(a);s.splice(u,1);r=true}}}}}if(t){if(this.mBatchQueue[t]){o(t)}}else{for(t in this.mBatchQueue){o(t)}}return r};d.prototype.cleanUpChangeSets=function(e){var t,r=false,n;function o(e){if(!i(e)){t.push(e)}}function i(e){if(e.method!=="PATCH"){return false}return t.some(function(t){if(t.method==="PATCH"&&t.headers["If-Match"]===e.headers["If-Match"]){s.extend(true,t.body,e.body);e.$resolve(t.$promise);return true}})}for(n=e.iChangeSet;n>=0;n-=1){t=[];e[n].forEach(o);if(t.length===0){e.splice(n,1)}else if(t.length===1&&this.isChangeSetOptional()){e[n]=t[0]}else{e[n]=t}r=r||t.length>0}return r};d.prototype.clearSessionContext=function(e){if(e){this.oModelInterface.fireSessionTimeout()}delete this.mHeaders["SAP-ContextId"];if(this.iSessionTimer){clearInterval(this.iSessionTimer);this.iSessionTimer=0}};d.prototype.convertExpand=function(e,t){var r,n=[],o=this;if(!e||typeof e!=="object"){throw new Error("$expand must be a valid object")}r=Object.keys(e);if(t){r=r.sort()}r.forEach(function(r){var i=e[r];if(i&&typeof i==="object"){n.push(o.convertExpandOptions(r,i,t))}else{n.push(r)}});return n.join(",")};d.prototype.convertExpandOptions=function(e,t,r){var n=[];this.doConvertSystemQueryOptions(undefined,t,function(e,t){n.push(e+"="+t)},undefined,r);return n.length?e+"("+n.join(";")+")":e};d.prototype.convertQueryOptions=function(e,t,r,n){var o={};if(!t){return undefined}this.doConvertSystemQueryOptions(e,t,function(e,t){o[e]=t},r,n);return o};d.prototype.convertResourcePath=function(e){return e};d.prototype.destroy=function(){this.clearSessionContext()};d.prototype.doCheckVersionHeader=function(e,t,r){var n=e("OData-Version"),o=!n&&e("DataServiceVersion");if(o){throw new Error("Expected 'OData-Version' header with value '4.0' but received"+" 'DataServiceVersion' header with value '"+o+"' in response for "+this.sServiceUrl+t)}if(n==="4.0"||!n&&r){return}throw new Error("Expected 'OData-Version' header with value '4.0' but received value '"+n+"' in response for "+this.sServiceUrl+t)};d.prototype.doConvertResponse=function(e,t){return e};d.prototype.doConvertSystemQueryOptions=function(e,t,r,n,o){var i=this;Object.keys(t).forEach(function(e){var s=t[e];if(n&&e[0]==="$"){return}switch(e){case"$expand":s=i.convertExpand(s,o);break;case"$select":if(Array.isArray(s)){s=o?s.sort().join(","):s.join(",")}break;default:}r(e,s)})};d.prototype.fetchTypeForPath=function(e,t){return this.oModelInterface.fetchMetadata(e+(t?"/$Type":"/"))};d.prototype.formatPropertyAsLiteral=function(e,t){return r.formatLiteral(e,t.$Type)};d.prototype.getGroupSubmitMode=function(e){return this.oModelInterface.getGroupProperty(e,"submit")};d.prototype.getModelInterface=function(){return this.oModelInterface};d.prototype.getOrCreateBatchQueue=function(e){var t,r=this.mBatchQueue[e];if(!r){t=[];t.iSerialNumber=0;r=this.mBatchQueue[e]=[t];r.iChangeSet=0;if(this.oModelInterface.onCreateGroup){this.oModelInterface.onCreateGroup(e)}}return r};d.prototype.getPathAndAddQueryOptions=function(e,t,r){var n=[],o,i={},s,a=this;e=e.slice(1,-5);if(t.$Parameter){t.$Parameter.forEach(function(e){i[e.$Name]=e})}if(t.$kind==="Function"){for(o in r){s=i[o];if(s){if(s.$isCollection){throw new Error("Unsupported collection-valued parameter: "+o)}n.push(encodeURIComponent(o)+"="+encodeURIComponent(a.formatPropertyAsLiteral(r[o],s)))}}e+="("+n.join(",")+")"}else{for(o in r){if(!(o in i)){delete r[o]}}}return e};d.prototype.getSerialNumber=function(){this.iSerialNumber+=1;return this.iSerialNumber};d.prototype.getServiceUrl=function(){return this.sServiceUrl};d.prototype.hasChanges=function(e,t){var r=this.mBatchQueue[e];if(r){return r.some(function(e){return Array.isArray(e)&&e.some(function(e){return e.headers["If-Match"]===t})})}return false};d.prototype.hasPendingChanges=function(e){var t=this;function r(t){var r=Object.keys(t);return e===undefined?r:r.filter(function(t){return e===t})}return r(this.mRunningChangeRequests).length>0||r(this.mBatchQueue).some(function(e){return t.mBatchQueue[e].some(function(e){return Array.isArray(e)&&e.some(function(e){return e.$cancel})})})};d.prototype.isActionBodyOptional=function(){return false};d.prototype.isChangeSetOptional=function(){return true};d.prototype.ready=function(){return i.resolve()};d.prototype.refreshSecurityToken=function(e){var t=this;if(!this.oSecurityTokenPromise){if(e!==this.mHeaders["X-CSRF-Token"]){return Promise.resolve()}this.oSecurityTokenPromise=new Promise(function(e,n){s.ajax(t.sServiceUrl+t.sQueryParams,{method:"HEAD",headers:{"X-CSRF-Token":"Fetch"}}).then(function(r,n,o){t.mHeaders["X-CSRF-Token"]=o.getResponseHeader("X-CSRF-Token");t.oSecurityTokenPromise=null;e()},function(e,o,i){t.oSecurityTokenPromise=null;n(r.createError(e,"Could not refresh security token"))})})}return this.oSecurityTokenPromise};d.prototype.relocate=function(e,r,n){var o=this.mBatchQueue[e],i=this,s=o&&o[0].some(function(e,s){if(e.body===r){i.request(e.method,e.url,new t(n),e.headers,r,e.$submit,e.$cancel).then(e.$resolve,e.$reject);o[0].splice(s,1);return true}});if(!s){throw new Error("Request not found in group '"+e+"'")}};d.prototype.relocateAll=function(e,r,n){var o=0,i=this.mBatchQueue[e],s=this;if(i){i[0].slice().forEach(function(e){if(!n||e.headers["If-Match"]===n){i[0].splice(o,1);s.request(e.method,e.url,new t(r),e.headers,e.body,e.$submit,e.$cancel).then(e.$resolve,e.$reject)}else{o+=1}})}};d.prototype.removePatch=function(e){var t=this.cancelChangesByFilter(function(t){return t.$promise===e});if(!t){throw new Error("Cannot reset the changes, the batch request is running")}};d.prototype.removePost=function(e,t){var r=this.cancelChangesByFilter(function(e){return e.body===t},e);if(!r){throw new Error("Cannot reset the changes, the batch request is running")}};d.prototype.reportUnboundMessagesAsJSON=function(e,t){this.oModelInterface.reportUnboundMessages(e,JSON.parse(t||null))};d.prototype.request=function(e,t,r,n,o,i,a,u,h,f){var d,p,l=r&&r.getGroupId()||"$direct",m,y=Infinity,S,g=this;if(l==="$cached"){p=new Error("Unexpected request: "+e+" "+t);p.$cached=true;throw p}if(r){r.unlock();y=r.getSerialNumber()}t=this.convertResourcePath(t);h=h||t;if(this.getGroupSubmitMode(l)!=="Direct"){m=new Promise(function(r,c){var p=g.getOrCreateBatchQueue(l);S={method:e,url:t,headers:s.extend({},g.mPredefinedPartHeaders,g.mHeaders,n,g.mFinalHeaders),body:o,$cancel:a,$metaPath:u,$reject:c,$resolve:r,$resourcePath:h,$submit:i};if(e==="GET"){p.push(S)}else if(f){p[0].unshift(S)}else{d=p.iChangeSet;while(p[d].iSerialNumber>y){d-=1}p[d].push(S)}});S.$promise=m;return m}if(i){i()}return this.sendRequest(e,t,s.extend({},n,this.mFinalHeaders),JSON.stringify(c.cleanPayload(o)),h).then(function(e){g.reportUnboundMessagesAsJSON(e.resourcePath,e.messages);return g.doConvertResponse(e.body,u)})};d.prototype.sendBatch=function(t){var r=e.serializeBatchRequest(t);return this.sendRequest("POST","$batch"+this.sQueryParams,s.extend(r.headers,a),r.body).then(function(t){if(t.messages!==null){throw new Error("Unexpected 'sap-messages' response header for batch request")}return e.deserializeBatchResponse(t.contentType,t.body)})};d.prototype.sendRequest=function(e,t,n,i,a){var c=this.sServiceUrl+t,h=this;return new Promise(function(f,d){function p(l){var m=h.mHeaders["X-CSRF-Token"];return s.ajax(c,{data:i,headers:s.extend({},h.mPredefinedRequestHeaders,h.mHeaders,r.resolveIfMatchHeader(n)),method:e}).then(function(e,r,n){var o=n.getResponseHeader("ETag");try{h.doCheckVersionHeader(n.getResponseHeader,t,!e)}catch(e){d(e);return}h.mHeaders["X-CSRF-Token"]=n.getResponseHeader("X-CSRF-Token")||h.mHeaders["X-CSRF-Token"];h.setSessionContext(n.getResponseHeader("SAP-ContextId"),n.getResponseHeader("SAP-Http-Session-Timeout"));e=e||{};if(o){e["@odata.etag"]=o}f({body:e,contentType:n.getResponseHeader("Content-Type"),messages:n.getResponseHeader("sap-messages"),resourcePath:t})},function(e,t,n){var i=e.getResponseHeader("SAP-ContextId"),s=e.getResponseHeader("X-CSRF-Token"),f;if(!l&&e.status===403&&s&&s.toLowerCase()==="required"){h.refreshSecurityToken(m).then(function(){p(true)},d)}else{f="Communication error";if(i){h.setSessionContext(i,e.getResponseHeader("SAP-Http-Session-Timeout"))}else if(h.mHeaders["SAP-ContextId"]){f="Session not found on server";o.error(f,undefined,u);h.clearSessionContext(true)}d(r.createError(e,f,c,a))}})}if(h.oSecurityTokenPromise&&e!=="GET"){return h.oSecurityTokenPromise.then(p)}return p()})};d.prototype.setSessionContext=function(e,t){var r=h.test(t)?parseInt(t):0,n=Date.now()+15*60*1e3,i=this;this.clearSessionContext();if(e){i.mHeaders["SAP-ContextId"]=e;if(r>=60){this.iSessionTimer=setInterval(function(){if(Date.now()>=n){i.clearSessionContext(true)}else{s.ajax(i.sServiceUrl+i.sQueryParams,{method:"HEAD",headers:{"SAP-ContextId":i.mHeaders["SAP-ContextId"]}}).fail(function(e){if(e.getResponseHeader("SAP-Err-Id")==="ICMENOSESSION"){o.error("Session not found on server",undefined,u);i.clearSessionContext(true)}})}},(r-5)*1e3)}else if(t!==null){o.warning("Unsupported SAP-Http-Session-Timeout header",t,u)}}};d.prototype.submitBatch=function(e){var t,n=this.mBatchQueue[e]||[],o=this;function i(e,t){var n;e.forEach(function(e,s){var u,c,h,d=t[s];if(Array.isArray(d)){i(e,d)}else if(!d){u=new Error("HTTP request was not processed because the previous request failed");u.cause=n;u.$reported=true;e.$reject(u)}else if(d.status>=400){d.getResponseHeader=f;n=r.createError(d,"Communication error",e.url,e.$resourcePath);a(n,e)}else{if(d.responseText){try{o.doCheckVersionHeader(f.bind(d),e.url,true);h=o.doConvertResponse(JSON.parse(d.responseText),e.$metaPath)}catch(t){e.$reject(t);return}}else{h={}}o.reportUnboundMessagesAsJSON(e.url,f.call(d,"sap-messages"));c=f.call(d,"ETag");if(c){h["@odata.etag"]=c}e.$resolve(h)}})}function s(e){if(Array.isArray(e)){e.forEach(s)}else if(e.$submit){e.$submit()}}function a(e,t){if(Array.isArray(t)){t.forEach(a.bind(null,e))}else{t.$reject(e)}}delete this.mBatchQueue[e];s(n);t=this.cleanUpChangeSets(n);if(n.length===0){return Promise.resolve()}this.batchRequestSent(e,t);return this.sendBatch(c.cleanBatch(n)).then(function(r){o.batchResponseReceived(e,t);i(n,r)}).catch(function(r){var i=new Error("HTTP request was not processed because $batch failed");function s(e){e.forEach(function(e){if(Array.isArray(e)){s(e)}else{e.$reject(i)}})}o.batchResponseReceived(e,t);i.cause=r;s(n);throw r})};c={cleanBatch:function(e){e.forEach(function(e){if(Array.isArray(e)){c.cleanBatch(e)}else{e.body=c.cleanPayload(e.body)}});return e},cleanPayload:function(e){var t=e;if(t){Object.keys(t).forEach(function(r){if(r.indexOf("@$ui5.")===0){if(t===e){t=s.extend({},e)}delete t[r]}})}return t},create:function(e,t,r,o,i){var s=new d(e,r,o,t);if(i==="2.0"){n(s)}return s}};return c},false);