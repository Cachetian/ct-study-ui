sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "../model/formatter"
], function(Controller, MessageBox, formatter) {
  "use strict";

  return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

    formatter: formatter,

    onInit: function() {
      sap.ui.getCore().getEventBus().subscribe("chanel1", "event1", this.onEvent1, this);
    },

    onConfirm: function() {
      this._confirm("Are you sure?").then(function() {
        sap.m.MessageToast.show("Yes");
      }).catch(function() {
        sap.m.MessageToast.show("No");
      });
    },

    onPublish: function(oEvent) {
      sap.ui.getCore().getEventBus().publish("chanel1", "event1", {
        param1: "value1"
      });
    },

    onEvent1: function(param) {
      sap.m.MessageToast.show("param:" + param);
    },

    //
    // Internal Functions
    //

    _confirm: function(sMsg) {
      return new Promise(function(resolve, reject) {
        var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
        MessageBox.confirm(
          sMsg, {
            styleClass: bCompact ? "sapUiSizeCompact" : "",
            onClose: function(sAction) {
              if (sAction === MessageBox.Action.OK) {
                resolve();
              } else {
                reject();
              }
            }
          }
        );
      }.bind(this));
    }
  });
});
