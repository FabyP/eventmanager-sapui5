/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e._mInstanceStyles={};e.setItemHeight=function(e,t){var n="#"+e+".sapUiLayoutCSSGridBoxLayoutFlattenHeight ul .sapMLIB:not(.sapMGHLI) { height: "+t+"px; }";if(this._mInstanceStyles[e]!==n){this._mInstanceStyles[e]=n;this._reapplyStyles()}};e._getStyleHelper=function(){var e=document.getElementById("sapUiLayoutCSSGridGridBoxLayoutStyleHelper");if(!e){e=document.createElement("style");e.id="sapUiLayoutCSSGridGridBoxLayoutStyleHelper";e.type="text/css";document.getElementsByTagName("head")[0].appendChild(e)}return e};e._reapplyStyles=function(){var e="",t=this._getStyleHelper();for(var n in this._mInstanceStyles){e+=this._mInstanceStyles[n]+"\n"}t.innerHTML=e};return e});