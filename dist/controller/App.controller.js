sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment"],function(e,o){"use strict";return e.extend("ba.eventmanager-openui5.controller.App",{onExit:function(){if(this._oPopover){this._oPopover.destroy()}},onProfileClicked:function(e){var t=e.getSource();if(!this._oPopover){o.load({name:"ba.eventmanager-openui5.view.Popover",controller:this}).then(function(e){this._oPopover=e;this.getView().addDependent(this._oPopover);this._oPopover.openBy(t)}.bind(this))}else{this._oPopover.openBy(t)}},onThemeSwitchPressed:function(e){var o=e.getParameters().state;if(o===true){sap.ui.getCore().applyTheme("sap_belize_hcb")}else{sap.ui.getCore().applyTheme("sap_fiori_3")}}})});