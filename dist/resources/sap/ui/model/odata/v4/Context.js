/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_GroupLock","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(t,e,i,n,o){"use strict";var r="sap.ui.model.odata.v4.Context",s,h=0,d=-9007199254740991;function u(t,e,i,o){var r,s=[t.fetchValue(e,null,o)],h=t.getPath(e);if(i){s.push(t.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(t){var e=t[1],n=t[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return i?e.formatValue(n,"string"):n})}var a=o.extend("sap.ui.model.odata.v4.Context",{constructor:function(t,e,i,r,s,h){if(i[0]!=="/"){throw new Error("Not an absolute path: "+i)}if(i.slice(-1)==="/"){throw new Error("Unsupported trailing slash: "+i)}o.call(this,t,i);this.oBinding=e;this.oCreatePromise=s&&Promise.resolve(s).then(function(){});this.oSyncCreatePromise=s&&n.resolve(s);this.iIndex=r;this.iReturnValueContextId=h}});a.prototype._delete=function(t,e){var i=this;if(this.isTransient()){return this.oBinding._delete(t,"n/a",this)}return this.fetchCanonicalPath().then(function(n){return i.oBinding._delete(t,n.slice(1),i,e)})};a.prototype.adjustPredicate=function(t,e,i){var n=this.sPath;if(n.includes(t)){this.sPath=n.split("/").map(function(i){if(i.endsWith(t)){i=i.slice(0,-t.length)+e}return i}).join("/");if(i){i(n,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(i){i.adjustPredicate(t,e)})}};a.prototype.checkUpdate=function(){return n.all(this.oModel.getDependentBindings(this).map(function(t){return t.checkUpdate()}))};a.prototype.created=function(){return this.oCreatePromise};a.prototype.delete=function(t){var e,i=this.oModel,n=this;i.checkGroupId(t);this.oBinding.checkSuspended();if(!this.isTransient()&&this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes")}e=this.oBinding.lockGroup(t,true);return this._delete(e).then(function(){var t=n.sPath.slice(1);i.getAllBindings().forEach(function(e){e.removeCachesAndMessages(t,true)})}).catch(function(t){e.unlock(true);i.reportError("Failed to delete "+n,r,t);throw t})};a.prototype.destroy=function(){this.oModel.getDependentBindings(this).forEach(function(t){t.setContext(undefined)});this.oBinding=undefined;this.oModel=undefined;o.prototype.destroy.apply(this)};a.prototype.doSetProperty=function(t,i,n,o){var s=this.oModel.getMetaModel(),h=this;if(this.oModel.bAutoExpandSelect){t=this.oModel.getMetaModel().getReducedPath(e.buildPath(this.sPath,t),this.oBinding.getBaseForPathReduction())}return s.fetchUpdateData(t,this).then(function(e){return h.withCache(function(d,u,a){var c=false;function p(e){h.oModel.reportError("Failed to update path "+h.oModel.resolve(t,h),r,e);l(false)}function l(t){if(c){a.firePatchCompleted(t);c=false}}function f(){c=true;a.firePatchSent()}return d.update(n,e.propertyPath,i,o?undefined:p,e.editUrl,u,s.getUnitOrCurrencyPath(h.oModel.resolve(t,h)),a.isPatchWithoutSideEffects(),f).then(function(){l(true)},function(t){l(false);throw t})},e.entityPath)})};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchValue=function(t,i,o){if(this.iIndex===d){return n.resolve()}if(!t||t[0]!=="/"){t=e.buildPath(this.sPath,t);if(this.oModel.bAutoExpandSelect){t=this.oModel.getMetaModel().getReducedPath(t,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(t,i,o)};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.oBinding.bCreatedAtEnd){return this.iIndex<0?this.oBinding.iMaxLength-this.iIndex-1:this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};a.prototype.getProperty=function(t,e){var n,o;this.oBinding.checkSuspended();o=u(this,t,e,true);if(o.isRejected()){o.caught();n=o.getResult();if(n.isNotPrimitive){throw n}else if(!n.$cached){i.warning(n.message,t,r)}}return o.isFulfilled()?o.getResult():undefined};a.prototype.getReturnValueContextId=function(){if(this.iReturnValueContextId){return this.iReturnValueContextId}if(this.oBinding.bRelative&&this.oBinding.oContext&&this.oBinding.oContext.getReturnValueContextId){return this.oBinding.oContext.getReturnValueContextId()}};a.prototype.getQueryOptionsForPath=function(t){return this.oBinding.getQueryOptionsForPath(t)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(t){var e,i=this;this.oBinding.checkSuspended();e=this.fetchValue(t,null,true).catch(function(t){if(!t.$cached){i.oModel.reportError("Unexpected error",r,t)}});if(e.isFulfilled()){return e.getResult()}};a.prototype.hasPendingChanges=function(){return this.isTransient()||this.oModel.getDependentBindings(this).some(function(t){return t.hasPendingChanges()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};a.prototype.patch=function(t){return this.withCache(function(e,i){e.patch(i,t)},"")};a.prototype.refresh=function(t,e){this.oModel.checkGroupId(t);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),e)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+e)}if(!this.oBinding.refreshReturnValueContext(this,t)){this.oBinding.refresh(t)}}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1))};a.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};a.prototype.requestProperty=function(t,e){this.oBinding.checkSuspended();return Promise.resolve(u(this,t,e))};a.prototype.requestSideEffects=function(t,e){var i=this.oBinding.oCachePromise.getResult(),n;this.oBinding.checkSuspended();this.oModel.checkGroupId(e);if(!i||this.isTransient()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(this.oBinding.bRelative&&!this.oBinding.oContext){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}n=t.map(function(t){if(t&&typeof t==="object"){if(t.$PropertyPath){return t.$PropertyPath}if("$NavigationPropertyPath"in t){return t.$NavigationPropertyPath}}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(t))});e=e||this.getUpdateGroupId();if(this.oModel.isAutoGroup(e)){this.oModel.oRequestor.relocateAll("$parked."+e,e)}return Promise.resolve(this.oBinding.requestSideEffects(e,n,this)).then(function(){})};a.prototype.setProperty=function(t,e,i){var n;this.oBinding.checkSuspended();this.oModel.checkGroupId(i);if(typeof e==="function"||e&&typeof e==="object"){throw new Error("Not a primitive value")}n=this.oModel.lockGroup(i||this.getUpdateGroupId(),true);return this.doSetProperty(t,e,n,true).catch(function(t){n.unlock(true);throw t})};a.prototype.toString=function(){var t="";if(this.iIndex!==undefined){t="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+t};a.prototype.withCache=function(t,i){if(this.iIndex===d){return n.resolve()}return this.oBinding.withCache(t,i[0]==="/"?i:e.buildPath(this.sPath,i))};s={create:function(t,e,i,n,o){return new a(t,e,i,n,o)},createReturnValueContext:function(t,e,i){h+=1;return new a(t,e,i,undefined,undefined,h)}};Object.defineProperty(s,"VIRTUAL",{value:d});return s},false);