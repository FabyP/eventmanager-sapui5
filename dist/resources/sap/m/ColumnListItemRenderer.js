/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/ui/core/Core","sap/ui/Device","sap/base/Log","./library","./ListItemBaseRenderer"],function(e,t,a,i,n,r,s){"use strict";var l=r.PopinDisplay;var o=t.VerticalAlign;var d=r.PopinLayout;var p=e.extend(s);p.apiVersion=2;p.render=function(e,t){var a=t.getTable();if(!a){return}s.render.apply(this,arguments);if(t.getVisible()&&a.hasPopin()){this.renderPopin(e,t,a)}};p.renderHighlight=function(e,t){e.openStart("td");e.class("sapMListTblHighlightCell");e.attr("role","presentation");e.attr("aria-hidden","true");e.openEnd();s.renderHighlight.apply(this,arguments);e.close("td")};p.renderType=function(e,t){e.openStart("td");e.class("sapMListTblNavCol");e.attr("role","presentation");e.attr("aria-hidden","true");e.openEnd();s.renderType.apply(this,arguments);e.close("td")};p.renderModeContent=function(e,t){e.openStart("td");e.class("sapMListTblSelCol");e.attr("role","presentation");e.attr("aria-hidden","true");e.openEnd();s.renderModeContent.apply(this,arguments);e.close("td")};p.renderCounter=function(e,t){};p.getAriaRole=function(e){return""};p.renderLIAttributes=function(e,t){e.class("sapMListTblRow");var a=t.getVAlign();if(a!=o.Inherit){e.class("sapMListTblRow"+a)}var i=t.getTable();if(i&&i.getAlternateRowColors()){var n=i.indexOfItem(t);if(n%2==0){e.class("sapMListTblRowAlternate")}}};p.renderLIContentWrapper=function(e,t){var i=t.getTable();if(!i){return}var r=i.getColumns(true),s=t.getCells();t._destroyClonedHeaders();r.forEach(function(r,l){var o,d=true,p=s[r.getInitialOrder()];if(!p||!r.getVisible()||r.isPopin()){r.setIndex(-1);return}e.openStart("td",t.getId()+"_cell"+l);e.class("sapMListTblCell");e.attr("data-sap-ui-column",r.getId());if(r){e.class(r.getStyleClass(true));o=r.getHeader();if(o){e.attr("headers",o.getId())}if(!i.hasPopin()&&r.getMergeDuplicates()){var c=r.getMergeFunctionName(),u=c.split("#"),g=u[1],b=u[0];if(typeof p[b]!="function"){n.warning("mergeFunctionName property is defined on "+r+" but this is not function of "+p)}else if(i._bRendering||!p.bOutput){var f=r.getLastValue(),C=p[b](g);if(f===C){d=a.getConfiguration().getAccessibility();p.addStyleClass("sapMListTblCellDupCnt");e.class("sapMListTblCellDup")}else{r.setLastValue(C)}}else if(p.hasStyleClass("sapMListTblCellDupCnt")){e.class("sapMListTblCellDup")}}r.getVAlign()!="Inherit"&&e.style("vertical-align",r.getVAlign().toLowerCase());e.style("text-align",r.getCssAlign())}e.openEnd();if(d){this.applyAriaLabelledBy(o,p);e.renderControl(p)}e.close("td")},this)};p.applyAriaLabelledBy=function(e,t){if(e&&e.getText&&e.getVisible()&&t.getAriaLabelledBy&&(t.getAriaLabelledBy()||[]).indexOf(e.getId())==-1){t.addAriaLabelledBy(e)}};p.renderPopin=function(e,t,a){t.removePopin();e.openStart("tr",t.getPopin());e.class("sapMListTblSubRow");e.attr("tabindex","-1");if(t.isSelectable()){e.attr("aria-selected",t.getSelected())}e.openEnd();this.renderHighlight(e,t);e.openStart("td",t.getId()+"-subcell");e.attr("colspan",a.getColSpan());var n=a.getPopinLayout();if(i.browser.msie||i.browser.edge&&i.browser.version<16){n=d.Block}e.attr("aria-labelledby",this.getAriaAnnouncement(null,"TABLE_POPIN_ROLE_DESCRIPTION"));e.openEnd();e.openStart("div");e.class("sapMListTblSubCnt");e.class("sapMListTblSubCnt"+n);e.openEnd();var r=t.getCells(),s=a.getColumns(true);s.forEach(function(a){if(!a.getVisible()||!a.isPopin()){return}var i=r[a.getInitialOrder()],n=a.getHeader();if(!n&&!i){return}var s=a.getStyleClass(),o=a.getPopinDisplay();e.openStart("div");e.class("sapMListTblSubCntRow");s&&e.class(s);e.openEnd();if(n&&o!=l.WithoutHeader){e.openStart("div").class("sapMListTblSubCntHdr").openEnd();n=n.clone();a.addDependent(n);t._addClonedHeader(n);e.renderControl(n);e.close("div");e.openStart("div").class("sapMListTblSubCntSpr").openEnd();e.text(":");e.close("div")}if(i){e.openStart("div");e.class("sapMListTblSubCntVal");e.class("sapMListTblSubCntVal"+o);e.openEnd();this.applyAriaLabelledBy(n,i);e.renderControl(i);e.close("div")}e.close("div")},this);e.close("div");e.close("td");e.close("tr")};p.addLegacyOutlineClass=function(e,t){};return p},true);