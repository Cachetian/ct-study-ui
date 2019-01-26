sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "../model/formatter"
], function(Controller, MessageBox, formatter) {
  "use strict";

  return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

    formatter: formatter,

    onInit: function() {

    },

    onConfirm: function() {
      this._confirm("Are you sure?").then(function() {
        sap.m.MessageToast.show("Yes");
      }).catch(function() {
        sap.m.MessageToast.show("No");
      });
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
