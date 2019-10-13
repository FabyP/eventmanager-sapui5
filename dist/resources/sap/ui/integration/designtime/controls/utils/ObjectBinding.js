/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/base/BindingParser"],function(i,n){"use strict";return i.extend("sap.ui.integration.designtime.controls.utils.ObjectBinding",{constructor:function(i,t,e){this._aBindings=[];var s=function(i,n,e){i[n]=e.getValue();t.checkUpdate()};var a=function(i){Object.keys(i).forEach(function(c){if(typeof i[c]==="string"){var o=n.simpleParser(i[c]);if(o&&o.model===e){var r=t.bindProperty(o.path);s(i,c,r);r.attachChange(function(n){s(i,c,r)});this._aBindings.push(r)}}else if(i[c]&&typeof i[c]==="object"){a(i[c])}}.bind(this))}.bind(this);a(i)},exit:function(){this._aBindings.forEach(function(i){i.destroy()})}})});