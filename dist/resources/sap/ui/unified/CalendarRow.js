/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","./library","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/ResizeHandler","sap/ui/core/Locale","./CalendarRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/CalendarAppointment"],function(e,t,i,a,n,s,r,o,p,l,u,g,h,d){"use strict";var f=s.CalendarDayType;var c=s.CalendarAppointmentVisualization;var m=s.GroupAppointmentsMode;var v=s.CalendarIntervalType;var T=e.extend("sap.ui.unified.CalendarRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},intervals:{type:"int",group:"Appearance",defaultValue:12},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:v.Hour},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showEmptyIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},checkResize:{type:"boolean",group:"Behavior",defaultValue:true},updateCurrentTime:{type:"boolean",group:"Behavior",defaultValue:true},groupAppointmentsMode:{type:"sap.ui.unified.GroupAppointmentsMode",group:"Appearance",defaultValue:m.Collapsed},appointmentsReducedHeight:{type:"boolean",group:"Appearance",defaultValue:false},appointmentsVisualization:{type:"sap.ui.unified.CalendarAppointmentVisualization",group:"Appearance",defaultValue:c.Standard}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},groupAppointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"groupAppointment",visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"},domRefId:{type:"string"}}},startDateChange:{},leaveRow:{parameters:{type:{type:"string"}}},intervalSelect:{parameters:{startDate:{type:"object"},endDate:{type:"object"},subInterval:{type:"boolean"}}}}}});T.prototype.init=function(){this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=o.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' HH:mm:ss a"});this._iHoursMinDelta=1;this._iDaysMinDelta=30;this._iMonthsMinDelta=720;this._aVisibleAppointments=[];this._aVisibleIntervalHeaders=[];this.setStartDate(new Date);this._resizeProxy=h.proxy(this.handleResize,this);this.aSelectedAppointments=[];this._fnCustomSortedAppointments=undefined};T.prototype.exit=function(){if(this._sResizeListener){p.deregister(this._sResizeListener);this._sResizeListener=undefined}if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}this._fnCustomSortedAppointments=undefined};T.prototype.onBeforeRendering=function(){A.call(this);b.call(this);w.call(this);if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}};T.prototype.onAfterRendering=function(){H.call(this);this.updateCurrentTimeVisualization();if(this.getCheckResize()&&!this._sResizeListener){this._sResizeListener=p.register(this,this._resizeProxy)}};T.prototype.onThemeChanged=function(e){if(this.getDomRef()){for(var t=0;t<this._aVisibleAppointments.length;t++){var i=this._aVisibleAppointments[t];i.level=-1}this.handleResize(e)}};T.prototype.invalidate=function(t){if(t&&t instanceof d){var i=false;for(var a=0;a<this._aVisibleAppointments.length;a++){if(this._aVisibleAppointments[a].appointment==t){i=true;break}}if(i){this._aVisibleAppointments=[]}this._updateSelectedAppointmentsArray(t)}e.prototype.invalidate.apply(this,arguments)};T.prototype.setStartDate=function(e){if(!e){e=new Date}a._checkJSDateObject(e);var t=e.getFullYear();a._checkYearInValidRange(t);this.setProperty("startDate",e);return this};T.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(this.getStartDate(),undefined,true)}return this._oUTCStartDate};T.prototype.setIntervalType=function(e){this.setProperty("intervalType",e);this._aVisibleAppointments=[];return this};T.prototype.setGroupAppointmentsMode=function(e){this.setProperty("groupAppointmentsMode",e);this._aVisibleAppointments=[];return this};T.prototype.setAppointmentsReducedHeight=function(e){this.setProperty("appointmentsReducedHeight",e);this._aVisibleAppointments=[];return this};T.prototype._getAppointmentReducedHeight=function(e){var i=false;if(!t.system.phone&&this.getAppointmentsReducedHeight()&&!e.getText()){i=true}return i};T.prototype.onfocusin=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){F.call(this,e.target.id)}else{var t=this._getVisibleAppointments();var i=false;var a;for(var n=0;n<t.length;n++){a=t[n].appointment;if(g(a.getDomRef(),e.target)){i=true;a.focus();break}}if(!i){a=this.getFocusedAppointment();if(a){a.focus()}}}};T.prototype.applyFocusInfo=function(e){if(this._sFocusedAppointmentId){this.getFocusedAppointment().focus()}return this};T.prototype.onsapleft=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){L.call(this,this._bRTL,1)}e.preventDefault();e.stopPropagation()};T.prototype.onsapright=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){L.call(this,!this._bRTL,1)}e.preventDefault();e.stopPropagation()};T.prototype.onsapup=function(e){this.fireLeaveRow({type:e.type})};T.prototype.onsapdown=function(e){this.fireLeaveRow({type:e.type})};T.prototype.onsaphome=function(e){z.call(this,e);e.preventDefault();e.stopPropagation()};T.prototype.onsapend=function(e){z.call(this,e);e.preventDefault();e.stopPropagation()};T.prototype.onsapselect=function(e){var t=this._getVisibleAppointments();for(var i=0;i<t.length;i++){var a=t[i].appointment;if(g(a.getDomRef(),e.target)){k.call(this,a,!(e.ctrlKey||e.metaKey));break}}e.stopPropagation();e.preventDefault()};T.prototype.ontap=function(e){var t=this.$("Apps").children(".sapUiCalendarRowAppsInt");var i=0;var a=false;for(i=0;i<t.length;i++){var n=t[i];if(!this._isOneMonthIntervalOnSmallSizes()&&g(n,e.target)){a=true;break}}if(a){P.call(this,i,e.target)}else{this.onsapselect(e)}};T.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};T.prototype.handleResize=function(e){if(e&&e.size&&e.size.width<=0){return this}var t=this.$("DummyApp");t.css("display","");H.call(this);return this};T.prototype.updateCurrentTimeVisualization=function(){var e=this.$("Now");var t=a._createUniversalUTCDate(new Date,undefined,true);var i=this.getIntervals();var n=this.getIntervalType();var s=this._getStartDate();var r=s.getTime();var o=this._oUTCEndDate;var p=o.getTime();this._sUpdateCurrentTime=undefined;if(t.getTime()<=p&&t.getTime()>=r){var l=S.call(this,n,i,s,o,r,t);var u=0;if(this._bRTL){e.css("right",l+"%")}else{e.css("left",l+"%")}e.css("display","");if(this.getUpdateCurrentTime()){switch(n){case v.Hour:u=6e4;break;case v.Day:case v.Week:case v.OneMonth:u=18e5;break;default:u=-1;break}if(u>0){this._sUpdateCurrentTime=setTimeout(this.updateCurrentTimeVisualization.bind(this),u)}}}else{e.css("display","none")}return this};T.prototype.getFocusedAppointment=function(){var e=this._getAppointmentsSorted();var t=this.getAggregation("groupAppointments",[]);var i;var a=0;for(a=0;a<t.length;a++){if(t[a].getId()==this._sFocusedAppointmentId){i=t[a];break}}if(!i){for(a=0;a<e.length;a++){if(e[a].getId()==this._sFocusedAppointmentId){i=e[a];break}}}return i};T.prototype.focusAppointment=function(e){if(!e||!(e instanceof d)){throw new Error("Appointment must be a CalendarAppointment; "+this)}var t=e.getId();if(this._sFocusedAppointmentId!=t){F.call(this,t)}else{e.focus()}return this};T.prototype.focusNearestAppointment=function(e){a._checkJSDateObject(e);var t=this._getAppointmentsSorted();var i;var n;var s;for(var r=0;r<t.length;r++){i=t[r];if(i.getStartDate()>e){if(r>0){n=t[r-1]}else{n=i}break}}if(i){if(n&&Math.abs(i.getStartDate()-e)>=Math.abs(n.getStartDate()-e)){s=n}else{s=i}this.focusAppointment(s)}return this};T.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};T.prototype._getVisibleIntervalHeaders=function(){return this._aVisibleIntervalHeaders};T.prototype._getNonWorkingDays=function(){var e=this.getNonWorkingDays();if(!e){var t=_.call(this);var i=t.getWeekendStart();var a=t.getWeekendEnd();e=[];for(var n=0;n<=6;n++){if(i<=a&&n>=i&&n<=a||i>a&&(n>=i||n<=a)){e.push(n)}}}else if(!Array.isArray(e)){e=[]}return e};T.prototype._isOneMonthIntervalOnSmallSizes=function(){return this.getIntervalType()===v.OneMonth&&this.getIntervals()===1};T.prototype._getAppointmentsSorted=function(){var e=this.getAppointments(),t=$;e.sort(this._fnCustomSortedAppointments?this._fnCustomSortedAppointments:t);return e};T.prototype._setCustomAppointmentsSorterCallback=function(e){this._fnCustomSortedAppointments=e;this.invalidate()};T.prototype._calculateAppoitnmentVisualCue=function(e){if(C(this,e)){return{appTimeUnitsDifRowStart:0,appTimeUnitsDifRowEnd:0}}var t=e.getStartDate(),i=e.getEndDate(),a=new n(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),s=new n(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes()),r=this.getIntervalType(),o=this.getStartDate(),p=r==="Hour"?new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()):new n(o.getFullYear(),o.getMonth(),o.getDate()),l=this.getIntervals(),u;switch(r){case"Hour":u=new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()+l);break;case"Day":case"Week":case"One Month":u=new n(o.getFullYear(),o.getMonth(),o.getDate()+l);break;case"Month":u=new n(o.getFullYear(),o.getMonth()+l,o.getDate());break;default:break}return{appTimeUnitsDifRowStart:p.getTime()-a.getTime(),appTimeUnitsDifRowEnd:s.getTime()-u.getTime()}};T.prototype._updateSelectedAppointmentsArray=function(e){if(e.getSelected()){if(this.aSelectedAppointments.indexOf(e.getId())===-1){this.aSelectedAppointments.push(e.getId())}}else{this.aSelectedAppointments=this.aSelectedAppointments.filter(function(t){return t!==e.getId()})}};function C(e,t){var i=e.getAggregation("groupAppointments",[]);var a;for(a=0;a<i.length;++a){if(t===i[a]){return true}}return false}function U(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale}function _(){if(!this._oLocaleData){var e=U.call(this);var t=new l(e);this._oLocaleData=i.getInstance(t)}return this._oLocaleData}function A(){var e=this.getStartDate();var t;var i=this.getIntervals();var a=this.getIntervalType();this._oUTCStartDate=D.call(this,e);switch(a){case v.Hour:t=new n(this._oUTCStartDate.getTime());t.setUTCHours(t.getUTCHours()+i);this._iMinDelta=this._iHoursMinDelta;break;case v.Day:case v.Week:case v.OneMonth:t=new n(this._oUTCStartDate.getTime());t.setUTCDate(t.getUTCDate()+i);this._iMinDelta=this._iDaysMinDelta;break;case v.Month:t=new n(this._oUTCStartDate.getTime());t.setUTCMonth(t.getUTCMonth()+i);this._iMinDelta=this._iMonthsMinDelta;break;default:throw new Error("Unknown IntervalType: "+a+"; "+this)}t.setUTCMilliseconds(-1);this._iRowSize=t.getTime()-this._oUTCStartDate.getTime();this._iIntervalSize=Math.floor(this._iRowSize/i);this._oUTCEndDate=t}function D(e){var t=this.getIntervalType();var i=a._createUniversalUTCDate(e,undefined,true);switch(t){case v.Hour:i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case v.Day:case v.Week:case v.OneMonth:i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case v.Month:i.setUTCDate(1);i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;default:throw new Error("Unknown IntervalType: "+t+"; "+this)}return i}function y(){return t.system.phone||this.getGroupAppointmentsMode()===m.Collapsed}function b(){var e=this._getAppointmentsSorted();var t;var i;var s;var r=this.getIntervals();var o=this.getIntervalType();var p=this._getStartDate();var l=p.getTime();var u=this._oUTCEndDate;var g=u.getTime();var h=[];var d=false;var f=0;var c=0;var m=y.call(this);this.destroyAggregation("groupAppointments",true);for(f=0;f<e.length;f++){t=e[f];var T=a._createUniversalUTCDate(t.getStartDate(),undefined,true);var C=T.getTime();T.setUTCSeconds(0);T.setUTCMilliseconds(0);var U=t.getEndDate()?a._createUniversalUTCDate(t.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);var _=U.getTime();U.setUTCSeconds(0);U.setUTCMilliseconds(0);var A=false;if(T.getTime()<l&&U.getTime()>=l){T=new n(l);A=true}if(U.getTime()>g&&T.getTime()<=g){U=new n(g);A=true}var D=T.getUTCHours()*60+T.getUTCMinutes();T.setUTCMinutes(T.getUTCMinutes()-D%this._iMinDelta);var b=(U.getTime()-T.getTime())/6e4;if(A&&b==0){continue}var w=0;var H=0;var k=-1;i=undefined;s=undefined;if(T&&T.getTime()<=g&&U&&U.getTime()>=l&&C<_){if(m&&o==v.Month&&U.getTime()-T.getTime()<6048e5){i=M.call(this,T,t,o,r,p,u,l,h);var R=a._createUniversalUTCDate(i.getEndDate(),undefined,true);if(U.getTime()>R.getTime()){s=M.call(this,U,t,o,r,p,u,l,h)}}w=S.call(this,o,r,p,u,l,T);H=I.call(this,o,r,p,u,l,U);if(i){i._iBegin=w;i._iEnd=H;i._iLevel=k;if(s){s._iBegin=w;s._iEnd=H;s._iLevel=k}continue}h.push({appointment:t,begin:w,end:H,calculatedEnd:H,level:k});if(this._sFocusedAppointmentId&&this._sFocusedAppointmentId==t.getId()){d=true}}}var V=this.getAggregation("groupAppointments",[]);if(V.length>0){for(f=0;f<h.length;f++){t=h[f];if(t.appointment._aAppointments&&t.appointment._aAppointments.length<=1){i=t.appointment;var E=false;if(i._aAppointments.length==0){E=true}else{for(c=0;c<h.length;c++){if(h[c].appointment==i._aAppointments[0]){E=true;break}}}if(!E){for(c=0;c<V.length;c++){s=V[c];if(i!=s){for(var F=0;F<s._aAppointments.length;F++){if(i._aAppointments[0]==s._aAppointments[F]){s._aAppointments.splice(F,1);if(s._aAppointments.length==1){this.removeAggregation("groupAppointments",s);s.destroy();V=this.getAggregation("groupAppointments",[])}else{s.setProperty("title",s._aAppointments.length,true)}break}}}}t.begin=i._iBegin;t.end=i._iEnd;t.calculatedEnd=i._iEnd;t.level=i._iLevel;t.appointment=i._aAppointments[0]}else{h.splice(f,1);f--}this.removeAggregation("groupAppointments",i);i.destroy();V=this.getAggregation("groupAppointments",[])}}}if(!d){if(h.length>0){this._sFocusedAppointmentId=h[0].appointment.getId()}else{this._sFocusedAppointmentId=undefined}}this._aVisibleAppointments=h;return this._aVisibleAppointments}function M(e,t,i,s,r,o,p,l){var u=this.getAggregation("groupAppointments",[]);var g;var h=_.call(this);var c=h.getFirstDayOfWeek();var m=e.getUTCDay();var v=new n(e.getTime());v.setUTCHours(0);v.setUTCMinutes(0);v.setUTCSeconds(0);v.setUTCMilliseconds(0);if(c<=m){v.setDate(v.getDate()-(m-c))}else{v.setDate(v.getDate()-(7-m-c))}for(var T=0;T<u.length;T++){g=u[T];var C=a._createUniversalUTCDate(g.getStartDate(),undefined,true);if(C.getTime()==v.getTime()){break}g=undefined}if(!g){var U=new n(v.getTime());U.setDate(U.getDate()+7);U.setMilliseconds(-1);g=new d(this.getId()+"-Group"+u.length,{type:t.getType(),startDate:a._createLocalDate(new Date(v.getTime()),true),endDate:a._createLocalDate(new Date(U.getTime()),true)});g._aAppointments=[];this.addAggregation("groupAppointments",g,true);var A=S.call(this,i,s,r,o,p,v);var D=I.call(this,i,s,r,o,p,U);l.push({appointment:g,begin:A,end:D,calculatedEnd:D,level:-1})}g._aAppointments.push(t);if(g.getType()!=f.None&&g.getType()!=t.getType()){g.setType(f.None)}g.setProperty("title",g._aAppointments.length,true);return g}function S(e,t,i,a,s,r){var o=0;if(e!=v.Month){o=100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100*g/t+100*(r.getTime()-p.getTime())/u/t}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function I(e,t,i,a,s,r){var o=0;if(e!=v.Month){o=100-100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100-(100*g/t+100*(r.getTime()-p.getTime())/u/t)}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function w(){var e=[];if(this.getShowIntervalHeaders()){var t=this.getIntervalHeaders();var i;var s=this.getIntervals();var r=this.getIntervalType();var o=this._getStartDate();var p=o.getTime();var l=this._oUTCEndDate;var u=l.getTime();var g=0;var h=0;for(g=0;g<t.length;g++){i=t[g];var d=a._createUniversalUTCDate(i.getStartDate(),undefined,true);d.setUTCSeconds(0);d.setUTCMilliseconds(0);var f=i.getEndDate()?a._createUniversalUTCDate(i.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);f.setUTCSeconds(0);f.setUTCMilliseconds(0);if(d&&d.getTime()<=u&&f&&f.getTime()>=p){var c=new n(o.getTime());var m=new n(o.getTime());m.setUTCMinutes(m.getUTCMinutes()-1);var T=-1;var C=-1;for(h=0;h<s;h++){switch(r){case v.Hour:m.setUTCHours(m.getUTCHours()+1);if(h>0){c.setUTCHours(c.getUTCHours()+1)}break;case v.Day:case v.Week:case v.OneMonth:m.setUTCDate(m.getUTCDate()+1);if(h>0){c.setUTCDate(c.getUTCDate()+1)}break;case v.Month:m.setUTCDate(1);m.setUTCMonth(m.getUTCMonth()+2);m.setUTCDate(0);if(h>0){c.setUTCMonth(c.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+r+"; "+this)}if(d&&d.getTime()<=c.getTime()&&f&&f.getTime()>=m.getTime()){if(T<0){T=h}C=h}}if(T>=0){e.push({interval:T,appointment:i,last:C})}}}}this._aVisibleIntervalHeaders=e;return this._aVisibleIntervalHeaders}function H(){if(this._isOneMonthIntervalOnSmallSizes()){return}var e=this.$("Apps");var i=e.innerWidth();if(i<=0){return}var a=this.$("DummyApp");var n=a.outerHeight(true);if(n<=0){return}var s=a.outerWidth();var r=s/i*100;var o=Math.ceil(1e3*r)/1e3;var p;var l;var u=0;var g=0;var d=0;var f=!t.system.phone&&this.getAppointmentsReducedHeight();if(this.getShowIntervalHeaders()&&(this.getShowEmptyIntervalHeaders()||this._getVisibleIntervalHeaders().length>0)){u=h(this.$("AppsInt0").children(".sapUiCalendarRowAppsIntHead")[0]).outerHeight(true)}for(d=0;d<this._aVisibleAppointments.length;d++){p=this._aVisibleAppointments[d];l=p.appointment.$();var c=Math.floor(1e3*(100-p.calculatedEnd-p.begin))/1e3;var m=false;if(c<o){p.end=100-p.begin-r;if(p.end<0){p.end=0}p.level=-1;m=true;l.addClass("sapUiCalendarAppSmall")}else if(l.hasClass("sapUiCalendarAppSmall")){p.end=p.calculatedEnd;m=true;l.removeClass("sapUiCalendarAppSmall")}if(m){if(this._bRTL){l.css("left",p.end+"%")}else{l.css("right",p.end+"%")}}}for(d=0;d<this._aVisibleAppointments.length;d++){p=this._aVisibleAppointments[d];l=p.appointment.$();var v={};var T=f&&!this._getAppointmentReducedHeight(p.appointment);if(p.level<0){for(var C=0;C<this._aVisibleAppointments.length;C++){var U=this._aVisibleAppointments[C];if(p!=U&&p.begin<Math.floor(1e3*(100-U.end))/1e3&&Math.floor(1e3*(100-p.end))/1e3>U.begin&&U.level>=0){if(v[U.level]){v[U.level]++}else{v[U.level]=1}if(f&&!this._getAppointmentReducedHeight(U.appointment)){if(v[U.level+1]){v[U.level+1]++}else{v[U.level+1]=1}}}}p.level=0;while(v[p.level]||T&&v[p.level+1]){p.level++}l.attr("data-sap-level",p.level)}l.css("top",n*p.level+u+"px");var _=p.level;if(T){_++}if(g<_){g=_}}g++;n=n*g+u;if(!this.getHeight()){e.outerHeight(n)}else{var A=this.$("Apps").children(".sapUiCalendarRowAppsInt");for(d=0;d<A.length;d++){var D=h(A[d]);D.outerHeight(n)}}a.css("display","none")}function k(e,t){var i=0;var a;var n;var s;var o;var p=r.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");if(t){var l=this.getAppointments();var u=this.getAggregation("groupAppointments",[]);h.merge(l,u);for(i=0;i<l.length;i++){a=l[i];if(a.getId()!==e.getId()&&a.getSelected()){a.setProperty("selected",false,true);a.$().removeClass("sapUiCalendarAppSel");for(var i=0;i<this.aSelectedAppointments.length;i++){if(this.aSelectedAppointments[i]!==a.getId()){this.aSelectedAppointments.splice(i)}}n=a.$().attr("aria-labelledby");s=n?n.replace(p,""):"";a.$().attr("aria-labelledby",s)}}}o=e.$().attr("aria-labelledby")+" "+p;s=e.$().attr("aria-labelledby").replace(p,"").trim();if(e.getSelected()){e.setProperty("selected",false,true);e.$().removeClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",s);V(this,t)}else{e.setProperty("selected",true,true);e.$().addClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",o);V(this,t)}this._updateSelectedAppointmentsArray(e);if(e._aAppointments){for(i=0;i<e._aAppointments.length;i++){a=e._aAppointments[i];a.setProperty("selected",true,true);o=a.$().attr("aria-labelledby")+" "+p;a.$().attr("aria-labelledby",o)}this.fireSelect({appointments:e._aAppointments,multiSelect:!t,domRefId:e.getId()})}else{this.fireSelect({appointment:e,multiSelect:!t,domRefId:e.getId()})}}function R(e){var t=this._getPlanningCalendar();if(t){t["_onRow"+e]()}}T.prototype._getPlanningCalendar=function(){var e=this;while(e.getParent()!==null){if(e.getMetadata().getName()==="sap.m.PlanningCalendar"){return e}e=e.getParent()}};function V(e,t){if(t){R.call(e,"DeselectAppointment")}}function E(e){var t=this.getAggregation("groupAppointments",[]);var i;var a=false;for(var n=0;n<t.length;n++){var s=t[n]._aAppointments;for(var r=0;r<s.length;r++){if(s[r].getId()==e){i=t[n];a=true;break}}if(a){break}}return i}function F(e){if(this._sFocusedAppointmentId!=e){var t=this._getAppointmentsSorted();var i=this._aVisibleAppointments;var n;var s=0;n=E.call(this,e);if(n){e=n.getId();n=undefined}for(s=0;s<i.length;s++){if(i[s].appointment.getId()==e){n=i[s].appointment;break}}if(n){var r=this.getFocusedAppointment().$();var o=n.$();this._sFocusedAppointmentId=n.getId();r.attr("tabindex","-1");o.attr("tabindex","0");o.focus()}else{for(s=0;s<t.length;s++){if(t[s].getId()==e){n=t[s];break}}if(n){this._sFocusedAppointmentId=n.getId();var p=D.call(this,n.getStartDate());this.setStartDate(a._createLocalDate(p,true));if(!g(this.getDomRef(),document.activeElement)){setTimeout(function(){this.getFocusedAppointment().focus()}.bind(this),0)}this.fireStartDateChange()}}}}function L(e,t){var i=this._sFocusedAppointmentId;var a=this._getAppointmentsSorted();var n=this.getAggregation("groupAppointments",[]);var s;var r=0;var o=0;for(o=0;o<n.length;o++){if(n[o].getId()==i){var p=n[o]._aAppointments;if(e){i=p[p.length-1].getId()}else{i=p[0].getId()}break}}for(o=0;o<a.length;o++){if(a[o].getId()==i){r=o;break}}if(e){r=r+t}else{r=r-t}if(r<0){r=0}else if(r>=a.length){r=a.length-1}s=a[r];F.call(this,s.getId())}function z(e){var t=this._getAppointmentsSorted();var i;var s=new n(this._getStartDate());var r=new n(this._oUTCEndDate);var o=this.getIntervalType();var p;var l;s.setUTCHours(0);r.setUTCHours(0);r.setUTCMinutes(0);r.setUTCSeconds(0);switch(o){case v.Hour:r.setUTCDate(r.getUTCDate()+1);r.setUTCMilliseconds(-1);break;case v.Day:case v.Week:case v.OneMonth:s.setUTCDate(1);r.setUTCMonth(r.getUTCMonth()+1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;case v.Month:s.setUTCMonth(0);s.setUTCDate(1);r.setUTCFullYear(r.getUTCFullYear()+1);r.setUTCMonth(1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;default:throw new Error("Unknown IntervalType: "+o+"; "+this)}var u=a._createLocalDate(s,true);var g=a._createLocalDate(r,true);for(var h=0;h<t.length;h++){if(t[h].getStartDate()>=u&&t[h].getStartDate()<=g){i=t[h];p=i.getId();if(e.type=="saphome"){break}}else if(t[h].getStartDate()>g){break}}l=E.call(this,p);if(l){i=l;p=i.getId()}if(p&&p!=this._sFocusedAppointmentId){F.call(this,p)}else if(e._bPlanningCalendar&&i){i.focus()}else{this.fireLeaveRow({type:e.type})}}function P(e,t){var i=this.getIntervalType();var s=this._getStartDate();var r=new n(s.getTime());var o;var p=false;var l=0;var u=0;if(h(t).hasClass("sapUiCalendarRowAppsSubInt")){p=true;var g=h(h(t).parent()).children(".sapUiCalendarRowAppsSubInt");u=g.length;for(l=0;l<u;l++){var d=g[l];if(d==t){break}}}switch(i){case v.Hour:r.setUTCHours(r.getUTCHours()+e);if(p){r.setUTCMinutes(r.getUTCMinutes()+l*60/u);o=new n(r.getTime());o.setUTCMinutes(o.getUTCMinutes()+60/u)}else{o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+1)}break;case v.Day:case v.Week:case v.OneMonth:r.setUTCDate(r.getUTCDate()+e);if(p){r.setUTCHours(r.getUTCHours()+l*24/u);o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+24/u)}else{o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}break;case v.Month:r.setUTCMonth(r.getUTCMonth()+e);if(p){r.setUTCDate(r.getUTCDate()+l);o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}else{o=new n(r.getTime());o.setUTCMonth(o.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this)}o.setUTCMilliseconds(o.getUTCMilliseconds()-1);r=a._createLocalDate(r,true);o=a._createLocalDate(o,true);this.fireIntervalSelect({startDate:r,endDate:o,subInterval:p})}function $(e,t){var i=e.getStartDate()-t.getStartDate();if(i==0){i=t.getEndDate()-e.getEndDate()}return i}return T});