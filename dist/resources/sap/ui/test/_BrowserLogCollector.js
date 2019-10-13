/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/thirdparty/jquery"],function(e,o){"use strict";var t=500;var r=[{name:"trace",methods:["trace"]},{name:"debug",methods:["debug"]},{name:"info",methods:["log","info","warn"]},{name:"error",methods:["error"]}];var n;var s=e.extend("sap.ui.test._BrowserLogCollector",{constructor:function(){this._console={};this._logs=[]},start:function(e,n){if(!o.isEmptyObject(this._console)){throw new Error("_BrowserLogCollector: 'start' has already been called. Call 'stop' before re-starting the _BrowserLogCollector instance.")}n=n||t;e=e&&e.trim().toLowerCase()||"error";var s=false;var a=this;var c=r.filter(function(o){s=s||o.name===e;return s});if(!c.length){throw new Error("_BrowserLogCollector: log level '"+e+"' is not known.")}c.forEach(function(e){var o=l();e.methods.filter(function(e){return o[e]}).forEach(function(t){a._console[t]=o[t];o[t]=function(){var o={level:e.name,message:i(Array.prototype.slice.call(arguments))};if(a._logs.length<n){a._logs.unshift(o)}else{a._logs.unshift(o);a._logs.pop()}a._console[t].apply(this,arguments)}})})},getAndClearLogs:function(e){return{logs:this._logs.splice(0,this._logs.length)}},stop:function(){this._stopAndClearLogs()},destroy:function(){this._stopAndClearLogs()},_stopAndClearLogs:function(){var e=l();for(var o in this._console){if(e[o]){e[o]=this._console[o]}}this._console={};this._logs=[]}});s.getInstance=function(){n=n||new s;return n};s._MAX_COUNT=t;s._LEVELS=r;function l(){return Object.getPrototypeOf(console).log?Object.getPrototypeOf(console):console}function i(e){var o;var t=new RegExp("%(o|O|d|i|s|f)","g");if(e[0].match(t)){var r=0;o=e[0].replace(t,function(o){return e.length>r?e[r+=1]:o})}else if(e.length>1){o=e.join(" ")}else{o=e[0]}return o}return s});