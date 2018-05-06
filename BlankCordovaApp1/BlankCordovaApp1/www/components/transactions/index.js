'use strict';

app.transactions = kendo.observable({
    element:null,
    onShow: function () {
        console.log("transactions");
        var self = app.transactions;
        console.log(this);
        app.transactions.element = this.element[0];
        //kendo.bind(this.element[0], app['transactions'].strings['transactions'])
        self.bindingValues = app['transactions'].strings['transactions'];
        
        app.editTransactions.editItem = null;
        self.setupEvents();

      
    },
    afterShow: function () {
        //console.log(app.dsTrans.aggregates().amount.sum);
        //console.log(app.dsTrans.aggregates());
        //console.log(app.dsTrans.aggregates().amount.count);
      
  
    },
    bindingValues:null,
    addNewTrans: function () {

    },
    openTransEditForm: function () {
        console.log("open edit")
        app.editTransactions.mode = "insert";
        app.mobileApp.navigate("components/editTransactions/view.html"); 

    },
    transListClick: function (e) {
       
        console.log(e.dataItem);
        app.editTransactions.editItem = e.dataItem;
        app.editTransactions.mode = "edit";
        app.mobileApp.navigate("components/editTransactions/view.html"); 
    },
    transListAdd: function (e) {
        var self = app.transactions;
        self.openTransEditForm();
    },
    setupEvents: function () {
        var self = app.transactions;

// $("#transactionsScreen .add-item").on("click", function () {

        //$("#transactionsScreen .add-item").kendoTouch({
        //    tap: function () {
        //        console.log("start edit")
        //        self.openTransEditForm();
        //    }
        //})


       

        app.dsTrans.bind("change", function (e) {
            app.mobileApp.pane.loader.hide();
           
            self.bindingValues.totalTrans = kendo.format("{0:n2}", parseFloat(app.dsTrans.aggregates().amount.sum));
            kendo.bind(app.transactions.element, self.bindingValues);
          
        })

        events.subscribe("createCompleted", function (data) {
            console.log(data.tbl);
            app.dsTrans.read();
            
        })

    }
});
app.localization.registerView('transactions');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home