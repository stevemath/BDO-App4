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


                // const file = document.getElementById('fileinput').files[0];
                //console.log(file);
               // var the_file = new Blob([imguri], { type: 'image/jpeg' });



                //$.ajax({

                //    url:blobUri + "/" + uData.container + "/" + the_file,
                //})

                //  readImage(imguri);


                //function readImage(capturedFile) {

                //    console.log(imguri)
                //    console.log(the_file)
                //    capturedFile = capturedFile.replace("blob:", "");
                //    //var localFileSytemUrl = capturedFile.fullPath;

                //    var localFileSytemUrl = capturedFile;
                //    if (kendo.support.mobileOS == 'iOS') {
                //        // We need the file:/ prefix on an iOS device.
                //        localFileSytemUrl = "file://" + localFileSytemUrl;
                //    }
                //    console.log(localFileSytemUrl)
                //    window.resolveLocalFileSystemURL(imguri, function (fileEntry) {
                //        console.log(fileEntry)
                //        fileEntry.file(function (file) {
                //            // We need a FileReader to read the captured file.
                //            var reader = new FileReader();
                //            console.log(file)
                //            reader.onloadend = readCompleted;
                //            reader.onerror = fail;

                //            // Read the captured file into a byte array.
                //            // This function is not currently supported on Windows Phone.
                //            reader.readAsArrayBuffer(file);
                //        }, fail);
                //    });
                //};


                //var readCompleted = function (evt) {
                //    if (evt.target.readyState == FileReader.DONE) {

                //        // The binary data is the result.
                //        var requestData = evt.target.result;

                //        // Build the request URI with the SAS, which gives us permissions to upload.
                //        var uriWithAccess = blobUri + "?" + data.token;
                //        var xhr = new XMLHttpRequest();
                //        xhr.onerror = fail;
                //        xhr.onloadend = uploadCompleted;
                //        xhr.open("PUT", uriWithAccess);
                //        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                //        xhr.setRequestHeader('x-ms-blob-content-type', 'image/jpeg');
                //        xhr.send(requestData);
                //    }
                //}


                //var f = new File();

                //f.name = "test2.jpg";
                //f.localURL = imguri;
                //if (window.File && window.FileReader && window.FileList && window.Blob) {
                //    console.log("file api supported");
                //} else {
                //    console.log('The File APIs are not fully supported in this browser.');
                //}
                //var reader = new FileReader();
                //var f;

               
               //$(reader).on("load", function () {
               //     f = reader.result;
               // }, false);

               // if (imguri) {
               //     reader.readAsDataURL(imguri);
               // }
               // console.log(f);


               // var imgstr = dataURItoBlob(imguri)
                alert("got img");
                alert(imguri)
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
                blobService.createBlockBlobFromText('testcontainer',
                   "test5.jpg",
                    imguri,
                    { contentSettings: { contentType: "image/jpeg" } },
                    (error, result) => {
                        if (error) {
                            console.log(error)
                            alert(error)
                            // Handle blob error
                        } else {
                            console.log('Upload is successful');
                            alert("image uploaded")
                        }
                    });


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

                //            blobService.createBlobSnapshot('testcontainer',
                //                imguri,

                //(error, result) => {
                //    if (error) {
                //        // Handle blob error
                //        console.log(error)
                //    } else {
                //        console.log('Upload is successful');
                //        console.log(result);
                //    }
                //});



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
           // $(".img-wrapper").append('<img style="width:200px; height:100px;" src="' + imageURI + '" />')
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