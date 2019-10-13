/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/m/library","sap/f/library"],function(i){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.integration",version:"1.70.0",dependencies:["sap.ui.core","sap.f","sap.m"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.Widget","sap.ui.integration.host.HostConfiguration"],elements:[],noLibraryCSS:true,customTags:{card:"sap/ui/integration/widgets/Card",widget:"sap/ui/integration/Widget","host-configuration":"sap/ui/integration/host/HostConfiguration"},defaultTagPrefix:"ui"});var a=sap.ui.integration;a.CardActionType={Navigation:"Navigation"};a.CardDataMode={Active:"Active",Inactive:"Inactive"};return a});