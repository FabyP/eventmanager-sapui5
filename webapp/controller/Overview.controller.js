sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/ui/core/Fragment"

], function (Controller, JSONModel, Filter, FilterOperator, Sorter, Fragment) {
	"use strict";

	return Controller.extend("ba.eventmanager-openui5.controller.Overview", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ba.eventmanager-openui5.view.Overview
		 */
		onInit: function () {
			var eventsList = this.getOwnerComponent().getModel("eventData");
			//Promise for asynchronous Loading of Data from JSON Model
			eventsList.dataLoaded().then(
				this.onJSONDataLoaded.bind(this)
			);
			this.getView().setModel(eventsList, "events");
		},

		onJSONDataLoaded: function () {

			var viewModel = new JSONModel();
			this.getView().setModel(viewModel, "viewModel");
			this.getView().getModel("viewModel").setProperty("/allEventsCount", this.getView().getModel("events").getData().Events.length);
			this.getView().getModel("viewModel").setProperty("/partyCount", this.filterPartyEvents(this.getView().getModel("events").getData().Events)
				.length);
			this.getView().getModel("viewModel").setProperty("/familyCount", this.filterFamilyEvents(this.getView().getModel("events").getData()
				.Events).length);
			this.getView().getModel("viewModel").setProperty("/marketCount", this.filterMarketEvents(this.getView().getModel("events").getData()
				.Events).length);
			this.getView().getModel("viewModel").setProperty("/otherCount", this.filterOtherEvents(this.getView().getModel("events").getData().Events)
				.length);

		},
		onAfterRendering: function () {
			setTimeout(function () {
				this.getView().byId("idIconTabBarNoIcons").getItems()[0].$().addClass("sapMITBSelected");
			}.bind(this), 0);
		},

		filterPartyEvents: function (items) {
			return items.filter(event => (event.category === "Party"));
		},
		filterFamilyEvents: function (items) {
			return items.filter(event => (event.category === "Familie"));
		},
		filterMarketEvents: function (items) {
			return items.filter(event => (event.category === "Markt"));
		},
		filterOtherEvents: function (items) {
			return items.filter(event => (event.category === "Sonstiges"));
		},

		categorySelect: function (event) {

			var selectedKey = event.getParameter("key");
			if (selectedKey === "All") {
				this.getView().byId("eventsTable").getBinding("items").filter([]);

			} else {
				var filter = new sap.ui.model.Filter("category", FilterOperator.Contains, selectedKey);
				this.getView().byId("eventsTable").getBinding("items").filter([filter]);
			}
			sap.ui.getCore().byId(event.getParameter("id")).$().removeClass("sapMITBSelected");
			event.getParameter("selectedItem").$().addClass("sapMITBSelected");

		},

		onFilterEvents: function (oEvent) {

			// build filter array
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				aFilters.push(new Filter("name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("eventsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters);
		},

		toDate: function (dateString) {
			var dmy = dateString.split(".");

			var date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
			return date;
		},

		onSortDesc: function (oEvent) {
			var aSorters = [];
			var sPath = "date";
			var bDescending = true;
			var vGroup = false;

			var fnComparator = function (a, b) {

				var aDate = this.toDate(a);
				var bDate = this.toDate(b);

				if (bDate == null) {
					return -1;
				}
				if (aDate == null) {
					return 1;
				}
				if (aDate < bDate) {
					return -1;
				}
				if (aDate > bDate) {
					return 1;
				}
				return 0;
			}.bind(this);
			aSorters.push(new Sorter(sPath, bDescending, vGroup, fnComparator));
			this.getView().byId("eventsTable").getBinding("items").sort(aSorters);

		},
		onSortAsc: function (oEvent) {
			var aSorters = [];
			var sPath = "date";
			var bDescending = false;
			var vGroup = false;

			var fnComparator = function (a, b) {

				var aDate = this.toDate(a);
				var bDate = this.toDate(b);

				if (bDate == null) {
					return -1;
				}
				if (aDate == null) {
					return 1;
				}
				if (aDate < bDate) {
					return -1;
				}
				if (aDate > bDate) {
					return 1;
				}
				return 0;
			}.bind(this);
			aSorters.push(new Sorter(sPath, bDescending, vGroup, fnComparator));
			this.getView().byId("eventsTable").getBinding("items").sort(aSorters);

		},

		goToDetail: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var sNavPathKey = oItem.getBindingContextPath().split("/")[2];
			oRouter.navTo("Detail", {
				eventKey: sNavPathKey
			});
		},

		onAdd: function () {
			// this._getDialog().open();
			this._getDialog();
		},

		_getDialog: function () {
			// if (!this._oDialog) {
			// 	this._oDialog = sap.ui.xmlfragment("ba.eventmanager-openui5.view.AddEventDialog");
			// 	this.getView().addDependent(this._oDialog);
			// }
			// return this._oDialog;

			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("addEventDialog")) {
				// load asynchronous XML fragment

				Fragment.load({
					id: oView.getId(),
					name: "ba.eventmanager-openui5.view.AddEventDialog",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("addEventDialog").open();
			}
		},

		onClose: function () {
			this.byId("addEventDialog").close();
		},

		onCreateEvent: function () {
			var oView = this.getView();
			var oModel = oView.getModel("eventData");

			var name = oView.byId("nameInput").getValue();

			var date = oView.byId("dateInput").getValue();

			var time = oView.byId("timeInput").getValue();

			var location = oView.byId("locationInput").getValue();

			var description = oView.byId("descriptionInput").getValue();

			var category = oView.byId("categoryInput").getSelectedItem().getText();

			var img = oView.byId("imgInput").getValue();

			var alt = oView.byId("altInput").getValue();

			var host = oView.byId("hostInput").getValue();
			

			oModel.setData({
				"Events": [{

					name: name,
					date: date,
					time: time,
					location: location,
					img: img,
					alt: alt,
					description: description,
					host: host,
					category: category
		
				}]
			}, true);
			oView.byId("addEventDialog").close();
		},

		onMyPress: function () {

			alert("okay");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ba.eventmanager-openui5.view.Overview
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ba.eventmanager-openui5.view.Overview
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ba.eventmanager-openui5.view.Overview
		 */
		//	onExit: function() {
		//
		//	}

	});

});