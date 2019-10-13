/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel"],function(t,e){"use strict";var i=t.extend("sap.ui.integration.WidgetComponent");i.prototype.init=function(){var e=t.prototype.init.apply(this,arguments);this._applyWidgetModel();return e};i.prototype._applyWidgetModel=function(){var t=new e;t.setData(this.getManifestEntry("sap.widget")||{});this.setModel(t,"sap.widget")};i.prototype.fireAction=function(t){this.oContainer.getParent().fireAction(t)};i.prototype.getWidgetConfiguration=function(t){return this.getModel("sap.widget").getProperty(t||"/")};i.prototype.update=function(){};return i});