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
      var that = this;

      var oLink = new sap.m.Link({
        text: "Show more information",
        href: "http://sap.com",
        target: "_blank"
      });

      var oMessageTemplate = new sap.m.MessageItem({
        type: '{type}',
        title: '{title}',
        description: '{description}',
        subtitle: '{subtitle}',
        counter: '{counter}',
        markupDescription: '{markupDescription}',
        link: oLink
      });

      var aMockMessages = [{
        type: 'Error',
        title: 'Error message',
        description: 'First Error message description. \n' +
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        subtitle: 'Example of subtitle',
        counter: 1
      }, {
        type: 'Warning',
        title: 'Warning without description',
        description: ''
      }, {
        type: 'Success',
        title: 'Success message',
        description: 'First Success message description',
        subtitle: 'Example of subtitle',
        counter: 1
      }, {
        type: 'Error',
        title: 'Error message',
        description: 'Second Error message description',
        subtitle: 'Example of subtitle',
        counter: 2
      }, {
        type: 'Information',
        title: 'Information message',
        description: 'First Information message description',
        subtitle: 'Example of subtitle',
        counter: 1
      }];

      var oModel = new sap.ui.model.json.JSONModel();

      oModel.setData(aMockMessages);

      this.oMessageView = new sap.m.MessageView({
        showDetailsPageHeader: false,
        itemSelect: function() {
          oBackButton.setVisible(true);
        },
        items: {
          path: "/",
          template: oMessageTemplate
        }
      });

      var oBackButton = new sap.m.Button({
        icon: sap.ui.core.IconPool.getIconURI("nav-back"),
        visible: false,
        press: function() {
          that.oMessageView.navigateBack();
          this.setVisible(false);
        }
      });



      this.oMessageView.setModel(oModel);

      this.oDialog = new sap.m.Dialog({
        resizable: true,
        content: this.oMessageView,
        state: 'Error',
        beginButton: new sap.m.Button({
          press: function() {
            this.getParent().close();
          },
          text: "Close"
        }),
        customHeader: new sap.m.Bar({
          contentMiddle: [
            new sap.m.Text({
              text: "Error"
            })
          ],
          contentLeft: [oBackButton]
        }),
        contentHeight: "300px",
        contentWidth: "500px",
        verticalScrolling: false
      });
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

    onMessageDialog: function() {
      this.oDialog.open();
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
