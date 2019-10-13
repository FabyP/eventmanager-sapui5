/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={}}if(typeof window.sap.ui!=="object"){window.sap.ui={}}(function(){"use strict";if(typeof window.sap.ui.Device==="object"||typeof window.sap.ui.Device==="function"){var e="1.70.0";window.sap.ui.Device._checkAPIVersion(e);return}var n={};var i=0,t=1,r=2,o=3,a=4,s=5;var u=function(){function e(e,n){return("000"+String(e)).slice(-n)}this.defaultComponent="DEVICE";this.sWindowName=window.top==window?"":"["+window.location.pathname.split("/").slice(-1)[0]+"] ";this.log=function(n,u,d){d=d||this.defaultComponent||"";var l=new Date,f={time:e(l.getHours(),2)+":"+e(l.getMinutes(),2)+":"+e(l.getSeconds(),2),date:e(l.getFullYear(),4)+"-"+e(l.getMonth()+1,2)+"-"+e(l.getDate(),2),timestamp:l.getTime(),level:n,message:u||"",component:d||""};if(window.console){var c=f.date+" "+f.time+" "+this.sWindowName+f.message+" - "+f.component;switch(n){case i:case t:console.error(c);break;case r:console.warn(c);break;case o:console.info?console.info(c):console.log(c);break;case a:console.debug?console.debug(c):console.log(c);break;case s:console.trace?console.trace(c):console.log(c);break}}return f}};var d=new u;d.log(o,"Device API logging initialized");n._checkAPIVersion=function(e){var n="1.70.0";if(n!=e){d.log(r,"Device API version differs: "+n+" <-> "+e)}};var l={};function f(e,n,i){if(!l[e]){l[e]=[]}l[e].push({oListener:i,fFunction:n})}function c(e,n,i){var t=l[e];if(!t){return this}for(var r=0,o=t.length;r<o;r++){if(t[r].fFunction===n&&t[r].oListener===i){t.splice(r,1);break}}if(t.length==0){delete l[e]}}function m(e,n){var i=l[e];var t;if(i){i=i.slice();for(var r=0,o=i.length;r<o;r++){t=i[r];t.fFunction.call(t.oListener||window,n)}}}var v={WINDOWS:"win",MACINTOSH:"mac",LINUX:"linux",IOS:"iOS",ANDROID:"Android",BLACKBERRY:"bb",WINDOWS_PHONE:"winphone"};function w(e){e=e||navigator.userAgent;var n,i;function t(){var n=navigator.platform;if(n.indexOf("Win")!=-1){var i=/Windows NT (\d+).(\d)/i;var t=e.match(i);var r="";if(t[1]=="6"){if(t[2]==1){r="7"}else if(t[2]>1){r="8"}}else{r=t[1]}return{name:v.WINDOWS,versionStr:r}}else if(n.indexOf("Mac")!=-1){return{name:v.MACINTOSH,versionStr:""}}else if(n.indexOf("Linux")!=-1){return{name:v.LINUX,versionStr:""}}d.log(o,"OS detection returned no result");return null}n=/Windows Phone (?:OS )?([\d.]*)/;i=e.match(n);if(i){return{name:v.WINDOWS_PHONE,versionStr:i[1]}}if(e.indexOf("(BB10;")>0){n=/\sVersion\/([\d.]+)\s/;i=e.match(n);if(i){return{name:v.BLACKBERRY,versionStr:i[1]}}else{return{name:v.BLACKBERRY,versionStr:"10"}}}n=/\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;i=e.match(n);if(i){var r=/iPhone|iPad|iPod/;var a=/PlayBook|BlackBerry/;if(i[0].match(r)){i[3]=i[3].replace(/_/g,".");return{name:v.IOS,versionStr:i[3]}}else if(i[2].match(/Android/)){i[2]=i[2].replace(/\s/g,"");return{name:v.ANDROID,versionStr:i[3]}}else if(i[0].match(a)){return{name:v.BLACKBERRY,versionStr:i[4]}}}n=/\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;i=e.match(n);if(i){return{name:v.ANDROID,versionStr:i.length==3?i[2]:""}}return t()}function p(e){n.os=w(e)||{};n.os.OS=v;n.os.version=n.os.versionStr?parseFloat(n.os.versionStr):-1;if(n.os.name){for(var i in v){if(v[i]===n.os.name){n.os[i.toLowerCase()]=true}}}}p();n._setOS=p;var h={INTERNET_EXPLORER:"ie",EDGE:"ed",FIREFOX:"ff",CHROME:"cr",SAFARI:"sf",ANDROID:"an"};var S=navigator.userAgent;function g(e,n){
/*!
		 * Taken from jQuery JavaScript Library v1.7.1
		 * http://jquery.com/
		 *
		 * Copyright 2011, John Resig
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * Includes Sizzle.js
		 * http://sizzlejs.com/
		 * Copyright 2011, The Dojo Foundation
		 * Released under the MIT, BSD, and GPL Licenses.
		 *
		 * Date: Mon Nov 21 21:11:03 2011 -0500
		 */
function i(e){var n=(e||S).toLowerCase();var i=/(webkit)[ \/]([\w.]+)/;var t=/(opera)(?:.*version)?[ \/]([\w.]+)/;var r=/(msie) ([\w.]+)/;var o=/(trident)\/[\w.]+;.*rv:([\w.]+)/;var a=/(edge)[ \/]([\w.]+)/;var s=/(mozilla)(?:.*? rv:([\w.]+))?/;var u=a.exec(n)||o.exec(n)||i.exec(n)||t.exec(n)||r.exec(n)||n.indexOf("compatible")<0&&s.exec(n)||[];var d={browser:u[1]||"",version:u[2]||"0"};d[d.browser]=true;return d}var t=i(e);var r=e||S;var o=n||window.navigator;var a;var s;if(t.mozilla){a=/Mobile/;if(r.match(/Firefox\/(\d+\.\d+)/)){var u=parseFloat(RegExp.$1);s={name:h.FIREFOX,versionStr:""+u,version:u,mozilla:true,mobile:a.test(r)}}else{s={mobile:a.test(r),mozilla:true,version:-1}}}else if(t.webkit){var d=r.toLowerCase().match(/webkit[\/]([\d.]+)/);var l;if(d){l=d[1]}a=/Mobile/;var f=r.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);var c=r.match(/FxiOS\/(\d+\.\d+)/);var m=r.match(/Android .+ Version\/(\d+\.\d+)/);if(f||c||m){var v,w,p;if(f){v=h.CHROME;p=a.test(r);w=parseFloat(f[2])}else if(c){v=h.FIREFOX;p=true;w=parseFloat(c[1])}else if(m){v=h.ANDROID;p=a.test(r);w=parseFloat(m[1])}s={name:v,mobile:p,versionStr:""+w,version:w,webkit:true,webkitVersion:l}}else{var g=/(Version|PhantomJS)\/(\d+\.\d+).*Safari/;var E=o.standalone;if(g.test(r)){var b=g.exec(r);var u=parseFloat(b[2]);s={name:h.SAFARI,versionStr:""+u,fullscreen:false,webview:false,version:u,mobile:a.test(r),webkit:true,webkitVersion:l,phantomJS:b[1]==="PhantomJS"}}else if(/iPhone|iPad|iPod/.test(r)&&!/CriOS/.test(r)&&!/FxiOS/.test(r)&&(E===true||E===false)){s={name:h.SAFARI,version:-1,fullscreen:E,webview:!E,mobile:a.test(r),webkit:true,webkitVersion:l}}else{s={mobile:a.test(r),webkit:true,webkitVersion:l,version:-1}}}}else if(t.msie||t.trident){var u;if(document.documentMode&&!e){if(document.documentMode===7){u=8}else{u=parseFloat(document.documentMode)}}else{u=parseFloat(t.version)}s={name:h.INTERNET_EXPLORER,versionStr:""+u,version:u,msie:true,mobile:false}}else if(t.edge){var u=u=parseFloat(t.version);s={name:h.EDGE,versionStr:""+u,version:u,edge:true}}else{s={name:"",versionStr:"",version:-1,mobile:false}}if((t.chrome||window.Intl&&window.Intl.v8BreakIterator)&&"CSS"in window){s.blink=true}return s}n._testUserAgent=g;function E(){n.browser=g();n.browser.BROWSER=h;if(n.browser.name){for(var e in h){if(h[e]===n.browser.name){n.browser[e.toLowerCase()]=true}}}}E();n.support={};n.support.touch=!!("ontouchstart"in window||navigator.maxTouchPoints>0||window.DocumentTouch&&document instanceof window.DocumentTouch);if(n.browser.phantomJS){d.log(t,"PhantomJS is not supported! UI5 might break on PhantomJS in future releases. Please use Chrome Headless instead.");n.support.touch=false}n.support.pointer=!!window.PointerEvent;n.support.matchmedia=!!window.matchMedia;var b=n.support.matchmedia?window.matchMedia("all and (max-width:0px)"):null;n.support.matchmedialistener=!!(b&&b.addListener);n.support.orientation=!!("orientation"in window&&"onorientationchange"in window);n.support.retina=window.retina||window.devicePixelRatio>=2;n.support.websocket="WebSocket"in window;n.support.input={};n.support.input.placeholder="placeholder"in document.createElement("input");n.media={};var A={SAP_3STEPS:"3Step",SAP_4STEPS:"4Step",SAP_6STEPS:"6Step",SAP_STANDARD:"Std",SAP_STANDARD_EXTENDED:"StdExt"};n.media.RANGESETS=A;n.media._predefinedRangeSets={};n.media._predefinedRangeSets[A.SAP_3STEPS]={points:[520,960],unit:"px",name:A.SAP_3STEPS,names:["S","M","L"]};n.media._predefinedRangeSets[A.SAP_4STEPS]={points:[520,760,960],unit:"px",name:A.SAP_4STEPS,names:["S","M","L","XL"]};n.media._predefinedRangeSets[A.SAP_6STEPS]={points:[241,400,541,768,960],unit:"px",name:A.SAP_6STEPS,names:["XS","S","M","L","XL","XXL"]};n.media._predefinedRangeSets[A.SAP_STANDARD]={points:[600,1024],unit:"px",name:A.SAP_STANDARD,names:["Phone","Tablet","Desktop"]};n.media._predefinedRangeSets[A.SAP_STANDARD_EXTENDED]={points:[600,1024,1440],unit:"px",name:A.SAP_STANDARD_EXTENDED,names:["Phone","Tablet","Desktop","LargeDesktop"]};var D=A.SAP_STANDARD;var R=n.support.matchmedialistener?0:100;var P={};var T=null;function O(e,n,i){i=i||"px";var t="all";if(e>0){t=t+" and (min-width:"+e+i+")"}if(n>0){t=t+" and (max-width:"+n+i+")"}return t}function _(e){if(!n.support.matchmedialistener&&T==k()[0]){return}if(P[e].timer){clearTimeout(P[e].timer);P[e].timer=null}P[e].timer=setTimeout(function(){var n=N(e,false);if(n){m("media_"+e,n)}},R)}function N(e,i,t){function o(e,n){var i=P[e].queries[n];var t={from:i.from,unit:P[e].unit};if(i.to>=0){t.to=i.to}if(P[e].names){t.name=P[e].names[n]}return t}t=t||n.media.matches;if(P[e]){var a=P[e].queries;var s=null;for(var u=0,l=a.length;u<l;u++){var f=a[u];if((f!=P[e].currentquery||i)&&t(f.from,f.to,P[e].unit)){if(!i){P[e].currentquery=f}if(!P[e].noClasses&&P[e].names&&!i){I(e,P[e].names[u])}s=o(e,u)}}return s}d.log(r,"No queryset with name "+e+" found","DEVICE.MEDIA");return null}function I(e,n,i){var t="sapUiMedia-"+e+"-";x(t+n,i,t)}function x(e,n,i){var t=document.documentElement;if(t.className.length==0){if(!n){t.className=e}}else{var r=t.className.split(" ");var o="";for(var a=0;a<r.length;a++){if(i&&r[a].indexOf(i)!=0||!i&&r[a]!=e){o=o+r[a]+" "}}if(!n){o=o+e}t.className=o}}function k(){return[window.innerWidth,window.innerHeight]}function L(e,n,i,t){function r(e,n){if(n==="em"||n==="rem"){var i=window.getComputedStyle||function(e){return e.currentStyle};var t=i(document.documentElement).fontSize;var r=t&&t.indexOf("px")>=0?parseFloat(t,10):16;return e*r}return e}e=r(e,i);n=r(n,i);var o=t[0];var a=e<0||e<=o;var s=n<0||o<=n;return a&&s}function C(e,n,i){return L(e,n,i,k())}function y(e,n,i){var t=O(e,n,i);var r=window.matchMedia(t);return r&&r.matches}n.media.matches=n.support.matchmedia?y:C;n.media.attachHandler=function(e,n,i){var t=i||D;f("media_"+t,e,n)};n.media.detachHandler=function(e,n,i){var t=i||D;c("media_"+t,e,n)};n.media.initRangeSet=function(e,i,t,r,a){var s;if(!e){s=n.media._predefinedRangeSets[D]}else if(e&&n.media._predefinedRangeSets[e]){s=n.media._predefinedRangeSets[e]}else{s={name:e,unit:(t||"px").toLowerCase(),points:i||[],names:r,noClasses:!!a}}if(n.media.hasRangeSet(s.name)){d.log(o,"Range set "+s.name+" has already been initialized","DEVICE.MEDIA");return}e=s.name;s.queries=[];s.timer=null;s.currentquery=null;s.listener=function(){return _(e)};var u,l,f;var c=s.points;for(var m=0,v=c.length;m<=v;m++){u=m==0?0:c[m-1];l=m==c.length?-1:c[m];f=O(u,l,s.unit);s.queries.push({query:f,from:u,to:l})}if(s.names&&s.names.length!=s.queries.length){s.names=null}P[s.name]=s;if(n.support.matchmedialistener){s.queries.forEach(function(e){e.media=window.matchMedia(e.query);e.media.addListener(s.listener)})}else{window.addEventListener("resize",s.listener,false);window.addEventListener("orientationchange",s.listener,false)}s.listener()};n.media.getCurrentRange=function(e,i){if(!n.media.hasRangeSet(e)){return null}return N(e,true,isNaN(i)?null:function(e,n,t){return L(e,n,t,[i,0])})};n.media.hasRangeSet=function(e){return e&&!!P[e]};n.media.removeRangeSet=function(e){if(!n.media.hasRangeSet(e)){d.log(o,"RangeSet "+e+" not found, thus could not be removed.","DEVICE.MEDIA");return}for(var i in A){if(e===A[i]){d.log(r,"Cannot remove default rangeset - no action taken.","DEVICE.MEDIA");return}}var t=P[e];if(n.support.matchmedialistener){var a=t.queries;for(var s=0;s<a.length;s++){a[s].media.removeListener(t.listener)}}else{window.removeEventListener("resize",t.listener,false);window.removeEventListener("orientationchange",t.listener,false)}I(e,"",true);delete l["media_"+e];delete P[e]};var F={TABLET:"tablet",PHONE:"phone",DESKTOP:"desktop",COMBI:"combi"};n.system={};function M(e,i){var t=z(i);var r=n.os.windows&&n.os.version>=8;var o=n.os.windows&&n.os.version===7;var a={};a.tablet=!!((n.support.touch&&!o||r||!!e)&&t);a.phone=!!(n.os.windows_phone||(n.support.touch&&!o||!!e)&&!t);a.desktop=!!(!a.tablet&&!a.phone||r||o||n.os.linux);a.combi=a.desktop&&a.tablet;a.SYSTEMTYPE=F;for(var s in F){x("sap-"+F[s],!a[F[s]])}return a}function z(e){var i=e||navigator.userAgent;if(n.os.name===n.os.OS.IOS){return/ipad/i.test(i)}else{if(n.support.touch){if(n.os.windows&&n.os.version>=8){return true}if(n.browser.chrome&&n.os.android&&n.os.version>=4.4){return!/Mobile Safari\/[.0-9]+/.test(i)}else{var t=window.devicePixelRatio?window.devicePixelRatio:1;if(n.os.android&&n.browser.webkit&&parseFloat(n.browser.webkitVersion)>537.1){t=1}var r=Math.min(window.screen.width/t,window.screen.height/t)>=600;if(te()&&(window.screen.height===552||window.screen.height===553)&&/Nexus 7/i.test(i)){r=true}return r}}else{var o=/(?=android)(?=.*mobile)/i.test(i);return n.browser.msie&&i.indexOf("Touch")!==-1||n.os.android&&!o}}}function B(e,i){n.system=M(e,i);if(n.system.tablet||n.system.phone){n.browser.mobile=true}}B();n._getSystem=M;n.orientation={};n.resize={};n.orientation.attachHandler=function(e,n){f("orientation",e,n)};n.resize.attachHandler=function(e,n){f("resize",e,n)};n.orientation.detachHandler=function(e,n){c("orientation",e,n)};n.resize.detachHandler=function(e,n){c("resize",e,n)};function X(e){e.landscape=te(true);e.portrait=!e.landscape}function H(){X(n.orientation);m("orientation",{landscape:n.orientation.landscape})}var V=n.resize._update=function(){W(n.resize);m("resize",{height:n.resize.height,width:n.resize.width})};function W(e){e.width=k()[0];e.height=k()[1]}function q(){var e=n.orientation.landscape;var i=te();if(e!=i){H()}if(!j){j=window.setTimeout(U,150)}}function U(){V();j=null}var Y=false;var J=false;var K;var j;var G;var Z=k()[1];var $=k()[0];var Q=false;var ee;var ne=/INPUT|TEXTAREA|SELECT/;var ie=n.os.ios&&n.browser.name==="sf"&&(n.system.phone&&n.os.version>=7&&n.os.version<7.1||n.system.tablet&&n.os.version>=7);function te(e){if(n.support.touch&&n.support.orientation&&n.os.android){if(Q&&e){return!n.orientation.landscape}if(Q){return n.orientation.landscape}}else if(n.support.matchmedia&&n.support.orientation){return!!window.matchMedia("(orientation: landscape)").matches}var i=k();return i[0]>i[1]}function re(e){if(e.type=="resize"){if(ie&&ne.test(document.activeElement.tagName)&&!Y){return}var n=k()[1];var i=k()[0];var t=(new Date).getTime();if(n===Z&&i===$){return}J=true;if(Z!=n&&$==i){if(!ee||t-ee>300){Q=n<Z}V()}else{$=i}ee=t;Z=n;if(G){window.clearTimeout(G);G=null}G=window.setTimeout(ae,1200)}else if(e.type=="orientationchange"){Y=true}if(K){clearTimeout(K);K=null}K=window.setTimeout(oe,50)}function oe(){if(J&&(Y||n.system.tablet&&n.os.ios&&n.os.version>=9)){H();V();Y=false;J=false;if(G){window.clearTimeout(G);G=null}}K=null}function ae(){Y=false;J=false;G=null}n._update=function(e){S=navigator.userAgent;d.log(r,"Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");E();p();B(e)};W(n.resize);X(n.orientation);window.sap.ui.Device=n;if(n.support.touch&&n.support.orientation){window.addEventListener("resize",re,false);window.addEventListener("orientationchange",re,false)}else{window.addEventListener("resize",q,false)}n.media.initRangeSet();n.media.initRangeSet(A["SAP_STANDARD_EXTENDED"]);if(sap.ui.define){sap.ui.define("sap/ui/Device",[],function(){return n})}})();