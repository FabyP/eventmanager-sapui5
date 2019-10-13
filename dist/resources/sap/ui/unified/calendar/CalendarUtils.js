/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","./CalendarDate","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/thirdparty/jquery"],function(e,t,a,n,r){"use strict";var i={};i.MAX_MILLISECONDS=864e13;i.HOURS24=1e3*3600*24;i._createLocalDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate());if(r.getFullYear()<1e3){n.setFullYear(r.getFullYear())}if(a){n.setHours(r.getUTCHours());n.setMinutes(r.getUTCMinutes());n.setSeconds(r.getUTCSeconds());n.setMilliseconds(r.getUTCMilliseconds())}}return n};i._createUTCDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()));if(r.getFullYear()<1e3){n.setUTCFullYear(r.getFullYear())}if(a){n.setUTCHours(r.getHours());n.setUTCMinutes(r.getMinutes());n.setUTCSeconds(r.getSeconds());n.setUTCMilliseconds(r.getMilliseconds())}}return n};i._createUniversalUTCDate=function(t,a,n){var r;if(a){r=e.getInstance(this._createUTCDate(t,n),a)}else{r=new e(this._createUTCDate(t,n).getTime())}return r};i.calculateWeekNumber=function(t,n,r,i){var s=0;var u=0;var g=i.getFirstDayOfWeek();var o=new a(r);if(o&&(o.getLanguage()=="en"&&o.getRegion()=="US")){var c=new e(t.getTime());c.setUTCFullYear(n,0,1);u=c.getUTCDay();var l=new e(t.getTime());l.setUTCDate(l.getUTCDate()-l.getUTCDay()+u);s=Math.round((l.getTime()-c.getTime())/864e5/7)+1}else{var C=new e(t.getTime());C.setUTCDate(C.getUTCDate()-g);u=C.getUTCDay();C.setUTCDate(C.getUTCDate()-u+4);var D=new e(C.getTime());D.setUTCMonth(0,1);u=D.getUTCDay();var T=0;if(u>4){T=7}var f=new e(D.getTime());f.setUTCDate(1-u+4+T);s=Math.round((C.getTime()-f.getTime())/864e5/7)+1}return s};i.getFirstDateOfWeek=function(t){var a=new e(t.getTime()),r,i,s=n.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),u=s.getFirstDayOfWeek(),g;g=e.getWeekByDate(a.getCalendarType(),a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());r=e.getFirstDateOfWeek(a.getCalendarType(),g.year,g.week);i=new e(e.UTC(r.year,r.month,r.day));while(i.getUTCDay()!==u){i.setUTCDate(i.getUTCDate()-1)}return new e(e.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())).getJSDate()};i.getFirstDateOfMonth=function(t){var a=new e(t.getTime());a.setUTCDate(1);return a};i._getNumberOfWeeksForYear=function(e){var t=sap.ui.getCore().getConfiguration().getFormatLocale(),r=n.getInstance(new a(t)),i=new Date(Date.UTC(e,0,1)),s=i.getUTCDay(),u=52;if(r.getFirstDayOfWeek()===0){if(s===5||s===6){u=53}}else{if(s===3||s===4){u=53}}return u};i.monthsDiffer=function(e,t){return e.getMonth()!==t.getMonth()||e.getFullYear()!==t.getFullYear()};i.isDateLastInMonth=function(e){var t=new Date(e.getTime()+24*60*60*1e3);return t.getUTCDate()<e.getUTCDate()};i._updateUTCDate=function(e,t,a,n,i,s,u,g){if(r.isNumeric(t)){e.setUTCFullYear(t)}if(r.isNumeric(a)){e.setUTCMonth(a)}if(r.isNumeric(n)){e.setUTCDate(n)}if(r.isNumeric(i)){e.setUTCHours(i)}if(r.isNumeric(s)){e.setUTCMinutes(s)}if(r.isNumeric(u)){e.setUTCSeconds(u)}if(r.isNumeric(g)){e.setUTCMilliseconds(g)}};i._checkJSDateObject=function(e){if(r.type(e)!=="date"){throw new Error("Date must be a JavaScript date object.")}};i._checkYearInValidRange=function(e){if(!r.isNumeric(e)||(e<1||e>9999)){throw new Error("Year must be in valid range (between year 0001 and year 9999).")}};i._isNextMonth=function(e,t){return e.getMonth()>t.getMonth()&&e.getFullYear()===t.getFullYear()||e.getFullYear()>t.getFullYear()};i._daysInMonth=function(e){this._checkCalendarDate(e);e=new t(e);e.setDate(1);e.setMonth(e.getMonth()+1);e.setDate(0);return e.getDate()};i._isLastDateInMonth=function(e){return e.getDate()===i._daysInMonth(e)};i._getFirstDateOfWeek=function(e){this._checkCalendarDate(e);var a=i.getFirstDateOfWeek(e.toUTCJSDate());a.setFullYear(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());return t.fromLocalJSDate(a,e.getCalendarType())};i._getFirstDateOfMonth=function(e){this._checkCalendarDate(e);var a=i.getFirstDateOfMonth(e.toUTCJSDate()).getJSDate();a.setFullYear(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());return t.fromLocalJSDate(a,e.getCalendarType())};i._minDate=function(e){return new t(1,0,1,e)};i._maxDate=function(e){var a=new t(9999,11,1,e);a.setDate(this._daysInMonth(a));return new t(a)};i._isBetween=function(e,t,a,n){this._checkCalendarDate(e);this._checkCalendarDate(t);this._checkCalendarDate(a);if(n){return e.isSameOrAfter(t)&&e.isSameOrBefore(a)}else{return e.isAfter(t)&&e.isBefore(a)}};i._daysBetween=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return Math.ceil((e.valueOf()-t.valueOf())/this.HOURS24)};i._isOutside=function(e,t,a){return!this._isBetween(e,t,a,true)};i._isSameMonthAndYear=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return e.getEra()===t.getEra()&&e.getYear()===t.getYear()&&e.getMonth()===t.getMonth()};i._checkCalendarDate=function(e){if(!e||!(e instanceof t)){throw"Invalid calendar date: ["+e+"]. Expected: sap.ui.unified.calendar.CalendarDate"}};i._getWeek=function(t){this._checkCalendarDate(t);return e.getWeekByDate(t.getCalendarType(),t.getYear(),t.getMonth(),t.getDate())};i._areCurrentMinutesLessThan=function(e){var t=(new Date).getMinutes();return e>=t};i._areCurrentMinutesMoreThan=function(e){var t=(new Date).getMinutes();return e<=t};i._minutesBetween=function(e,t){var a=(t.getTime()-e.getTime())/1e3;a=a/60;return Math.abs(Math.round(a))};i._isWeekend=function(e,t){var a=e.getDay();return a===t.getWeekendStart()||a===t.getWeekendEnd()};return i},true);