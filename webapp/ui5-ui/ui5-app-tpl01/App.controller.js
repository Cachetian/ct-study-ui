sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("com.cachetian.ui5app.App", {
		_bNavgating: false,

		onInit : function () {
			jQuery.sap.require("sap.m.MessageBox");
			// set data model on view
			var oData = {
				recipient : {
					name : "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},

		onPress_Add : function () {
			var target = this.oView.getContent()[0].getPages()[1];
			this.oView.getContent()[0].to(target);
		},

		onPress_Save : function () {
			sap.m.MessageToast.show("Saved!");
		},

		onPress_NavBack: function(){
			if (this._bNavgating){
				return;
			}
			this._bNavgating = true;
			this.oView.getContent()[0].back();
		},

		onAfterNavigate: function(){
			this._bNavgating = false;
		}
	});

});
