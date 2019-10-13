/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./Popover","./SelectList","./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/Icon","sap/ui/core/IconPool","./Button","./Bar","./Title","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/library","sap/ui/core/Item","sap/ui/Device","sap/ui/core/InvisibleText","./SelectRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","./Text","sap/m/SimpleFixFlex"],function(e,t,i,s,o,r,n,a,l,p,u,c,h,g,d,f,y,S,m,I,v,b,C){"use strict";var _=s.SelectListKeyboardNavigationMode;var T=s.PlacementType;var A=d.ValueState;var V=d.TextDirection;var P=d.TextAlign;var x=s.SelectType;var k=r.extend("sap.m.Select",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent","sap.f.IShellBar"],library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:x.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:P.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:V.Inherit},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:A.None},valueStateText:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true},wrapItemsText:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable",forwarding:{getter:"getList",aggregation:"items"}},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"},_valueIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_pickerHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"},_pickerValueStateContent:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designtime:"sap/m/designtime/Select.designtime"}});l.insertFontFaceStyle();n.apply(k.prototype,[true]);g.call(k.prototype);function L(e){if(e){this.setSelection(e);this.setValue(e.getText());this.scrollToItem(e)}}k.prototype._handleFocusout=function(e){this._bFocusoutDueRendering=this.bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return}if(this._bProcessChange){if(!this.isOpen()||e.target===this.getAggregation("picker")){this._checkSelectionChange()}else{this._revertSelection()}this._bProcessChange=false}else{this._bProcessChange=true}};k.prototype._checkSelectionChange=function(){var e=this.getSelectedItem();if(this._oSelectionOnFocus!==e){this.fireChange({selectedItem:e})}};k.prototype._revertSelection=function(){var e=this.getSelectedItem();if(this._oSelectionOnFocus!==e){this.setSelection(this._oSelectionOnFocus);this.setValue(this._getSelectedItemText())}};k.prototype._getSelectedItemText=function(e){e=e||this.getSelectedItem();if(!e){e=this.getDefaultSelectedItem()}if(e){return e.getText()}return""};k.prototype.getOverflowToolbarConfig=function(){var e=["enabled","selectedKey"];if(!this.getAutoAdjustWidth()||this._bIsInOverflow){e.push("selectedItemId")}var t={canOverflow:true,autoCloseEvents:["change"],invalidationEvents:["_itemTextChange"],propsUnrelatedToSize:e};t.onBeforeEnterOverflow=function(e){var t=e.getParent();if(!t.isA("sap.m.OverflowToolbar")){return}e._prevSelectType=e.getType();e._bIsInOverflow=true;if(e.getType()!==x.Default){e.setProperty("type",x.Default,true)}};t.onAfterExitOverflow=function(e){var t=e.getParent();if(!t.isA("sap.m.OverflowToolbar")){return}e._bIsInOverflow=false;if(e.getType()!==e._prevSelectType){e.setProperty("type",e._prevSelectType,true)}};return t};k.prototype.getList=function(){if(this.bIsDestroyed){return null}return this._oList};k.prototype.findFirstEnabledItem=function(e){var t=this.getList();return t?t.findFirstEnabledItem(e):null};k.prototype.findLastEnabledItem=function(e){var t=this.getList();return t?t.findLastEnabledItem(e):null};k.prototype.setSelectedIndex=function(e,t){var i;t=t||this.getItems();e=e>t.length-1?t.length-1:Math.max(0,e);i=t[e];if(i){this.setSelection(i)}};k.prototype.scrollToItem=function(e){var t=this.getPicker().getDomRef(),i=e&&e.getDomRef();if(!t||!i){return}var s=t.querySelector(".sapUiSimpleFixFlexFlexContent"),o=t.querySelector(".sapMSltPickerValueState"),r=o?o.clientHeight:0,n=s.scrollTop,a=i.offsetTop-r,l=s.clientHeight,p=i.offsetHeight;if(n>a){s.scrollTop=a}else if(a+p>n+l){s.scrollTop=Math.ceil(a+p-l)}};k.prototype.setValue=function(e){var t=this.getDomRef(),i=t&&t.querySelector(".sapMSelectListItemText");if(i){i.textContent=e}this._getValueIcon()};k.prototype._getValueIcon=function(){if(this.bIsDestroyed){return null}var e=this.getAggregation("_valueIcon"),t=this.getSelectedItem(),i=!!(t&&t.getIcon&&t.getIcon()),s=i?t.getIcon():"sap-icon://pull-down";if(!e){e=new a(this.getId()+"-labelIcon",{src:s,visible:false});this.setAggregation("_valueIcon",e,true)}if(e.getVisible()!==i){e.setVisible(i);e.toggleStyleClass("sapMSelectListItemIcon",i)}if(i&&t.getIcon()!==e.getSrc()){e.setSrc(s)}return e};k.prototype._isShadowListRequired=function(){if(this.getAutoAdjustWidth()){return false}else if(this.getWidth()==="auto"){return true}return false};k.prototype._handleAriaActiveDescendant=function(e){var t=this.getDomRef(),i=e&&e.getDomRef(),s="aria-activedescendant";if(!t){return}if(i&&this.isOpen()){t.setAttribute(s,e.getId())}else{t.removeAttribute(s)}};k.prototype.updateItems=function(e){i.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem()};k.prototype.refreshItems=function(){i.prototype.refreshItems.apply(this,arguments)};k.prototype.onBeforeOpen=function(e){var t=this["_onBeforeOpen"+this.getPickerType()],i=this.getRenderer().CSS_CLASS;this.addStyleClass(i+"Pressed");this.addStyleClass(i+"Expanded");this.closeValueStateMessage();this.addContent();this.addContentToFlex();t&&t.call(this)};k.prototype.onAfterOpen=function(e){var t=this.getFocusDomRef(),i=null,s=this.$("label");if(!t){return}i=this.getSelectedItem();t.setAttribute("aria-expanded","true");s.attr("aria-live",null);t.setAttribute("aria-controls",this.getList().getId());if(i){t.setAttribute("aria-activedescendant",i.getId());this.scrollToItem(i)}};k.prototype.onBeforeClose=function(e){var t=this.getFocusDomRef(),i=this.getRenderer().CSS_CLASS;if(t){t.removeAttribute("aria-controls");t.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&document.activeElement===t){this.openValueStateMessage()}}this.removeStyleClass(i+"Expanded")};k.prototype.onAfterClose=function(e){var t=this.getFocusDomRef(),i=this.getRenderer().CSS_CLASS,s=i+"Pressed",o=this.$("label");if(t){t.setAttribute("aria-expanded","false");t.removeAttribute("aria-activedescendant");o.attr("aria-live","polite")}this.removeStyleClass(s)};k.prototype.getPicker=function(){if(this.bIsDestroyed){return null}return this.createPicker(this.getPickerType())};k.prototype.getSimpleFixFlex=function(){if(this.bIsDestroyed){return null}else if(this.oSimpleFixFlex){return this.oSimpleFixFlex}this.oSimpleFixFlex=new C({id:this.getPickerValueStateContentId(),fixContent:this._getPickerValueStateContent().addStyleClass(this.getRenderer().CSS_CLASS+"PickerValueState"),flexContent:this.createList()});return this.oSimpleFixFlex};k.prototype.setPickerType=function(e){this._sPickerType=e};k.prototype.getPickerType=function(){return this._sPickerType};k.prototype._getPickerValueStateContent=function(){if(!this.getAggregation("_pickerValueStateContent")){this.setAggregation("_pickerValueStateContent",new b({wrapping:true,text:this._getTextForPickerValueStateContent()}))}return this.getAggregation("_pickerValueStateContent")};k.prototype._updatePickerValueStateContentText=function(){var e=this.getPicker().getContent()[0].getFixContent(),t;if(e){t=this._getTextForPickerValueStateContent();e.setText(t)}};k.prototype._getTextForPickerValueStateContent=function(){var e=this.getValueStateText(),t;if(e){t=e}else{t=this._getDefaultTextForPickerValueStateContent()}return t};k.prototype._getDefaultTextForPickerValueStateContent=function(){var e=this.getValueState(),t,i;if(e===A.None){i=""}else{t=o.getLibraryResourceBundle("sap.ui.core");i=t.getText("VALUE_STATE_"+e.toUpperCase())}return i};k.prototype._updatePickerValueStateContentStyles=function(){var e=this.getValueState(),t=A,i=this.getRenderer().CSS_CLASS,s=i+"Picker",o=s+e+"State",r=s+"WithSubHeader",n=this.getPicker(),a=n.getContent()[0].getFixContent();if(a){this._removeValueStateClassesForPickerValueStateContent(n);a.addStyleClass(o);if(e!==t.None){n.addStyleClass(r)}else{n.removeStyleClass(r)}}};k.prototype._removeValueStateClassesForPickerValueStateContent=function(e){var t=A,i=this.getRenderer().CSS_CLASS,s=i+"Picker",o=e.getContent()[0].getFixContent();Object.keys(t).forEach(function(e){var t=s+e+"State";o.removeStyleClass(t)})};k.prototype._createPopover=function(){var e=this;var i=new t({showArrow:false,showHeader:false,placement:T.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,bounce:false,ariaLabelledBy:[this.getPickerValueStateContentId(),this._getPickerHiddenLabelId()]});i.addEventDelegate({ontouchstart:function(t){var i=this.getDomRef("cont");if(t.target===i||t.srcControl instanceof f){e._bProcessChange=false}}},i);this._decoratePopover(i);return i};k.prototype._decoratePopover=function(e){var t=this;e.open=function(){return this.openBy(t)}};k.prototype._onBeforeRenderingPopover=function(){var e=this.getPicker(),t=this.$().outerWidth()+"px";if(e){e.setContentMinWidth(t)}};k.prototype._createDialog=function(){var t=this;return new e({stretch:true,ariaLabelledBy:[this.getPickerValueStateContentId(),this._getPickerHiddenLabelId()],customHeader:this._getPickerHeader(),beforeOpen:function(){t.updatePickerHeaderTitle()}})};k.prototype._getPickerTitle=function(){var e=this.getPicker(),t=e&&e.getCustomHeader();if(t){return t.getContentMiddle()[0]}return null};k.prototype._getPickerHeader=function(){var e=l.getIconURI("decline"),t;if(!this.getAggregation("_pickerHeader")){t=o.getLibraryResourceBundle("sap.m");this.setAggregation("_pickerHeader",new u({contentMiddle:new c({text:t.getText("SELECT_PICKER_TITLE_TEXT")}),contentRight:new p({icon:e,press:this.close.bind(this)})}))}return this.getAggregation("_pickerHeader")};k.prototype._getPickerHiddenLabelId=function(){return S.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")};k.prototype.getPickerValueStateContentId=function(){return this.getId()+"-valueStateText"};k.prototype.updatePickerHeaderTitle=function(){var e=this.getPicker();if(!e){return}var t=this.getLabels();if(t.length){var i=t[0],s=this._getPickerTitle();if(i&&typeof i.getText==="function"){s&&s.setText(i.getText())}}};k.prototype._onBeforeOpenDialog=function(){};k.prototype.init=function(){this.setPickerType(y.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this.bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;this._oValueStateMessage=new h(this);this._bValueStateMessageOpened=false};k.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;this.synchronizeSelection({forceSelection:this.getForceSelection()});this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles()};k.prototype.onAfterRendering=function(){this.bRenderingPhase=false};k.prototype.exit=function(){var e=this.getValueStateMessage(),t=this._getValueIcon();this._oSelectionOnFocus=null;if(e){this.closeValueStateMessage();e.destroy()}if(t){t.destroy()}this._oValueStateMessage=null;this._bValueStateMessageOpened=false};k.prototype.ontouchstart=function(e){e.setMarked();if(this.getEnabled()&&this.getEditable()&&this.isOpenArea(e.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed")}};k.prototype.ontouchend=function(e){e.setMarked();if(this.getEnabled()&&this.getEditable()&&!this.isOpen()&&this.isOpenArea(e.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed")}};k.prototype.ontap=function(e){var t=this.getRenderer().CSS_CLASS;e.setMarked();if(!this.getEnabled()||!this.getEditable()){return}if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(t+"Pressed");return}if(y.system.phone){this.focus()}this.open()}if(this.isOpen()){this.addStyleClass(t+"Pressed")}};k.prototype.onSelectionChange=function(e){var t=e.getParameter("selectedItem");this.close();this.setSelection(t);this.fireChange({selectedItem:t});this.setValue(this._getSelectedItemText())};k.prototype.onkeypress=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();var t=String.fromCharCode(e.which),i;this.sTypedChars+=t;i=/^(.)\1+$/i.test(this.sTypedChars)?t:this.sTypedChars;clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1}.bind(this),1e3);L.call(this,this.searchNextItemByText(i))};k.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();if(e.which===v.F4){e.preventDefault()}this.toggleOpenState()};k.prototype.onsaphide=k.prototype.onsapshow;k.prototype.onsapescape=function(e){if(!this.getEnabled()||!this.getEditable()){return}if(this.isOpen()){e.setMarked();this.close();this._revertSelection()}};k.prototype.onsapenter=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();this.close();this._checkSelectionChange()};k.prototype.onsapspace=function(e){e.preventDefault()};k.prototype.onkeyup=function(e){if(!this.getEnabled()||!this.getEditable()){return}if(e.which===v.SPACE&&!e.shiftKey){e.setMarked();e.preventDefault();if(this.isOpen()){this._checkSelectionChange()}this.toggleOpenState()}};k.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t,i=this.getSelectableItems();t=i[i.indexOf(this.getSelectedItem())+1];L.call(this,t)};k.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t,i=this.getSelectableItems();t=i[i.indexOf(this.getSelectedItem())-1];L.call(this,t)};k.prototype.onsaphome=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems()[0];L.call(this,t)};k.prototype.onsapend=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.findLastEnabledItem(this.getSelectableItems());L.call(this,t)};k.prototype.onsappagedown=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(t.indexOf(i)+10,t);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(i)};k.prototype.onsappageup=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();e.preventDefault();var t=this.getSelectableItems(),i=this.getSelectedItem();this.setSelectedIndex(t.indexOf(i)-10,t);i=this.getSelectedItem();if(i){this.setValue(i.getText())}this.scrollToItem(i)};k.prototype.onsaptabnext=function(e){if(!this.getEnabled()){return}if(this.isOpen()){this.close();this._checkSelectionChange()}};k.prototype.onsaptabprevious=k.prototype.onsaptabnext;k.prototype.onfocusin=function(e){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem()}this._bProcessChange=true;setTimeout(function(){if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&document.activeElement===this.getFocusDomRef()){this.openValueStateMessage()}}.bind(this),100);if(e.target!==this.getFocusDomRef()){this.focus()}};k.prototype.onfocusout=function(e){this._handleFocusout(e);if(this.bRenderingPhase){return}this.closeValueStateMessage()};k.prototype.onsapfocusleave=function(e){var t=this.getAggregation("picker");if(!e.relatedControlId||!t){return}var i=o.byId(e.relatedControlId),s=i&&i.getFocusDomRef();if(y.system.desktop&&I(t.getFocusDomRef(),s)){this.focus()}};k.prototype.setSelection=function(e){var t=this.getList(),i;if(t){t.setSelection(e)}this.setAssociation("selectedItem",e,true);this.setProperty("selectedItemId",e instanceof f?e.getId():e,true);if(typeof e==="string"){e=o.byId(e)}i=e?e.getKey():"";this.setProperty("selectedKey",i,true);this._handleAriaActiveDescendant(e)};k.prototype.isSelectionSynchronized=function(){return i.prototype.isSelectionSynchronized.apply(this,arguments)};k.prototype.synchronizeSelection=function(){i.prototype.synchronizeSelection.apply(this,arguments)};k.prototype.addContent=function(e){};k.prototype.addContentToFlex=function(){};k.prototype.createPicker=function(e){var t=this.getAggregation("picker"),i=this.getRenderer().CSS_CLASS;if(t){return t}t=this["_create"+e]();this.setAggregation("picker",t,true);t.setHorizontalScrolling(false).addStyleClass(i+"Picker").addStyleClass(i+"Picker-CTX").addStyleClass("sapUiNoContentPadding").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getSimpleFixFlex());return t};k.prototype.searchNextItemByText=function(e){var t=this.getItems(),i=this.getSelectedIndex(),s=t.splice(i+1,t.length-i),o=t.splice(0,t.length-1);t=s.concat(o);for(var r=0,n;r<t.length;r++){n=t[r];var a=typeof e==="string"&&e!=="";if(n.getEnabled()&&!(n instanceof sap.ui.core.SeparatorItem)&&n.getText().toLowerCase().startsWith(e.toLowerCase())&&a){return n}}return null};k.prototype.createList=function(){var e=_,t=y.system.phone?e.Delimited:e.None;this._oList=new i({width:"100%",maxWidth:"600px",keyboardNavigationMode:t}).addStyleClass(this.getRenderer().CSS_CLASS+"List-CTX").addEventDelegate({ontap:function(e){this._checkSelectionChange();this.close()}},this).attachSelectionChange(this.onSelectionChange,this);this._oList.toggleStyleClass("sapMSelectListWrappedItems",this.getWrapItemsText());return this._oList};k.prototype.setWrapItemsText=function(e){if(this._oList){this._oList.toggleStyleClass("sapMSelectListWrappedItems",e)}return this.setProperty("wrapItemsText",e,true)};k.prototype.hasContent=function(){return this.getItems().length>0};k.prototype.onBeforeRenderingPicker=function(){var e=this["_onBeforeRendering"+this.getPickerType()];e&&e.call(this)};k.prototype.onAfterRenderingPicker=function(){var e=this["_onAfterRendering"+this.getPickerType()];e&&e.call(this)};k.prototype.open=function(){var e=this.getPicker();if(e){e.open()}return this};k.prototype.toggleOpenState=function(){if(this.isOpen()){this.close()}else{this.open()}return this};k.prototype.getVisibleItems=function(){var e=this.getList();return e?e.getVisibleItems():[]};k.prototype.isItemSelected=function(e){return e&&e.getId()===this.getAssociation("selectedItem")};k.prototype.getSelectedIndex=function(){var e=this.getSelectedItem();return e?this.indexOfItem(this.getSelectedItem()):-1};k.prototype.getDefaultSelectedItem=function(e){return this.getForceSelection()?this.findFirstEnabledItem():null};k.prototype.getSelectableItems=function(){var e=this.getList();return e?e.getSelectableItems():[]};k.prototype.getOpenArea=function(){return this.getDomRef()};k.prototype.isOpenArea=function(e){var t=this.getOpenArea();return t&&t.contains(e)};k.prototype.findItem=function(e,t){var i=this.getList();return i?i.findItem(e,t):null};k.prototype.clearSelection=function(){this.setSelection(null)};k.prototype.onItemChange=function(e){var t=this.getAssociation("selectedItem"),i=e.getParameter("id"),s=e.getParameter("name"),o=e.getParameter("newValue"),r,n,a,l;if(s==="key"&&!this.isBound("selectedKey")){n=this.getSelectedKey();a=this.getItemByKey(o);if(o===n&&t!==i&&a&&i===a.getId()){this.setSelection(a);return}r=e.getParameter("oldValue");if(t===i&&n===r&&!this.getItemByKey(r)){this.setSelectedKey(o);return}l=this.getItemByKey(n);if(t===i&&o!==n&&l){this.setSelection(l);return}}if(s==="text"&&t===i){this.fireEvent("_itemTextChange");this.setValue(o)}};k.prototype.fireChange=function(e){this._oSelectionOnFocus=e.selectedItem;return this.fireEvent("change",e)};k.prototype.addAggregation=function(e,t,i){if(e==="items"&&!i&&!this.isInvalidateSuppressed()){this.invalidate(t)}return r.prototype.addAggregation.apply(this,arguments)};k.prototype.destroyAggregation=function(e,t){if(e==="items"&&!t&&!this.isInvalidateSuppressed()){this.invalidate()}return r.prototype.destroyAggregation.apply(this,arguments)};k.prototype.setAssociation=function(e,t,s){var o=this.getList();if(o&&e==="selectedItem"){i.prototype.setAssociation.apply(o,arguments)}return r.prototype.setAssociation.apply(this,arguments)};k.prototype.setProperty=function(e,t,s){var o=this.getList();if(e==="selectedKey"||e==="selectedItemId"){o&&i.prototype.setProperty.apply(o,arguments)}return r.prototype.setProperty.apply(this,arguments)};k.prototype.removeAllAssociation=function(e,t){var s=this.getList();if(s&&e==="selectedItem"){i.prototype.removeAllAssociation.apply(s,arguments)}return r.prototype.removeAllAssociation.apply(this,arguments)};k.prototype.clone=function(){var e=r.prototype.clone.apply(this,arguments),t=this.getSelectedItem(),i=this.getSelectedKey();if(!this.isBound("selectedKey")&&!e.isSelectionSynchronized()){if(t&&i===""){e.setSelectedIndex(this.indexOfItem(t))}else{e.setSelectedKey(i)}}return e};k.prototype.updateValueStateClasses=function(e,t){var i=this.$(),s=this.$("label"),o=this.$("arrow"),r=A,n=this.getRenderer().CSS_CLASS;if(t!==r.None){i.removeClass(n+"State");i.removeClass(n+t);s.removeClass(n+"LabelState");s.removeClass(n+"Label"+t);o.removeClass(n+"ArrowState")}if(e!==r.None){i.addClass(n+"State");i.addClass(n+e);s.addClass(n+"LabelState");s.addClass(n+"Label"+e);o.addClass(n+"ArrowState")}};k.prototype.updateAriaLabelledBy=function(e,t){var i=this.$(),s=i.attr("aria-labelledby"),o=s?s.split(" "):[],r;if(t!==A.None&&t!==A.Error){o.pop()}if(e!==A.None&&e!==A.Error){o.push(S.getStaticId("sap.ui.core","VALUE_STATE_"+e.toUpperCase()))}r=o.join(" ");i.attr("aria-labelledby",r)};k.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return o.byId(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return o.byId(e)}))}return e};k.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef()};k.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};k.prototype.getValueStateMessage=function(){return this._oValueStateMessage};k.prototype.openValueStateMessage=function(){var e=this.getValueStateMessage();if(e&&!this._bValueStateMessageOpened){this._bValueStateMessageOpened=true;e.open()}};k.prototype.closeValueStateMessage=function(){var e=this.getValueStateMessage();if(e&&this._bValueStateMessageOpened){this._bValueStateMessageOpened=false;e.close()}};k.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==A.None&&this.getEnabled()&&this.getEditable()&&!this._bValueStateMessageOpened};k.prototype.setShowSecondaryValues=function(e){var t=!this._isShadowListRequired();this.setProperty("showSecondaryValues",e,t);var i=this.getList();if(i){i.setShowSecondaryValues(e)}return this};k.prototype.addItem=function(e){this.addAggregation("items",e);if(e){e.attachEvent("_change",this.onItemChange,this)}return this};k.prototype.insertItem=function(e,t){this.insertAggregation("items",e,t);if(e){e.attachEvent("_change",this.onItemChange,this)}return this};k.prototype.findAggregatedObjects=function(){var e=this.getList();if(e){return i.prototype.findAggregatedObjects.apply(e,arguments)}return[]};k.prototype.getItems=function(){var e=this.getList();return e?e.getItems():[]};k.prototype.setSelectedItem=function(e){if(typeof e==="string"){this.setAssociation("selectedItem",e,true);e=o.byId(e)}if(!(e instanceof f)&&e!==null){return this}if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText(e));this._oSelectionOnFocus=e;return this};k.prototype.setSelectedItemId=function(e){e=this.validateProperty("selectedItemId",e);if(!e){e=this.getDefaultSelectedItem()}this.setSelection(e);this.setValue(this._getSelectedItemText());this._oSelectionOnFocus=this.getSelectedItem();return this};k.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var t=e==="";if(!this.getForceSelection()&&t){this.setSelection(null);this.setValue("");return this}var i=this.getItemByKey(e);if(i||t){if(!i&&t){i=this.getDefaultSelectedItem()}this.setSelection(i);this.setValue(this._getSelectedItemText(i));this._oSelectionOnFocus=i;return this}return this.setProperty("selectedKey",e)};k.prototype.setValueState=function(e){var t=this.getValueState();this.setProperty("valueState",e,true);e=this.getValueState();if(e===t){return this}var i=this.getDomRefForValueState();if(!i){return this}var s=A;if(e===s.Error){i.setAttribute("aria-invalid",true)}else{i.removeAttribute("aria-invalid")}if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&document.activeElement===i){this.openValueStateMessage()}else{this.closeValueStateMessage()}this.updateValueStateClasses(e,t);this.updateAriaLabelledBy(e,t);this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles();return this};k.prototype.setValueStateText=function(e){this.setProperty("valueStateText",e,true);if(this.getDomRefForValueState()){this._updatePickerValueStateContentText();this._updatePickerValueStateContentStyles()}return this};k.prototype.getItemAt=function(e){return this.getItems()[+e]||null};k.prototype.getSelectedItem=function(){var e=this.getAssociation("selectedItem");return e===null?null:o.byId(e)||null};k.prototype.getFirstItem=function(){return this.getItems()[0]||null};k.prototype.getLastItem=function(){var e=this.getItems();return e[e.length-1]||null};k.prototype.getEnabledItems=function(e){var t=this.getList();return t?t.getEnabledItems(e):[]};k.prototype.getItemByKey=function(e){var t=this.getList();return t?t.getItemByKey(e):null};k.prototype.removeItem=function(e){var t;e=this.removeAggregation("items",e);if(this.getItems().length===0){this.clearSelection()}else if(this.isItemSelected(e)){t=this.findFirstEnabledItem();if(t){this.setSelection(t)}}this.setValue(this._getSelectedItemText());if(e){e.detachEvent("_change",this.onItemChange,this)}return e};k.prototype.removeAllItems=function(){var e=this.removeAllAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove()}for(var t=0;t<e.length;t++){e[t].detachEvent("_change",this.onItemChange,this)}return e};k.prototype.destroyItems=function(){this.destroyAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove()}return this};k.prototype.isOpen=function(){var e=this.getAggregation("picker");return!!(e&&e.isOpen())};k.prototype.close=function(){var e=this.getAggregation("picker");if(e){e.close()}return this};k.prototype.getDomRefForValueState=function(){return this.getDomRef()};k.prototype.getAccessibilityInfo=function(){var e=this.getType()==="IconOnly",t={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled(),readonly:e?undefined:this.getEnabled()&&!this.getEditable()};if(e){var i=this.getTooltip_AsString();if(!i){var s=l.getIconInfo(this.getIcon());i=s&&s.text?s.text:""}t.type=o.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON");t.description=i}else if(this.getType()==="Default"){t.type=o.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");t.description=this._getSelectedItemText()}return t};k.prototype.getIdForLabel=function(){return this.getId()+"-hiddenInput"};return k});