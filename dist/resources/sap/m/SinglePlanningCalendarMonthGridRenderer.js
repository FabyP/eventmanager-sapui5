/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/Month","sap/ui/core/date/UniversalDate","./PlanningCalendarLegend","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/unified/library"],function(e,t,a,i,r,s,l,d){"use strict";var n=d.CalendarDayType;var o={};o.render=function(e,t){var a=t._getCoreLocaleData();var i=t._getDensitySizes();e.write("<div");e.writeControlData(t);e.addClass("sapMSinglePCGrid");e.addClass("sapMSPCMonthGrid");e.writeClasses();e.write(">");this.renderDayNames(e,t,a);e.write("<div");e.addClass("sapMSinglePCGridContent");e.writeClasses();e.write(">");this.renderCells(e,t,a,i);e.write("</div>");e.write("</div>")};o.renderCells=function(e,t,a,i){var r=t._getCells(),s=t._getVerticalLabels(),l=t._getColumns(),d=[],n=[],o,p,w,C,g=[],c,u;for(var v=0;v<t._getRows();v++){u=0;e.write("<div");e.writeAttribute("role","grid");e.addClass("sapMSPCMonthWeek");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapMSPCMonthWeekNumber");e.writeClasses();e.write(">");e.write(s[v]);e.write("</div>");for(var f=0;f<l;f++){o=v*l+f;p=r[o];w=t._getAppointmetsForADay(p);C=t._getPreviousAppointmetsForADay(p);g.push(C);c=t._getMoreCountPerCell(o);d.push(c);n.push(w);u=Math.max(u,t._aAppsLevelsPerDay[o].length)}e.write("<div");e.addClass("sapMSPCMonthDays");e.addClass("sapMSPCMonthDaysMax"+u);e.writeClasses();e.write(">");for(var f=0;f<l;f++){o=v*l+f;p=r[o];this.renderDay(e,t,p,a,d[o],o)}e.write("<div");e.addClass("sapMSinglePCBlockers");e.addClass("sapUiCalendarRowVisFilled");e.writeClasses();e.write(">");for(var f=0;f<l;f++){o=v*l+f;p=r[o];if(f===0){this.renderAppointments(e,t,g[o],f,d[o],i)}this.renderAppointments(e,t,n[o],f,d[o],i)}e.write("</div>");e.write("</div>");e.write("</div>")}};o.renderDay=function(e,i,s,d,n,o){var p=i.getSpecialDates(),w=a.prototype._getDateTypes.call(i,s),C=i._getDateFormatter(),g,c;e.write("<div");e.addClass("sapMSPCMonthDay");if(t._isWeekend(s,d)){e.addClass("nonWorkingTimeframe")}if(p){if(w&&w[0]){g=w[0];e.addClass("sapUiCalendarSpecialDay"+g.type);c=r.findLegendItemForItem(l.byId(i._sLegendId),g)}}e.writeClasses();e.writeAttribute("sap-ui-date",s.valueOf().toString());e.writeAttribute("tabindex",-1);e.writeAttribute("aria-labelledby",C.format(s.toLocalJSDate())+"-Descr");e.write(">");this.renderDndPlaceholder(e,i.getAggregation("_appsPlaceholders")[o]);e.write("<div");e.addClass("specialDateIndicator");e.writeClasses();e.write(">");e.write("</div>");e.write("<div");e.addClass("sapMSPCMonthDayNumber");e.writeClasses();e.write(">");e.write(s.getDate());e.write("</div>");if(n){e.write("<div");e.addClass("sapMSPCMonthLnkMore");e.writeClasses();e.write(">");e.renderControl(i._getMoreLink(n,s,o));e.write("</div>")}e.write("<span");e.writeAttribute("id","fullDay-"+C.format(s.toLocalJSDate())+"-Descr");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.write(i._getCellStartInfo(s.toLocalJSDate()));if(i._sLegendId&&c){e.writeEscaped(c)}e.write("</span>");e.write("</div>")};o.renderAppointments=function(e,t,a,i,r,s){var l=t._getMaxAppointments(),d=r?l-2:l-1;for(var n=0;n<a.length;n++){if(a[n].level<=d){this.renderAppointment(e,t,a[n],i,s)}}};o.renderAppointment=function(e,t,a,i,r){var d=a.data,o=a.width,p=a.level,w=t._getColumns(),C=d.getTooltip_AsString(),g=d.getType(),c=d.getColor(),u=d.getTitle(),v=d.getText(),f=d.getIcon(),y=d.getId(),A={role:"gridcell",labelledby:{value:s.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:d.getSelected()?true:false},b=w-i-o,S=l.getConfiguration().getRTL(),h,D=l.getConfiguration().getTheme().indexOf("_hc")?2:1;b=b<0?0:b;if(u){A["labelledby"].value=A["labelledby"].value+" "+y+"-Title"}A["labelledby"].value=A["labelledby"].value+" "+y+"-Descr";if(v){A["labelledby"].value=A["labelledby"].value+" "+y+"-Text"}if(d.getTentative()){A["labelledby"].value=A["labelledby"].value+" "+s.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}e.write("<div");e.writeElementData(d);e.writeAttribute("data-sap-level",p);e.writeAttribute("data-sap-width",o);e.writeAttribute("tabindex",0);if(C){e.writeAttributeEscaped("title",C)}e.writeAccessibilityState(d,A);e.addClass("sapMSinglePCAppointmentWrap");e.addClass("sapUiCalendarRowApps");if(!c&&g!==n.None){e.addClass("sapUiCalendarApp"+g)}if(c){if(l.getConfiguration().getRTL()){e.addStyle("border-right-color",c)}else{e.addStyle("border-left-color",c)}}e.addStyle(S?"right":"left","calc("+i*100/w+"% + "+D+"px)");e.addStyle(S?"left":"right","calc("+b*100/w+"% + "+D+"px)");e.addStyle("top",p*r.appHeight+r.cellHeaderHeight+"rem");e.writeClasses();e.writeStyles();e.write(">");e.write("<div");e.addClass("sapUiCalendarApp");if(d.getSelected()){e.addClass("sapUiCalendarAppSel")}if(d.getTentative()){e.addClass("sapUiCalendarAppTent")}if(f){e.addClass("sapUiCalendarAppWithIcon")}e.writeClasses();e.writeStyles();e.write(">");e.write("<div");e.addClass("sapUiCalendarAppCont");if(c){e.addStyle("background-color",d._getCSSColorForBackground(c));e.writeStyles()}e.writeClasses();e.write(">");if(a.hasPrevious<0){h=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];e.writeIcon("sap-icon://arrow-left",h,{title:null})}if(f){h=["sapUiCalendarAppIcon"];var M={};M["id"]=y+"-Icon";M["title"]=null;e.writeIcon(f,h,M)}if(u){e.write("<span");e.writeAttribute("id",y+"-Title");e.addClass("sapUiCalendarAppTitle");e.writeClasses();e.write(">");e.writeEscaped(u,true);e.write("</span>")}if(a.hasNext<0){h=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];e.writeIcon("sap-icon://arrow-right",h,{title:null})}e.write('<span id="'+y+'-Descr" class="sapUiInvisibleText">'+t._getAppointmentAnnouncementInfo(d)+"</span>");e.write("</div>");e.write("</div>");e.write("</div>")};o.renderDayNames=function(e,t,a){var i=a.getFirstDayOfWeek(),r=t.getId(),s,d=l.getConfiguration().getCalendarType(),n=a.getDaysStandAlone("abbreviated",d),o=a.getDaysStandAlone("wide",d),p;e.write('<div id="'+r+"-Names\" class='sapMSPCMonthDayNames'>");for(var w=0;w<7;w++){p=(w+i)%7;e.write("<div");e.addClass("sapUiCalWH");s=r+"-WH"+p;e.writeAttribute("id",s);if(w==0){e.addClass("sapUiCalFirstWDay")}e.writeAccessibilityState(null,{role:"columnheader",label:o[p]});e.writeClasses();e.writeStyles();e.write(">");e.write(n[p%7]);e.write("</div>")}e.write("</div>")};o.renderDndPlaceholder=function(e,t){e.write('<div class="sapMSinglePCOverlay">');e.renderControl(t);e.write("</div>")};return o},true);