/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(t){"use strict";var i,e;var r=document.currentScript||document.querySelector("script[src*='/sap-ui-integration.js']");function n(){if(t.sap&&t.sap.ui&&t.sap.ui.getCore){i=t.sap.ui.getCore();return a()}t.sap.ui.require(["sap/ui/core/Core","sap/ui/integration/util/CustomElements"],function(t,r){e=r;t.boot();i=t;t.attachInit(function(){a()});e.coreInstance=i})}function u(n){var u=i.getLoadedLibraries()[n];var a=r.getAttribute("prefix")||u.defaultTagPrefix,o=Object.keys(u.customTags),s=r.getAttribute("tags");if(s){o=s.split(",")}t.sap.ui.require(o.map(function(t,i){return u.customTags[o[i]]}),function(){var t=arguments;o.forEach(function(i,r){e.registerTag(o[r],a,t[r])})})}function a(){i.loadLibraries(["sap/ui/integration"],{async:true}).then(function(){u("sap.ui.integration")})}n()})(window);