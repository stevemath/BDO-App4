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
        $(".get-receipt").on("click", function (e) {
            e.preventDefault();
            app.editTransactions.getReceipt()

        })


        $(".get-file").on("click", function () {
           

        })
   },
    getSASToken: function (imguri) {

        const account = {
            name: "bdoauth8fdb",
            // name:"dgpo7itjj6n3yazfunctions",
            // sas: "?sv=2017-07-29&ss=bfqt&srt=sco&sp=rwdlacup&se=2018-04-21T22:56:20Z&st=2018-04-18T14:56:20Z&spr=https,http&sig=NS%2Bj9Xev22DhVAjg%2BCzYAUARAOKghqTmhAUJ2F71qU8%3D"
        };

        var uData = { container: "testcontainer" }
        var blobUri = 'https://' + account.name + '.blob.core.windows.net';
        var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, account.sas);
        $.ajax({
            method: "POST",
            url: "https://sastokens.azurewebsites.net/api/GetSasToken-Node?container=testcontainer&permissions=racwdl&code=jhpPaK9UBDOOJmOPDDwa6kvaw3X05YObhCOi8qJfJV95N8mhVlPwVA==",
            data: JSON.stringify(uData),
            success: function (data) {
                console.log(data);
                blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, "?" + data.token);


              
                alert("got img");
               // alert(imguri)
                //createNewFileEntry(imguri)

              //  getFileEntry(imguri);

                function getFileEntry(imgUri) {
                    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

                        // Do something with the FileEntry object, like write to it, upload it, etc.
                        // writeFile(fileEntry, imgUri);
                        alert("got file")
                        console.log("got file: " + fileEntry.fullPath);
                        // displayFileData(fileEntry.nativeURL, "Native URL");

                        blobService.createBlockBlobFromBrowserFile('testcontainer',
                            "test4.jpg",
                            fileEntry,
                            // { contentSettings: { contentType: "image/jpeg" } },
                            (error, result) => {
                                if (error) {
                                    console.log(error)
                                    // Handle blob error
                                    alert(error)
                                } else {
                                    console.log('Upload is successful');
                                    alert("uploaded")
                                }
                            });

                    }, function () {
                        // If don't get the FileEntry (which may happen when testing
                        // on some emulators), copy to a new FileEntry.
                        createNewFileEntry(imgUri);
                    });
                }

                function dataURItoBlob(dataURI) {
                    // convert base64 to raw binary data held in a string
                    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
                    var byteString = atob(dataURI.split(',')[1]);

                    // separate out the mime component
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

                    // write the bytes of the string to an ArrayBuffer
                    var ab = new ArrayBuffer(byteString.length);

                    // create a view into the buffer
                    var ia = new Uint8Array(ab);

                    // set the bytes of the buffer to the correct values
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }

                    // write the ArrayBuffer to a blob, and you're done
                    var blob = new Blob([ab], { type: mimeString });
                    return blob;
                   // return ab
                }

               


                imguri = "data:image/jpeg;base64," + imguri;
                var blobimg = dataURItoBlob(imguri);
                var fileName = "test13.jpg"
                console.log(blobimg)
               var  uploadURI = blobUri + "/" + uData.container + "/" + fileName + "?" + data.token
              
               
               var xhr = new XMLHttpRequest();
               xhr.onerror = function (err) { console.log(err)};
               xhr.onloadend = function () {console.log("img upload complete - xhr") };
               xhr.open("PUT", uploadURI);
               xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
               xhr.setRequestHeader('x-ms-blob-content-type', 'image/jpeg');
               xhr.send(blobimg);


                function createNewFileEntry(imgUri) {
                    alert("create file entry")
                    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
                        console.log("resolved");
                        alert("resolved")
                        // JPEG file
                        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

                            // Do something with it, like write to it, upload it, etc.
                            // writeFile(fileEntry, imgUri);
                            console.log("got file: " + fileEntry.fullPath);
                            // displayFileData(fileEntry.fullPath, "File copied to");

                             blobService.createBlockBlobFromBrowserFile('testcontainer',
                   "test4.jpg",
                                 fileEntry,
                   // { contentSettings: { contentType: "image/jpeg" } },
                    (error, result) => {
                        if (error) {
                            console.log(error)
                            // Handle blob error
                            alert(error)
                        } else {
                            console.log('Upload is successful');
                            alert("uploaded")
                        }
                    });

                        }, onErrorCreateFile);

                    }, function (e) { console.log(e); alert("resolve error")});
                }

                



            },


        })

    },
    testBlob: function (imguri) {

      //  console.log(imguri);



       // cFile = imguri.replace("blob:", "");
       // cFile = imguri.replace("http", "file");

       // console.log(cordova.file.dataDirectory)

        //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        //navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 1024, function (grantedBytes) {
        //    window.webkitRequestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, function () {
        //        console.log("success")
        //        console.log(window.requestFileSystem);

        //        window.resolveLocalFileSystemURL(imguri, function (fileEntry) {
        //            console.log("local")
        //            console.log(fileEntry)

        //        })
        //    }, function () { console.log("error") });
        //        console.log("file system")
        //    }, function (e) {
        //        console.log('Error', e);
        //    });


        //        window.webkitRequestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, onFileSystemSuccess.bind(this), this.errorHandler);
        //if (isPhoneGapApp) {
        //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess.bind(this), this.errorHandler);
        //}
        //else {
        //    navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 1024, function (grantedBytes) {
        //        window.webkitRequestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, onFileSystemSuccess.bind(this), this.errorHandler);
        //        console.log("file system")
        //    }, function (e) {
        //        console.log('Error', e);
        //    });
        //}


        //setInterval(function () {

        //    console.log("test");
 
        //    window.resolveLocalFileSystemURL(imguri, function (fileEntry) {
        //        fileEntry.file(function (file) {
        //            console.log(file);
        //            alert(file.name)
        //        })
        //    }), function (e) {
        //        console.log(e)
        //        console.log("error?")
        //    }

        //}, 200)
           
       // }, 200);
       
      


    },
    getReceipt: function () {

        console.log("get receipt");
        alert("start camera")
       
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 30,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true
        });
        
        function onSuccess(imageURI) {
            console.log("got img");
           // alert("got img")
            $(".img-wrapper").append('<img style="width:200px; height:100px;" src="data:image/gif;base64,' + imageURI + '" />')
           // alert(imageURI)
          //  app.editTransactions.testBlob(imageURI);
            app.editTransactions.getSASToken(imageURI);

        }

        function onFail(message) {
            console.log('Failed because: ' + message);
            alert('Failed because: ' + message);
        }
    }
   
});
app.localization.registerView('editTransactions');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home