sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent"],function(e,t){"use strict";return e.extend("ba.eventmanager-openui5.controller.Detail",{onInit:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("Detail").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(e){this.getView().bindElement({path:"/Events/"+e.getParameter("arguments").eventKey,model:"eventData"})}})});