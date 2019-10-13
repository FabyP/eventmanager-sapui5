sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
   "use strict";
   return Controller.extend("ba.eventmanager-openui5.controller.Home", {
     
     onInit: function(){
     		var cardManifests = new JSONModel("./model/cardManifests.json");
     	//	cardManifests.loadData(sap.ui.require.toUrl("ba.eventmanager-openui5/model/cardManifests.json"));
     	
     		this.getView().setModel(cardManifests, "manifests");
/*     		debugger;
     		if(!this.getView().getModel("events")){
     		var eventsList = new JSONModel("./model/events.json");
			this.getView().setModel(eventsList, "events");
     		}*/
		
     }
     
   });
});