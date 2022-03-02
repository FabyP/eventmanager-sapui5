/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./SubmitMode","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason","sap/ui/thirdparty/jquery"],function(e,t,n,r,i,o,s){"use strict";function a(){e.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined}e(a.prototype);var h="sap.ui.model.odata.v4.ODataParentBinding";a.prototype.attachPatchCompleted=function(e,t){this.attachEvent("patchCompleted",e,t)};a.prototype.detachPatchCompleted=function(e,t){this.detachEvent("patchCompleted",e,t)};a.prototype.firePatchCompleted=function(e){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent")}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&e;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true}};a.prototype.attachPatchSent=function(e,t){this.attachEvent("patchSent",e,t)};a.prototype.detachPatchSent=function(e,t){this.detachEvent("patchSent",e,t)};a.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent")}};a.prototype._findEmptyPathParentContext=function(e){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext)}return e};a.prototype.aggregateQueryOptions=function(e,t){var n=s.extend(true,{},this.mAggregatedQueryOptions);function r(e,n,i){var o,s;function a(i){if(e.$expand[i]){return r(e.$expand[i],n.$expand[i],true)}if(t){return false}e.$expand[i]=o[i];return true}function h(n){if(e.$select.indexOf(n)<0){if(t){return false}e.$select.push(n)}return true}o=n.$expand;if(o){e.$expand=e.$expand||{};if(!Object.keys(o).every(a)){return false}}s=n.$select;if(s){e.$select=e.$select||[];if(!s.every(h)){return false}}if(n.$count){e.$count=true}return Object.keys(n).concat(Object.keys(e)).every(function(t){if(t==="$count"||t==="$expand"||t==="$select"||!i&&!(t in n)){return true}return n[t]===e[t]})}if(r(n,e)){this.mAggregatedQueryOptions=n;return true}return false};a.prototype.changeParameters=function(e){var t=s.extend(true,{},this.mParameters),n,r,i=this;function a(t){if(i.oModel.bAutoExpandSelect&&t in e){throw new Error("Cannot change $expand or $select parameter in "+"auto-$expand/$select mode: "+t+"="+JSON.stringify(e[t]))}}function h(e){if(e==="$filter"||e==="$search"){n=o.Filter}else if(e==="$orderby"&&n!==o.Filter){n=o.Sort}else if(!n){n=o.Change}}if(!e){throw new Error("Missing map of binding parameters")}a("$expand");a("$select");if(this.hasPendingChanges()){throw new Error("Cannot change parameters due to pending changes")}for(r in e){if(r.indexOf("$$")===0){throw new Error("Unsupported parameter: "+r)}if(e[r]===undefined&&t[r]!==undefined){h(r);delete t[r]}else if(t[r]!==e[r]){h(r);if(typeof e[r]==="object"){t[r]=s.extend(true,{},e[r])}else{t[r]=e[r]}}}if(n){this.createReadGroupLock(this.getGroupId(),true);this.applyParameters(t,n)}};a.prototype.checkUpdateInternal=function(e){var t=this;function n(){return i.all(t.getDependentBindings().map(function(e){return e.checkUpdateInternal()}))}if(e!==undefined){throw new Error("Unsupported operation: "+h+"#checkUpdateInternal must not"+" be called with parameters")}return this.oCachePromise.then(function(e){if(e&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(e.$resourcePath===r){return n()}return t.refreshInternal("")})}return n()})};a.prototype.createInCache=function(e,t,r,i,o,s,a,h){var u=this;return this.oCachePromise.then(function(c){if(c){return c.create(e,t,r,i,o,s,a,h).then(function(e){if(c.$resourcePath){delete u.mCacheByResourcePath[c.$resourcePath]}return e})}return u.oContext.getBinding().createInCache(e,t,n.buildPath(u.oContext.iIndex,u.sPath,r),i,o,s,a,h)})};a.prototype.createReadGroupLock=function(e,t,n){var i,o=this;function s(){sap.ui.getCore().addPrerenderingTask(function(){n-=1;if(n>0){Promise.resolve().then(s)}else if(o.oReadGroupLock===i){r.debug("Timeout: unlocked "+i,null,h);o.removeReadGroupLock()}})}this.removeReadGroupLock();this.oReadGroupLock=i=this.lockGroup(e,t);if(t){n=2+(n||0);s()}};a.prototype.createRefreshPromise=function(){var e,t;e=new Promise(function(e){t=e});e.$resolve=t;this.oRefreshPromise=e;return e};a.prototype.deleteFromCache=function(e,t,r,i,o){var s=this.oCachePromise.getResult(),a;if(!this.oCachePromise.isFulfilled()){throw new Error("DELETE request not allowed")}if(s){a=e.getGroupId();if(!this.oModel.isAutoGroup(a)&&!this.oModel.isDirectGroup(a)){throw new Error("Illegal update group ID: "+a)}return s._delete(e,t,r,i,o)}return this.oContext.getBinding().deleteFromCache(e,t,n.buildPath(this.oContext.iIndex,this.sPath,r),i,o)};a.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;e.prototype.destroy.apply(this)};a.prototype.fetchIfChildCanUseCache=function(e,t,o){var a=this.getBaseForPathReduction(),u,c,d,p,f=t[0]==="#",l=this.oModel.getMetaModel(),g,P=this.oModel.resolve(t,e),m=this.oModel.resolve(this.sPath,this.oContext),C=m.indexOf("(...)")>=0,y=this;function R(){if(f){return l.fetchObject(p.slice(0,p.lastIndexOf("/")+1))}return l.fetchObject(p).then(function(e){if(e&&e.$kind==="NavigationProperty"){return l.fetchObject(p+"/").then(function(){return e})}return e})}if(C||this.getRootBinding().isSuspended()){return i.resolve(P)}c=this.oCachePromise.isRejected()||this.oCachePromise.isFulfilled()&&!this.oCachePromise.getResult()||this.oCachePromise.isFulfilled()&&this.oCachePromise.getResult().bSentReadRequest;u=l.getMetaPath(e.getPath());p=l.getMetaPath(P);g=[this.doFetchQueryOptions(this.oContext),R(),o];d=i.all(g).then(function(e){var d,g=e[2],C,R=e[0],v=e[1],b=l.getReducedPath(P,a);if(t==="$count"||t.slice(-7)==="/$count"||t[0]==="@"){return i.resolve(b)}if(n.getRelativePath(b,m)===undefined){return y.oContext.getBinding().fetchIfChildCanUseCache(y.oContext,n.getRelativePath(P,y.oContext.getPath()),o)}d=n.getRelativePath(n.getMetaPath(b),u);if(y.bAggregatedQueryOptionsInitial){y.selectKeyProperties(R,u);y.mAggregatedQueryOptions=s.extend(true,{},R);y.bAggregatedQueryOptionsInitial=false}if(f){C={$select:[d.slice(1)]};return y.aggregateQueryOptions(C,c)?b:undefined}if(d===""||v&&(v.$kind==="Property"||v.$kind==="NavigationProperty")){C=n.wrapChildQueryOptions(u,d,g,y.oModel.oRequestor.getModelInterface().fetchMetadata);if(C){return y.aggregateQueryOptions(C,c)?b:undefined}return undefined}if(d==="value"){return y.aggregateQueryOptions(g,c)?b:undefined}r.error("Failed to enhance query options for auto-$expand/$select as the path '"+p+"' does not point to a property",JSON.stringify(v),h);return undefined});this.aChildCanUseCachePromises.push(d);this.oCachePromise=i.all([this.oCachePromise,d]).then(function(e){var t=e[0];if(t&&!t.bSentReadRequest){t.setQueryOptions(s.extend(true,{},y.oModel.mUriParameters,y.mAggregatedQueryOptions))}return t});this.oCachePromise.catch(function(e){y.oModel.reportError(y+": Failed to enhance query options for "+"auto-$expand/$select for child "+t,h,e)});return d};a.prototype.getBaseForPathReduction=function(){var e,n;if(!this.isRoot()){e=this.oContext.getBinding();n=e.getUpdateGroupId();if(n===this.getUpdateGroupId()||this.oModel.getGroupProperty(n,"submit")!==t.API){return e.getBaseForPathReduction()}}return this.oModel.resolve(this.sPath,this.oContext)};a.prototype.getQueryOptionsForPath=function(e,t){if(Object.keys(this.mParameters).length){return n.getQueryOptionsForPath(this.mQueryOptions,e)}t=t||this.oContext;if(!this.bRelative||!t.getQueryOptionsForPath){return{}}return t.getQueryOptionsForPath(n.buildPath(this.sPath,e))};a.prototype.getResumePromise=function(){return this.oResumePromise};a.prototype.hasPendingChangesInDependents=function(){var e=this.getDependentBindings();return e.some(function(e){var t,n;if(e.oCachePromise.isFulfilled()){t=e.oCachePromise.getResult();if(t&&t.hasPendingChangesForPath("")){return true}}if(e.mCacheByResourcePath){n=Object.keys(e.mCacheByResourcePath).some(function(t){return e.mCacheByResourcePath[t].hasPendingChangesForPath("")});if(n){return true}}return e.hasPendingChangesInDependents()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.oModel.resolve(this.sPath,this.oContext).slice(1))};a.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects()};a.prototype.isMeta=function(){return false};a.prototype.refreshDependentBindings=function(e,t,n,r){return i.all(this.getDependentBindings().map(function(i){return i.refreshInternal(e,t,n,r)}))};a.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined}};a.prototype.refreshSuspended=function(e){if(e&&e!==this.getGroupId()){throw new Error(this+": Cannot refresh a suspended binding with group ID '"+e+"' (own group ID is '"+this.getGroupId()+"')")}this.setResumeChangeReason(o.Refresh)};a.prototype.resetChangesInDependents=function(){this.getDependentBindings().forEach(function(e){var t;if(e.oCachePromise.isFulfilled()){t=e.oCachePromise.getResult();if(t){t.resetChangesForPath("")}e.resetInvalidDataState()}if(e.mCacheByResourcePath){Object.keys(e.mCacheByResourcePath).forEach(function(t){e.mCacheByResourcePath[t].resetChangesForPath("")})}e.resetChangesInDependents()})};a.prototype.resolveRefreshPromise=function(e){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(e);this.oRefreshPromise=null}return e};a.prototype.resume=function(){var e=this;if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this)}if(this.bRelative&&(!this.oContext||this.oContext.fetchValue)){throw new Error("Cannot resume a relative binding: "+this)}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this)}this.createReadGroupLock(this.getGroupId(),true,1);sap.ui.getCore().addPrerenderingTask(function(){e.bSuspended=false;if(e.oResumePromise){e.resumeInternal(true);e.oResumePromise.$resolve();e.oResumePromise=undefined}})};a.prototype.selectKeyProperties=function(e,t){n.selectKeyProperties(e,this.oModel.getMetaModel().getObject(t+"/"))};a.prototype.suspend=function(){var e;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this)}if(this.bRelative&&(!this.oContext||this.oContext.fetchValue)){throw new Error("Cannot suspend a relative binding: "+this)}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this)}if(this.hasPendingChanges()){throw new Error("Cannot suspend a binding with pending changes: "+this)}this.bSuspended=true;this.oResumePromise=new i(function(t,n){e=t});this.oResumePromise.$resolve=e;this.removeReadGroupLock()};a.prototype.updateAggregatedQueryOptions=function(e){var t=Object.keys(e),n=this;if(this.mAggregatedQueryOptions){t=t.concat(Object.keys(this.mAggregatedQueryOptions));t.forEach(function(t){if(t==="$select"||t==="$expand"){return}if(e[t]===undefined){delete n.mAggregatedQueryOptions[t]}else{n.mAggregatedQueryOptions[t]=e[t]}})}};a.prototype.visitSideEffects=function(e,t,r,i,o,s){var a=r?this.oModel.getDependentBindings(r):this.getDependentBindings();a.forEach(function(r){var a=n.buildPath(s,n.getMetaPath(r.getPath())),h;if(r.oCachePromise.getResult()){h=n.stripPathPrefix(a,t);if(h.length){o.push(r.requestSideEffects(e,h))}}else if(i[a]){o.push(r.refreshInternal("",e))}else{r.visitSideEffects(e,t,null,i,o,a)}})};function u(e){if(this){a.apply(this,arguments)}else{s.extend(e,a.prototype)}}u.prototype.destroy=a.prototype.destroy;return u},false);