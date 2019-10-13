/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText","./ListItemBaseRenderer"],function(e,t,s,r){"use strict";var i=e.ListGrowingDirection;var a=e.ListKeyboardMode;var n=e.ToolbarDesign;var o={apiVersion:2};o.ModeOrder={None:0,Delete:1,MultiSelect:-1,SingleSelect:1,SingleSelectLeft:-1,SingleSelectMaster:0};o.render=function(e,t){e.openStart("div",t);e.class("sapMList");if(t.getInset()){e.class("sapMListInsetBG")}e.style("width",t.getWidth());if(t.getBackgroundDesign){e.class("sapMListBG"+t.getBackgroundDesign())}var s=t.getTooltip_AsString();if(s){e.attr("title",s)}this.renderContainerAttributes(e,t);e.openEnd();var r=t.getHeaderText();var o=t.getHeaderToolbar();if(o){o.setDesign(n.Transparent,true);o.addStyleClass("sapMListHdr");o.addStyleClass("sapMListHdrTBar");o.addStyleClass("sapMTBHeader-CTX");e.renderControl(o)}else if(r){e.openStart("header",t.getId("header"));e.class("sapMListHdr").class("sapMListHdrText").openEnd();e.text(r);e.close("header")}var d=t.getInfoToolbar();if(d){d.setDesign(n.Info,true);d.addStyleClass("sapMListInfoTBar");e.openStart("div").class("sapMListInfoTBarContainer").openEnd();e.renderControl(d);e.close("div")}var l=t.getItems(),c=t.getShowNoData(),g=t.shouldRenderItems()&&l.length,p=t.getKeyboardMode()==a.Edit?-1:0,u=t.getGrowingDirection()==i.Upwards&&t.getGrowing();if(u){this.renderGrowing(e,t)}if(g||c){this.renderDummyArea(e,t,"before",-1)}this.renderListStartAttributes(e,t);e.accessibilityState(t,this.getAccessibilityState(t));e.class("sapMListUl");if(t._iItemNeedsHighlight){e.class("sapMListHighlight")}if(g||c){e.attr("tabindex",p)}e.class("sapMListShowSeparators"+t.getShowSeparators());e.class("sapMListMode"+t.getMode());e.openEnd();this.renderListHeadAttributes(e,t);if(g){if(u){l.reverse()}for(var f=0;f<l.length;f++){e.renderControl(l[f])}}if(!g&&c){this.renderNoData(e,t)}this.renderListEndAttributes(e,t);if(g||c){this.renderDummyArea(e,t,"after",p)}if(!u){this.renderGrowing(e,t)}if(t.getFooterText()){e.openStart("footer",t.getId("footer")).class("sapMListFtr").openEnd();e.text(t.getFooterText());e.close("footer")}e.close("div")};o.renderContainerAttributes=function(e,t){var s=t.getStickyStyleValue();if(s){e.class("sapMSticky");e.class("sapMSticky"+s)}};o.renderListHeadAttributes=function(e,t){};o.renderListStartAttributes=function(e,t){e.openStart("ul",t.getId("listUl"));e.class("sapMListItems");t.addNavSection(t.getId("listUl"))};o.getAriaRole=function(e){return"listbox"};o.getAriaLabelledBy=function(e){};o.getAriaDescribedBy=function(e){if(e.getFooterText()){return e.getId("footer")}};o.getAccessibilityState=function(e){var t=this.getAriaRole(e);return{role:t,multiselectable:t&&e._bSelectionMode?e.getMode()=="MultiSelect":undefined,labelledby:{value:this.getAriaLabelledBy(e),append:true},describedby:{value:this.getAriaDescribedBy(e),append:true}}};o.renderListEndAttributes=function(e,t){e.close("ul")};o.renderNoData=function(e,t){e.openStart("li",t.getId("nodata"));e.attr("tabindex",t.getKeyboardMode()==a.Navigation?-1:0);e.class("sapMLIB").class("sapMListNoData").class("sapMLIBTypeInactive");r.addFocusableClasses.call(r,e);e.openEnd();e.openStart("div",t.getId("nodata-text")).class("sapMListNoDataText").openEnd();e.text(t.getNoDataText(true));e.close("div");e.close("li")};o.renderDummyArea=function(e,s,r,i){e.openStart("div",s.getId(r)).attr("tabindex",i);if(t.system.desktop){e.class("sapMListDummyArea")}e.openEnd().close("div")};o.renderGrowing=function(e,t){var s=t._oGrowingDelegate;if(s){s.render(e)}};o.getAriaAnnouncement=function(e){return s.getStaticId("sap.m",e)};return o},true);