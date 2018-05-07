'use strict';

app.editTransactions = kendo.observable({
    onShow: function () {
        console.log("edittransactions");
        kendo.bind(this.element[0], app['editTransactions'].strings['editTransactions'])

        if (app.editTransactions.mode == "insert") {
            $(".add-new-trans").show();
            $(".update-trans").hide();

kendo.bind($("#transEditForm"), app.editTransactions.transData )
        }

        if (app.editTransactions.mode == "edit") {
            $(".add-new-trans").hide();
            $(".update-trans").show();
            kendo.bind($("#transEditForm"), app.editTransactions.editItem)
        }
        app.editTransactions.setupEvents();

      
    },
    afterShow: function () {
       
  
    },
    addNewTrans: function () {

    },
    transData: {
        uid:localStorage.uid,
        amount: 0,
        locale: "",
        transDate: new Date(),
        category: "",
       
    },
    emptyTransData: {
        uid: localStorage.uid,
        amount: 0,
        locale: "",
        transDate: new Date(),
        category: "",

    },
    mode:"insert",
   editItem:null,
    setupEvents: function () {

        $(".add-new-trans").off();
        $(".add-new-trans").on("click", function () {
            console.log("add new")
            app.dsTrans.add(app.editTransactions.transData);
            app.dsTrans.sync();
            app.editTransactions.transData = app.editTransactions.emptyTransData;
           
            app.mobileApp.navigate("components/transactions/view.html"); 

        })

        $(".update-trans").off();
        $(".update-trans").on("click", function () {
            console.log("update")
            app.mobileApp.pane.loader.show();
            app.dsTrans.sync();
            app.mobileApp.navigate("components/transactions/view.html");

        });


        $(".delete-trans-item").off();
        $(".delete-trans-item").on("click", function () {
            console.log("delete")
            app.mobileApp.pane.loader.show();
            app.dsTrans.remove(app.editTransactions.editItem);
            app.dsTrans.sync();
            app.mobileApp.navigate("components/transactions/view.html");

        })

        $(".get-receipt").off();
        $(".get-receipt").on("click", function () {
            app.editTransactions.getReceipt()

        })
   },
    getReceipt: function () {

        console.log("get receipt");
        alert("start camera")
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
            alert(image.src)
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
   
});
app.localization.registerView('editTransactions');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home