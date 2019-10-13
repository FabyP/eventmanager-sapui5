/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/library","sap/ui/Device","./InputBaseRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(e,t,n,a,s,i,o,r,u,p,l,h){"use strict";var g=o.TextDirection;var c=o.TextAlign;var d=o.ValueState;var f=t.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:d.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:c.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:g.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"}});n.call(f.prototype);a.insertFontFaceStyle();i.call(f.prototype);f.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";f.ICON_CSS_CLASS="sapMInputBaseIcon";f.prototype.bShowLabelAsPlaceholder=!r.support.input.placeholder;f.prototype.handleInput=function(e){if(this._bIgnoreNextInput||this._bIgnoreNextInputNonASCII){this._bIgnoreNextInput=false;this._bIgnoreNextInputNonASCII=false;e.setMarked("invalid");return}this._bIgnoreNextInput=false;this._bIgnoreNextInputNonASCII=false;if(!this.getEditable()){e.setMarked("invalid");return}if(document.activeElement!==e.target&&r.browser.msie&&this.getValue()===this._lastValue){e.setMarked("invalid");return}this._bCheckDomValue=true};f.prototype._getPlaceholder=function(){return this.getPlaceholder()||""};f.prototype._getInputValue=function(e){e=e===undefined?this.$("inner").val()||"":e.toString();if(this.getMaxLength&&this.getMaxLength()>0){e=e.substring(0,this.getMaxLength())}return e};f.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName}return this._sInputTagElementName};f.prototype.init=function(){this._lastValue="";this.bRenderingPhase=false;this.bFocusoutDueRendering=false;this._oValueStateMessage=new s(this)};f.prototype.onBeforeRendering=function(){if(r.browser.msie&&r.browser.version>9&&!/^[\x00-\x7F]*$/.test(this.getValue())){this._bIgnoreNextInputNonASCII=true;this._oDomRefBeforeRendering=this.getDomRef()}if(this._bCheckDomValue&&!this.bRenderingPhase){this._sDomValue=this._getInputValue()}this.bRenderingPhase=true};f.prototype.onAfterRendering=function(){if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue)}this._bIgnoreNextInputNonASCII=this._bIgnoreNextInputNonASCII&&this._oDomRefBeforeRendering!==this.getDomRef();this._bCheckDomValue=false;this.bRenderingPhase=false};f.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy()}this._oValueStateMessage=null;this._oDomRefBeforeRendering=null};f.prototype.ontouchstart=function(e){e.setMarked()};f.prototype.onfocusin=function(e){this._bIgnoreNextInput=!this.bShowLabelAsPlaceholder&&r.browser.msie&&r.browser.version>9&&!!this.getPlaceholder()&&!this._getInputValue()&&this._getInputElementTagName()==="INPUT";this.addStyleClass("sapMFocus");this.openValueStateMessage()};f.prototype.onfocusout=function(e){this.bFocusoutDueRendering=this.bRenderingPhase;this.removeStyleClass("sapMFocus");if(this.bRenderingPhase){return}this.closeValueStateMessage()};f.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e)}};f.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering};f.prototype.getChangeEventParams=function(){return{}};f.prototype.ontap=function(e){return};f.prototype.onChange=function(e,t,n){t=t||this.getChangeEventParams();if(!this.getEditable()||!this.getEnabled()){return}var a=this._getInputValue(n);if(a!==this._lastValue){this.setValue(a);a=this.getValue();this._lastValue=a;this.fireChangeEvent(a,t);return true}else{this._bCheckDomValue=false}};f.prototype.fireChangeEvent=function(e,t){var n=h.extend({value:e,newValue:e},t);this.fireChange(n)};f.prototype.onValueRevertedByEscape=function(e,t){this.fireEvent("liveChange",{value:e,escPressed:true,previousValue:t,newValue:e})};f.prototype.onsapenter=function(e){this.onChange(e)};f.prototype.onsapescape=function(e){var t=this._getInputValue();if(t!==this._lastValue){e.setMarked();e.preventDefault();this.updateDomValue(this._lastValue);this.onValueRevertedByEscape(this._lastValue,t)}};f.prototype.oninput=function(e){this.handleInput(e)};f.prototype.onkeydown=function(e){if(this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==l.BACKSPACE){e.preventDefault()}};f.prototype.oncut=function(e){};f.prototype.selectText=function(e,t){this.$("inner").selectText(e,t);return this};f.prototype.getSelectedText=function(){return this.$("inner").getSelectedText()};f.prototype.setProperty=function(e,n,a){if(e=="value"){this._bCheckDomValue=false}return t.prototype.setProperty.apply(this,arguments)};f.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),n=this.getFocusDomRef();h.extend(e,{cursorPos:0,selectionStart:0,selectionEnd:0});if(n){e.cursorPos=h(n).cursorPos();try{e.selectionStart=n.selectionStart;e.selectionEnd=n.selectionEnd}catch(e){}}return e};f.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);this.$("inner").cursorPos(e.cursorPos);this.selectText(e.selectionStart,e.selectionEnd);return this};f.prototype.bindToInputEvent=function(e){if(this._oInputEventDelegate){this.removeEventDelegate(this._oInputEventDelegate)}this._oInputEventDelegate={oninput:e};return this.addEventDelegate(this._oInputEventDelegate)};f.prototype.updateDomValue=function(e){if(!this.isActive()){return this}e=this._getInputValue(e);if(this._getInputValue()!==e){this.$("inner").val(e);this._bCheckDomValue=true}return this};f.prototype.closeValueStateMessage=function(){if(this._oValueStateMessage){this._oValueStateMessage.close()}};f.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content")};f.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};f.prototype.iOpenMessagePopupDuration=0;f.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};f.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return sap.ui.getCore().byId(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return sap.ui.getCore().byId(e)}))}return e};f.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){if(r.browser.msie){setTimeout(function(){this._oValueStateMessage.open()}.bind(this),0)}else{this._oValueStateMessage.open()}}};f.prototype.updateValueStateClasses=function(e,t){var n=this.$(),a=this.$("content"),s=d;if(t!==s.None){n.removeClass("sapMInputBaseState");a.removeClass("sapMInputBaseContentWrapperState sapMInputBaseContentWrapper"+t)}if(e!==s.None){n.addClass("sapMInputBaseState");a.addClass("sapMInputBaseContentWrapperState sapMInputBaseContentWrapper"+e)}};f.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==d.None&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage()};f.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],t=this.getAggregation("_beginIcon")||[],n=e.concat(t),a;return n.reduce(function(e,t){a=t&&t.getDomRef()?t.getDomRef().offsetWidth:0;return e+a},0)};f.prototype.setValueState=function(e){var t=this.getValueState();this.setProperty("valueState",e,true);e=this.getValueState();if(e===t){return this}var n=this.getDomRef();if(!n){return this}var a=this.$("inner"),s=d;if(e===s.Error){a.attr("aria-invalid","true")}else{a.removeAttr("aria-invalid")}this.updateValueStateClasses(e,t);if(a[0]===document.activeElement){if(e===s.None){this.closeValueStateMessage()}else{this.openValueStateMessage()}}return this};f.prototype.setValueStateText=function(e){this.setProperty("valueStateText",e,true);this.$("message").text(this.getValueStateText());return this};f.prototype.setValue=function(e){e=this.validateProperty("value",e);e=this._getInputValue(e);this.updateDomValue(e);if(e!==this.getProperty("value")){this._lastValue=e}this.setProperty("value",e,true);return this};f.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};f.prototype.getIdForLabel=function(){return this.getId()+"-inner"};f.prototype.getAccessibilityInfo=function(){var e=this.getRequired()?"Required":"",t=this.getRenderer();return{role:t.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_INPUT"),description:[this.getValue()||"",t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this),e].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};f.prototype._addIcon=function(e,t){if(["begin","end"].indexOf(e)===-1){p.error('icon position is not "begin", neither "end", please check again the passed setting');return null}var n=a.createControlByURI(t).addStyleClass(f.ICON_CSS_CLASS);this.addAggregation("_"+e+"Icon",n);return n};f.prototype.addBeginIcon=function(e){return this._addIcon("begin",e)};f.prototype.addEndIcon=function(e){return this._addIcon("end",e)};Object.defineProperty(f.prototype,"_$input",{get:function(){return this.$("inner")}});return f});