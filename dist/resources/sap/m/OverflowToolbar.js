/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/m/ToggleButton","sap/ui/core/InvisibleText","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/OverflowToolbarLayoutData","sap/m/OverflowToolbarAssociativePopover","sap/m/OverflowToolbarAssociativePopoverControls","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","sap/ui/Device","./OverflowToolbarRenderer","sap/base/Log","sap/ui/dom/jquery/Focusable"],function(t,o,e,i,n,r,s,a,l,h,f,p,u,d,_){"use strict";var v=t.PlacementType;var C=t.ButtonType;var c=t.OverflowToolbarPriority;var g=i.extend("sap.m.OverflowToolbar",{metadata:{properties:{asyncMode:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_overflowButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"},_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/OverflowToolbar.designtime"}});g.prototype._callToolbarMethod=function(t,o){return i.prototype[t].apply(this,o)};g.prototype.init=function(){this._callToolbarMethod("init",arguments);this._iPreviousToolbarWidth=null;this._bOverflowButtonNeeded=false;this._bNestedInAPopover=null;this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._bControlsInfoCached=false;this._bSkipOptimization=false;this._bHasFlexibleContent=false;this._aControlSizes={};this._iFrameRequest=null;this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls]};g.prototype.exit=function(){var t=this.getAggregation("_popover");if(t){t.destroy()}if(this._iFrameRequest){window.cancelAnimationFrame(this._iFrameRequest);this._iFrameRequest=null}};g.prototype.setAsyncMode=function(t){return this.setProperty("asyncMode",t,true)};g.prototype.onAfterRendering=function(){this._getOverflowButton().$().attr("aria-haspopup","true");if(this._bContentVisibilityChanged){this._bControlsInfoCached=false;this._bContentVisibilityChanged=false}if(this.getAsyncMode()){this._doLayoutAsync().then(this._applyFocus.bind(this))}else{this._doLayout();this._applyFocus()}};g.prototype.onsapfocusleave=function(){this._resetChildControlFocusInfo()};g.prototype._doLayout=function(){var t=sap.ui.getCore(),o;if(!t.isThemeApplied()){_.debug("OverflowToolbar: theme not applied yet, skipping calculations",this);return}o=this.$().width();this._bListenForControlPropertyChanges=false;this._bListenForInvalidationEvents=false;this._deregisterToolbarResize();if(o>0){if(!this._isControlsInfoCached()){this._cacheControlsInfo()}if(this._iPreviousToolbarWidth!==o){this._iPreviousToolbarWidth=o;this._setControlsOverflowAndShrinking(o);this.fireEvent("_controlWidthChanged")}}this._registerToolbarResize();this._bListenForControlPropertyChanges=true;this._bListenForInvalidationEvents=true};g.prototype._doLayoutAsync=function(){return new Promise(function(t,o){this._iFrameRequest=window.requestAnimationFrame(function(){this._doLayout();t()}.bind(this))}.bind(this))};g.prototype._applyFocus=function(){var t,o,e=this.$().lastFocusableDomRef();if(this.sFocusedChildControlId){t=sap.ui.getCore().byId(this.sFocusedChildControlId);o=t&&t.$()}if(o&&o.length){o.focus()}else if(this._bControlWasFocused){this._getOverflowButton().focus();this._bControlWasFocused=false;this._bOverflowButtonWasFocused=true}else if(this._bOverflowButtonWasFocused&&!this._getOverflowButtonNeeded()){e&&e.focus();this._bOverflowButtonWasFocused=false}};g.prototype._preserveChildControlFocusInfo=function(){var t=sap.ui.getCore().getCurrentFocusedControlId();if(this._getControlsIds().indexOf(t)!==-1){this._bControlWasFocused=true;this.sFocusedChildControlId=t}else if(t===this._getOverflowButton().getId()){this._bOverflowButtonWasFocused=true;this.sFocusedChildControlId=""}};g.prototype._resetChildControlFocusInfo=function(){this._bControlWasFocused=false;this._bOverflowButtonWasFocused=false;this.sFocusedChildControlId=""};g.prototype._registerToolbarResize=function(){if(i.isRelativeWidth(this.getWidth())){var t=this._handleResize.bind(this);this._sResizeListenerId=l.register(this,t)}};g.prototype._deregisterToolbarResize=function(){if(this._sResizeListenerId){l.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};g.prototype._handleResize=function(){if(this.getAsyncMode()){this._doLayoutAsync()}else{this._doLayout()}};g.prototype._cacheControlsInfo=function(){var t,o;this._iOldContentSize=this._iContentSize;this._iContentSize=0;this._bHasFlexibleContent=false;this.getContent().forEach(this._updateControlsCachedSizes,this);if(u.system.phone){this._iContentSize-=1}if(this._aPopoverOnlyControls.length){t=this._aPopoverOnlyControls.filter(function(t){return t.getVisible()});o=t.length>0;if(o){this._iContentSize+=this._getOverflowButtonSize()}}this._bControlsInfoCached=true;if(this._iOldContentSize!==this._iContentSize){this.fireEvent("_contentSizeChange",{contentSize:this._iContentSize,invalidate:this._bHasFlexibleContent})}};g.prototype._updateControlsCachedSizes=function(t){var o,e;o=g._getControlPriority(t);e=this._calculateControlSize(t);this._aControlSizes[t.getId()]=e;if(o!==c.AlwaysOverflow){this._iContentSize+=e}this._bHasFlexibleContent=this._bHasFlexibleContent||t.isA("sap.m.IOverflowToolbarFlexibleContent")};g.prototype._calculateControlSize=function(t){return this._getOptimalControlWidth(t,this._aControlSizes[t.getId()])};g.prototype._isControlsInfoCached=function(){return this._bControlsInfoCached};g.prototype._flushButtonsToPopover=function(){this._aButtonsToMoveToPopover.forEach(this._moveButtonToPopover,this)};g.prototype._invalidateIfHashChanged=function(t){if(typeof t==="undefined"||this._getPopover()._getContentIdsHash()!==t){this._preserveChildControlFocusInfo();this.invalidate()}};g.prototype._addOverflowButton=function(){if(!this._getOverflowButtonNeeded()){this._iCurrentContentSize+=this._getOverflowButtonSize();this._setOverflowButtonNeeded(true)}};g.prototype._aggregateMovableControls=function(){var t={},o=[],e,i,n,r,s;this._aMovableControls.forEach(function(a){e=g._getControlGroup(a);i=g._oPriorityOrder;if(e){n=g._getControlPriority(a);r=this._getControlIndex(a);t[e]=t[e]||[];s=t[e];s.unshift(a);if(!s._priority||i[s._priority]<i[n]){s._priority=n}if(!s._index||s._index<r){s._index=r}}else{o.push(a)}},this);Object.keys(t).forEach(function(e){o.push(t[e])});return o};g.prototype._extractControlsToMoveToOverflow=function(t,o){var e,i;for(e=0;e<t.length;e++){i=t[e];if(i.length){i.forEach(this._addToPopoverArrAndUpdateContentSize,this)}else{this._addToPopoverArrAndUpdateContentSize(i)}if(this._iCurrentContentSize<=o){break}}};g.prototype._addToPopoverArrAndUpdateContentSize=function(t){this._aButtonsToMoveToPopover.unshift(t);this._iCurrentContentSize-=this._aControlSizes[t.getId()]};g.prototype._sortByPriorityAndIndex=function(t,o){var e=g._oPriorityOrder,i=g._getControlPriority(t),n=g._getControlPriority(o),r=e[i]-e[n];if(r!==0){return r}else{return this._getControlIndex(o)-this._getControlIndex(t)}};g.prototype._setControlsOverflowAndShrinking=function(t){var o;this._iCurrentContentSize=this._iContentSize;this._aButtonsToMoveToPopover=[];if(this._bSkipOptimization){this._bSkipOptimization=false}else{o=this._getPopover()._getContentIdsHash()}this._resetToolbar();this._collectPopoverOnlyControls();this._markControlsWithShrinkableLayoutData();if(this._iCurrentContentSize<=t){this._flushButtonsToPopover();this._invalidateIfHashChanged(o);return}this._moveControlsToPopover(t);this._flushButtonsToPopover();if(this._iCurrentContentSize>t){this._checkContents()}this._invalidateIfHashChanged(o)};g.prototype._markControlsWithShrinkableLayoutData=function(){this.getContent().forEach(this._markControlWithShrinkableLayoutData,this)};g.prototype._collectPopoverOnlyControls=function(){var t=this._aPopoverOnlyControls.length,o,e;if(t){for(o=t-1;o>=0;o--){e=this._aPopoverOnlyControls[o];if(e.getVisible()){this._aButtonsToMoveToPopover.unshift(e)}}if(this._aButtonsToMoveToPopover.length>0){this._setOverflowButtonNeeded(true)}}};g.prototype._moveControlsToPopover=function(t){var o=[];if(this._aMovableControls.length){this._addOverflowButton();o=this._aggregateMovableControls();o.sort(this._sortByPriorityAndIndex.bind(this));this._extractControlsToMoveToOverflow(o,t)}};g.prototype._markControlWithShrinkableLayoutData=function(t){var o,e;t.removeStyleClass(i.shrinkClass);o=i.getOrigWidth(t.getId());if(!i.isRelativeWidth(o)){return}e=t.getLayoutData();if(e&&e.isA("sap.m.ToolbarLayoutData")&&e.getShrinkable()){t.addStyleClass(i.shrinkClass)}};g.prototype._resetToolbar=function(){this._getPopover().close();this._getPopover()._getAllContent().forEach(this._restoreButtonInToolbar,this);this._setOverflowButtonNeeded(false);this.getContent().forEach(this._removeShrinkingClass)};g.prototype._removeShrinkingClass=function(t){t.removeStyleClass(i.shrinkClass)};g.prototype._moveButtonToPopover=function(t){this._getPopover().addAssociatedContent(t)};g.prototype._restoreButtonInToolbar=function(t){if(typeof t==="object"){t=t.getId()}this._getPopover().removeAssociatedContent(t)};g.prototype._resetAndInvalidateToolbar=function(t){if(this._bIsBeingDestroyed){return}this._resetToolbar();this._bControlsInfoCached=false;this._bNestedInAPopover=null;this._iPreviousToolbarWidth=null;if(t){this._bSkipOptimization=true}if(this.$().length){this._preserveChildControlFocusInfo();this.invalidate()}};g.prototype._getVisibleContent=function(){var t=this.getContent(),o=this._getPopover()._getAllContent();return t.filter(function(t){return o.indexOf(t)===-1})};g.prototype._getVisibleAndNonOverflowContent=function(){return this._getVisibleContent().filter(function(t){return t.getVisible()})};g.prototype._getOverflowButton=function(){var t;if(!this.getAggregation("_overflowButton")){t=new o({id:this.getId()+"-overflowButton",icon:h.getIconURI("overflow"),press:this._overflowButtonPressed.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.core","Icon.overflow"),type:C.Transparent});this.setAggregation("_overflowButton",t,true)}return this.getAggregation("_overflowButton")};g.prototype._overflowButtonPressed=function(t){var o=this._getPopover(),e=this._getBestPopoverPlacement();if(o.getPlacement()!==e){o.setPlacement(e)}if(o.isOpen()){o.close()}else{o.openBy(t.getSource())}};g.prototype._getPopover=function(){var t;if(!this.getAggregation("_popover")){t=new s(this.getId()+"-popover",{showHeader:false,showArrow:false,modal:false,horizontalScrolling:u.system.phone?false:true,contentWidth:u.system.phone?"100%":"auto",offsetY:this._detireminePopoverVerticalOffset(),ariaLabelledBy:e.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")});t._adaptPositionParams=function(){s.prototype._adaptPositionParams.call(this);this._myPositions=["end top","begin center","end bottom","end center"];this._atPositions=["end bottom","end center","end top","begin center"]};if(u.system.phone){t.attachBeforeOpen(this._shiftPopupShadow,this)}t.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",t,true)}return this.getAggregation("_popover")};g.prototype._shiftPopupShadow=function(){var t=this._getPopover(),o=t.getCurrentPosition();if(o===v.Bottom){t.addStyleClass("sapMOTAPopoverNoShadowTop");t.removeStyleClass("sapMOTAPopoverNoShadowBottom")}else if(o===v.Top){t.addStyleClass("sapMOTAPopoverNoShadowBottom");t.removeStyleClass("sapMOTAPopoverNoShadowTop")}};g.prototype._popOverClosedHandler=function(){var t=u.os.windows_phone||u.browser.edge&&u.browser.mobile;this._getOverflowButton().setPressed(false);this._getOverflowButton().$().focus();if(this._isNestedInsideAPopup()||t){return}this._getOverflowButton().setEnabled(false);setTimeout(function(){this._getOverflowButton().setEnabled(true);setTimeout(function(){this._getOverflowButton().$().focus()}.bind(this),0)}.bind(this),0)};g.prototype._isNestedInsideAPopup=function(){var t;if(this._bNestedInAPopover!==null){return this._bNestedInAPopover}t=function(o){if(!o){return false}if(o.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){return true}return t(o.getParent())};this._bNestedInAPopover=t(this);return this._bNestedInAPopover};g.prototype._getOverflowButtonNeeded=function(){return this._bOverflowButtonNeeded};g.prototype._setOverflowButtonNeeded=function(t){if(this._bOverflowButtonNeeded!==t){this._bOverflowButtonNeeded=t}return this};g.prototype._updateContentInfoInControlsCollections=function(t){this._removeContentFromControlsCollections(t);this._moveControlInSuitableCollection(t,g._getControlPriority(t))};g.prototype._moveControlInSuitableCollection=function(t,o){var e=o!==c.NeverOverflow,i=o===c.AlwaysOverflow;if(a.supportsControl(t)&&i){this._aPopoverOnlyControls.push(t)}else{if(a.supportsControl(t)&&e&&t.getVisible()){this._aMovableControls.push(t)}else{this._aToolbarOnlyControls.push(t)}}};g.prototype._removeContentFromControlsCollections=function(t){var o,e,i;for(o=0;o<this._aAllCollections.length;o++){e=this._aAllCollections[o];i=e.indexOf(t);if(i!==-1){e.splice(i,1)}}};g.prototype._clearAllControlsCollections=function(){this._aMovableControls=[];this._aToolbarOnlyControls=[];this._aPopoverOnlyControls=[];this._aAllCollections=[this._aMovableControls,this._aToolbarOnlyControls,this._aPopoverOnlyControls]};g.prototype.onLayoutDataChange=function(t){this._resetAndInvalidateToolbar(true);t&&this._updateContentInfoInControlsCollections(t.srcControl)};g.prototype.addContent=function(t){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,g._getControlPriority(t))}return this._callToolbarMethod("addContent",arguments)};g.prototype.insertContent=function(t,o){this._registerControlListener(t);this._resetAndInvalidateToolbar(false);if(t){this._moveControlInSuitableCollection(t,g._getControlPriority(t))}return this._callToolbarMethod("insertContent",arguments)};g.prototype.removeContent=function(){var t=this._callToolbarMethod("removeContent",arguments);if(t){this._getPopover().removeAssociatedContent(t.getId())}this._resetAndInvalidateToolbar(false);this._deregisterControlListener(t);this._removeContentFromControlsCollections(t);return t};g.prototype.removeAllContent=function(){var t=this._callToolbarMethod("removeAllContent",arguments);t.forEach(this._deregisterControlListener,this);t.forEach(this._removeContentFromControlsCollections,this);this._resetAndInvalidateToolbar(false);this._clearAllControlsCollections();return t};g.prototype.destroyContent=function(){this._resetAndInvalidateToolbar(false);setTimeout(function(){this._resetAndInvalidateToolbar(false)}.bind(this),0);this._clearAllControlsCollections();return this._callToolbarMethod("destroyContent",arguments)};g.prototype._registerControlListener=function(t){var o;if(t){t.attachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){o=t.getOverflowToolbarConfig().invalidationEvents;if(o&&Array.isArray(o)){o.forEach(function(o){t.attachEvent(o,this._onInvalidationEventFired,this)},this)}}}};g.prototype._deregisterControlListener=function(t){var o;if(t){t.detachEvent("_change",this._onContentPropertyChangedOverflowToolbar,this);if(t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1){o=t.getOverflowToolbarConfig().invalidationEvents;if(o&&Array.isArray(o)){o.forEach(function(o){t.detachEvent(o,this._onInvalidationEventFired,this)},this)}}}};g.prototype._onContentPropertyChangedOverflowToolbar=function(t){var o=t.getSource(),e,i;this._updateContentInfoInControlsCollections(o);if(!this._bListenForControlPropertyChanges){return}e=a.getControlConfig(o);i=t.getParameter("name");if(typeof e!=="undefined"&&e.noInvalidationProps.indexOf(i)!==-1){return}if(i==="visible"){this._bContentVisibilityChanged=true}this._resetAndInvalidateToolbar(true)};g.prototype._onInvalidationEventFired=function(){if(!this._bListenForInvalidationEvents){return}this._resetAndInvalidateToolbar(true)};g.prototype._getOverflowButtonSize=function(){var o=parseInt(t.BaseFontSize),e=this.$().parents().hasClass("sapUiSizeCompact")?2.5:3,i=p.toPx(f.get("_sap_m_Toolbar_MarginRight")),n=i===0?.25*o:0;return parseInt(o*e)-n};g.prototype._getBestPopoverPlacement=function(){var t=this.getHTMLTag();if(t==="Footer"){return v.Top}else if(t==="Header"){return v.Bottom}return v.Vertical};g.prototype._getControlsIds=function(){return this.getContent().map(function(t){return t.getId()})};g.prototype._getControlIndex=function(t){return t.length?t._index:this.indexOfContent(t)};g.prototype._getOptimalControlWidth=function(t,o){var e,i=t.getLayoutData(),n=i&&i.isA("sap.m.ToolbarLayoutData")?i.getShrinkable():false,r=n?this._getMinWidthOfShrinkableControl(t):0,s=t.getVisible(),a;if(t.isA("sap.m.ToolbarSpacer")){a=parseInt(t.$().css("width"));r=t.getWidth()&&a?a:0;e=r+(t.$().outerWidth(true)-t.$().outerWidth())}else if(n&&r>0&&s){e=r+t.$().outerWidth(true)-t.$().outerWidth()}else{e=s?t.$().outerWidth(true):0}if(e===null){e=typeof o!=="undefined"?o:0}return e};g.prototype._getMinWidthOfShrinkableControl=function(t){var o=t.$().css("min-width"),e=parseInt(o),n=i.isRelativeWidth(o);if(n){return e*this.$().width()/100}else{return e}};g._getControlPriority=function(t){var o,e,i,n;if(t.length){return t._priority}o=t.getMetadata().getInterfaces().indexOf("sap.m.IOverflowToolbarContent")>-1;n=o&&t.getOverflowToolbarConfig().getCustomImportance;if(o&&typeof n==="function"){return n()}e=t.getLayoutData&&t.getLayoutData();if(e&&e instanceof r){if(e.getMoveToOverflow()===false){return c.NeverOverflow}if(e.getStayInOverflow()===true){return c.AlwaysOverflow}i=e.getPriority();if(i===c.Never){return c.NeverOverflow}if(i===c.Always){return c.AlwaysOverflow}return i}return c.High};g._getControlGroup=function(t){var o=t.getLayoutData();if(o instanceof r){return o.getGroup()}};g._oPriorityOrder=function(){var t={};t[c.Disappear]=1;t[c.Low]=2;t["Medium"]=3;t[c.High]=4;return t}();g.prototype._detireminePopoverVerticalOffset=function(){return this.$().parents().hasClass("sapUiSizeCompact")?2:3};g.prototype.onThemeChanged=function(){this._resetAndInvalidateToolbar();for(var t in this._aControlSizes){if(this._aControlSizes.hasOwnProperty(t)){this._aControlSizes[t]=0}}};g.prototype.closeOverflow=function(){this._getPopover().close()};return g});