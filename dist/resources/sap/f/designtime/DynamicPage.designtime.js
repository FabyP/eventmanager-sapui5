/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{aggregations:{title:{domRef:":sap-domref .sapFDynamicPageTitle"},header:{domRef:":sap-domref .sapFDynamicPageHeader"},content:{domRef:":sap-domref .sapFDynamicPageContent"},footer:{domRef:":sap-domref .sapFDynamicPageActualFooterControl"},landmarkInfo:{ignore:true}},scrollContainers:[{domRef:"> .sapFDynamicPageContentWrapper",aggregations:function(e){if(e._bPinned||e.getPreserveHeaderStateOnScroll()){return["content"]}else{return["header","content"]}}},{domRef:function(e){return e.$("vertSB-sb").get(0)}}],templates:{create:"sap/f/designtime/DynamicPage.create.fragment.xml"}}},false);