/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ValueStateSupport","sap/ui/core/IndicationColorSupport","sap/ui/core/library","sap/ui/base/DataType","./ObjectStatusRenderer"],function(t,e,i,o,r,a,s){"use strict";var n=t.ImageHelper;var p=r.TextDirection;var u=r.ValueState;var l=e.extend("sap.m.ObjectStatus",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/ObjectStatus.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},text:{type:"string",group:"Misc",defaultValue:null},active:{type:"boolean",group:"Misc",defaultValue:false},state:{type:"string",group:"Misc",defaultValue:u.None},inverted:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:p.Inherit}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}},dnd:{draggable:true,droppable:false}}});l.prototype.exit=function(){if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null}};l.prototype._getImageControl=function(){var t=this.getId()+"-icon";var e={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};this._oImageControl=n.getImageControl(t,this._oImageControl,this,e);return this._oImageControl};l.prototype.setState=function(t){if(t==null){t=u.None}else if(!a.getType("sap.ui.core.ValueState").isValid(t)&&!a.getType("sap.ui.core.IndicationColor").isValid(t)){throw new Error('"'+t+'" is not a value of the enums sap.ui.core.ValueState or sap.ui.core.IndicationColor for property "state" of '+this)}return this.setProperty("state",t)};l.prototype.ontap=function(t){if(this._isClickable(t)){this.firePress()}};l.prototype.onsapenter=function(t){if(this._isActive()){this.firePress();t.setMarked()}};l.prototype.onsapspace=function(t){this.onsapenter(t)};l.prototype._isActive=function(){return this.getActive()&&(this.getText().trim()||this.getIcon().trim())};l.prototype._isEmpty=function(){return!(this.getText().trim()||this.getIcon().trim()||this.getTitle().trim())};l.prototype.ontouchstart=function(t){if(this._isClickable(t)){t.setMarked()}};l.prototype.getAccessibilityInfo=function(){var t=i.getAdditionalText(this.getState());if(this.getState()!=u.None){t=t!==null?t:o.getAdditionalText(this.getState())}return{description:((this.getTitle()||"")+" "+(this.getText()||"")+" "+(t!==null?t:"")+" "+(this.getTooltip()||"")).trim()}};l.prototype._isClickable=function(t){var e=t.target.id;return this._isActive()&&(e===this.getId()+"-link"||e===this.getId()+"-text"||e===this.getId()+"-statusIcon"||e===this.getId()+"-icon")};return l});