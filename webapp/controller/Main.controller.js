sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, MessageToast,JSONModel, Filter, FilterOperator) => {
    "use strict";

     const App =  Controller.extend("appat.controller.Main", {
        onInit(){
         const viewModel = new JSONModel({
         currency: "EUR"
         });
         this.getView()?.setModel(viewModel, "view");

          var oSelectedModel = new JSONModel({});
          this.getView().setModel(oSelectedModel, "selected");

          var oModel = this.getOwnerComponent().getModel("emp");
          console.log(oModel);


        },
    onFilterInvoices(event) {
    // build filter array
      const filter = [];
      const query = event.getParameter("query");
      if (query) {
        filter.push(new Filter("Name", FilterOperator.Contains, query));
      }
    // filter binding
      const list = this.byId("ListId");
      const binding = list?.getBinding("items");
      binding?.filter(filter);
    },
    onPress() {
       
       var oList = this.byId("ListId");

       var oSelectedItem = oList.getSelectedItem();
           if (oSelectedItem) {
        // 3. Get the binding context (data path and model info)
        var oContext = oSelectedItem.getBindingContext("emp");

        var oData = oContext.getObject();

        this.getView()
                .getModel("selected")
                .setData(oData);
           
    } else
       {
        sap.m.MessageToast.show("Please select an item first!");
    }
      }
      
    });
});

     