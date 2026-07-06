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

    onCreate(){
           var oModel = this.getView().getModel("emp");

    var oEntry = {
        EmployeeId: this.byId("empId").getValue(),
        Name: this.byId("name").getValue(),
        City: this.byId("city").getValue(),
        CompanyName: this.byId("company").getValue(),
        Dept: this.byId("dept").getValue(),
        StartDate: new Date(this.byId("startdate").getValue()),
        EndDate: new Date(this.byId("enddate").getValue()),
        Salary: this.byId("salary").getValue(),
        Currency: this.byId("currency").getValue()
        };

        oModel.create("/EmployeeSet", oEntry, {
        success: function () {
            sap.m.MessageToast.show("Employee Created");
            this.byId("ListId").getBinding("items").refresh();
        }.bind(this),
        error: function () {
            sap.m.MessageBox.error("Creation Failed");
        }
    });
    },
    onUpdate(){
      var oModel = this.getView().getModel("emp");
      var sEmpId = this.byId("empId").getValue();
        var oEntry = {
        EmployeeId: sEmpId,
        Name: this.byId("name").getValue(),
        City: this.byId("city").getValue(),
        CompanyName: this.byId("company").getValue(),
        Dept: this.byId("dept").getValue(),
        StartDate: new Date(this.byId("startdate").getValue()),
        EndDate: new Date(this.byId("enddate").getValue()),
        Salary: this.byId("salary").getValue(),
        Currency: this.byId("currency").getValue()
    };
    var sPath = "/EmployeeSet(" + sEmpId + ")";
    oModel.update(sPath, oEntry, {
        success: function () {
            sap.m.MessageToast.show("Employee Updated");
            this.byId("ListId").getBinding("items").refresh();
        },
        error: function () {
            sap.m.MessageBox.error("Update Failed");
        }
    });
    },

    onDelete(){
       var oList = this.byId("ListId");
       var oSelectedItem = oList.getSelectedItem();
           if (!oSelectedItem) {
        sap.m.MessageToast.show("Select Employee");
        return;
    }
    var sEmployeeId = oSelectedItem.getBindingContext("emp").getProperty("EmployeeId");
    var oModel = this.getView().getModel("emp");
    var sPath = "/EmployeeSet(" + sEmployeeId + ")";

     oModel.remove(sPath, {
        success: function () {
            sap.m.MessageToast.show("Employee Deleted");
            this.byId("ListId").getBinding("items").refresh();
        }.bind(this),
        error: function () {
            sap.m.MessageBox.error("Delete Failed");
        }
    });
    },

    onRead() {
       
       var oList = this.byId("ListId");

       var oSelectedItem = oList.getSelectedItem();
           if (oSelectedItem) {
        // 3. Get the binding context (data path and model info)
        var oContext = oSelectedItem.getBindingContext("emp");

        var oData = oContext.getObject();

      this.byId("empId").setValue(oData.EmployeeId);
      this.byId("name").setValue(oData.Name);
      this.byId("city").setValue(oData.City);
      this.byId("company").setValue(oData.CompanyName);
      this.byId("dept").setValue(oData.Dept);
      this.byId("startdate").setValue(oData.StartDate);
      this.byId("enddate").setValue(oData.EndDate);
      this.byId("salary").setValue(oData.Salary);
      this.byId("currency").setValue(oData.Currency);
           
    } else
       {
        sap.m.MessageToast.show("Please select an item first!");
    }
      }
      
    });
});

     