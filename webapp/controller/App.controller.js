sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("ba.eventmanager-openui5.controller.App", {
		onExit: function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},

		onProfileClicked: function (oEvent) {
			var oButton = oEvent.getSource();

			// create popover
			if (!this._oPopover) {
				Fragment.load({
					name: "ba.eventmanager-openui5.view.Popover",
					controller: this
				}).then(function (pPopover) {
					this._oPopover = pPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopover.openBy(oButton);
			}
		},
		onThemeSwitchPressed: function (oControlEvent) {
			var state = oControlEvent.getParameters().state;
			if (state === true) {
				sap.ui.getCore().applyTheme("sap_belize_hcb");
			} else {
				sap.ui.getCore().applyTheme("sap_fiori_3");
			}
		}
	});
});