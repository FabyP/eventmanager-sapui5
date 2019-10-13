/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/base/Log","sap/base/assert"],function(t,e,s){"use strict";var a={},n={},r=t.extend("sap.ui.core._StashedControl",{constructor:function(e,s){t.apply(this,arguments);s.stashed=true;Object.assign(this,s);this._stash(s.sParentId,s.sParentAggregationName);return this},metadata:{specialSettings:{stashed:{type:"boolean",visibility:"hidden"},sParentId:{type:"string",visibility:"hidden"},sParentAggregationName:{type:"string",visibility:"hidden"},fnCreate:{type:"function",visibility:"hidden"}}}});r.prototype.setParent=function(){e.error("Cannot set parent on a StashedControl",this.getId())};r.prototype.clone=function(){e.error("Cannot clone a StashedControl",this.getId())};r.prototype.destroy=function(){delete n[this.getId()];t.prototype.destroy.apply(this,arguments)};o(r,true);a.mixInto=function(t,e){s(!t.getMetadata().hasProperty("stashed"),"StashedControlSupport: fnClass already has property 'stashed', sideeffects possible",t.getMetadata().getName());s(!t.prototype.setStashed,"StashedControlSupport: fnClass already has method 'setStashed', sideeffects possible",t.getMetadata().getName());o(t,e)};function o(t,s){t.getMetadata().addSpecialSetting("stashed",{type:"boolean",defaultValue:!!s});t.prototype.setStashed=function(t){if(this.stashed===true&&!t){if(this.sParentId){var s=i(this,sap.ui.getCore().byId(this.sParentId));s.stashed=false;return}}else if(t){e.warning("Cannot re-stash a control",this.getId())}};t.prototype.getStashed=function(){return this.stashed};var a=t.prototype.destroy;t.prototype.destroy=function(){delete n[this.getId()];a.apply(this,arguments)};t.prototype._stash=function(t,e){this.sParentId=t;this.sParentAggregationName=e;n[this.getId()]=this}}function i(t,e){if(t instanceof r){var s,a,o,i=t.fnCreate,d=t.sParentAggregationName;t.destroy();a=sap.ui.require("sap/ui/core/Component");o=a&&a.getOwnerComponentFor(e);if(o){s=o.runAsOwner(i)}else{s=i()}s.forEach(function(t){e.getMetadata().getAggregation(d).add(e,t)})}delete n[t.getId()];return t}function d(t,e){var s=[];for(var a in n){var r=t?n[a]:n[a].getId();if(!e||n[a].sParentId===e){s.push(r)}}return s}a.getStashedControlIds=function(t){return d(false,t)};a.getStashedControls=function(t){return d(true,t)};a.createStashedControl=function(t,s){if(!s.sParentId){e.error("Cannot create a StashedControl without a parent with stable ID.","sap.ui.core.StashedControlSupport")}else{return new r(t,s)}};return a});