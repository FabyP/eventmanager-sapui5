/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/library","sap/m/Image","sap/m/Label","./BusyIndicatorRenderer"],function(t,e,i,o,s,n){"use strict";var r=i.TextDirection;var a=e.extend("sap.m.BusyIndicator",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Data",defaultValue:""},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:r.Inherit},customIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},customIconRotationSpeed:{type:"int",group:"Appearance",defaultValue:1e3},customIconDensityAware:{type:"boolean",defaultValue:true},customIconWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},customIconHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"44px"},size:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"1rem"},design:{type:"string",group:"Appearance",defaultValue:"auto"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});a.prototype.init=function(){this.setBusyIndicatorDelay(0)};a.prototype.setText=function(t){this.setProperty("text",t,true);this._createLabel("setText",t);return this};a.prototype.setTextDirection=function(t){this.setProperty("textDirection",t,true);this._createLabel("setTextDirection",t);return this};a.prototype.setCustomIcon=function(t){this.setProperty("customIcon",t,false);this._createCustomIcon("setSrc",t);return this};a.prototype.setCustomIconRotationSpeed=function(t){if(isNaN(t)||t<0){t=0}if(t!==this.getCustomIconRotationSpeed()){this.setProperty("customIconRotationSpeed",t,true);this._setRotationSpeed()}return this};a.prototype.setCustomIconDensityAware=function(t){this.setProperty("customIconDensityAware",t,true);this._createCustomIcon("setDensityAware",t);return this};a.prototype.setCustomIconWidth=function(t){this.setProperty("customIconWidth",t,true);this._createCustomIcon("setWidth",t);return this};a.prototype.setCustomIconHeight=function(t){this.setProperty("customIconHeight",t,true);this._createCustomIcon("setHeight",t);return this};a.prototype.setSize=function(t){this.setProperty("size",t,true);var e=this.getDomRef();if(e){e.style.fontSize=t}return this};a.prototype.onBeforeRendering=function(){if(this.getCustomIcon()){this.setBusy(false)}else{this.setBusy(true,"busy-area")}};a.prototype.exit=function(){if(this._iconImage){this._iconImage.destroy();this._iconImage=null}if(this._busyLabel){this._busyLabel.destroy();this._busyLabel=null}};a.prototype._createCustomIcon=function(t,e){if(!this._iconImage){this._iconImage=new o(this.getId()+"-icon",{width:"44px",height:"44px"}).addStyleClass("sapMBsyIndIcon");this._iconImage.addEventDelegate({onAfterRendering:function(){this._setRotationSpeed()}},this)}this._iconImage[t](e);this._setRotationSpeed()};a.prototype._createLabel=function(t,e){if(!this._busyLabel){this._busyLabel=new s(this.getId()+"-label",{labelFor:this.getId(),textAlign:"Center"})}this._busyLabel[t](e)};a.prototype._setRotationSpeed=function(){if(!this._iconImage){return}var t=this._iconImage.$();var e=this.getCustomIconRotationSpeed()+"ms";t.css("-webkit-animation-duration",e).css("animation-duration",e);t.css("display","none");setTimeout(function(){t.css("display","inline")},0)};return a});