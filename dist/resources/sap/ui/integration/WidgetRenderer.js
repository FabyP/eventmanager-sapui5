/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={},t=sap.ui.getCore().getLibraryResourceBundle("sap.f");e.render=function(e,r){var i=r.getAggregation("_content");e.write("<div");e.writeElementData(r);e.writeClasses();e.writeAccessibilityState(r,{role:"region",roledescription:{value:t.getText("ARIA_ROLEDESCRIPTION_CARD"),append:true}});e.write(">");if(i){e.renderControl(i)}e.write("</div>")};return e});