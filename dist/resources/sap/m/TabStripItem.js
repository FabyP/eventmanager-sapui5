/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Item","sap/ui/base/ManagedObject","sap/ui/core/IconPool","./AccButton"],function(t,e,i,a,r){"use strict";var o=t.ButtonType;var p=t.ImageHelper;var s=e.extend("sap.m.TabStripItem",{metadata:{library:"sap.m",properties:{additionalText:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconTooltip:{type:"string",group:"Accessibility",defaultValue:null},modified:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{_closeButton:{type:"sap.m.Button",multiple:false},_image:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{itemClosePressed:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabStripItem"}}},itemPropertyChanged:{parameters:{itemChanged:{type:"sap.m.TabStripItem"},propertyKey:{type:"string"},propertyValue:{type:"any"}}}}}});s.DISPLAY_TEXT_MAX_LENGTH=25;s.CSS_CLASS="sapMTabStripItem";s.CSS_CLASS_LABEL="sapMTabStripItemLabel";s.CSS_CLASS_MODIFIED_SYMBOL="sapMTabStripItemModifiedSymbol";s.CSS_CLASS_TEXT="sapMTabStripItemAddText";s.CSS_CLASS_BUTTON="sapMTabStripItemButton";s.CSS_CLASS_MODIFIED="sapMTabStripItemModified";s.CSS_CLASS_SELECTED="sapMTabStripItemSelected";s.CSS_CLASS_STATE="sapMTabStripSelectListItemModified";s.CSS_CLASS_STATE_INVISIBLE="sapMTabStripSelectListItemModifiedInvisible";s.CSS_CLASS_CLOSE_BUTTON="sapMTabStripSelectListItemCloseBtn";s.CSS_CLASS_CLOSE_BUTTON_INVISIBLE="sapMTabStripSelectListItemCloseBtnInvisible";s.prototype.init=function(){var t=new r({type:o.Transparent,icon:a.getIconURI("decline"),tabIndex:"-1",ariaHidden:"true"}).addStyleClass(s.CSS_CLASS_CLOSE_BUTTON);this.setAggregation("_closeButton",t)};s.prototype.setProperty=function(t,e,a){if(t==="modified"){a=true}i.prototype.setProperty.call(this,t,e,a);if(this.getParent()&&this.getParent().changeItemState){this.getParent().changeItemState(this.getId(),e)}this.fireItemPropertyChanged({itemChanged:this,propertyKey:t,propertyValue:e});return this};s.prototype.setIcon=function(t){return this._setIcon(t)};s.prototype._setIcon=function(t,e){var i,a=["sapMTabContIcon"],r=this.getAggregation("_image"),o=this.getId()+"-img";if(!t){this.setProperty("icon",t,e);if(r){this.destroyAggregation("_image")}return this}if(this.getIcon()!==t){this.setProperty("icon",t,e);i={src:t,id:o,tooltip:this.getIconTooltip()};r=p.getImageControl(o,r,undefined,i,a);this.setAggregation("_image",r,e)}return this};s.prototype._getImage=function(){return this.getAggregation("_image")};return s});