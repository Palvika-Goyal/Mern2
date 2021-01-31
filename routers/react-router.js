var express=require("express");
var path=require("path");
var app=express.Router();
const { join } = require("path");


var userController=require(path.join(__dirname,"..","controllers","user.controller.js"));



//=-------============================---Schema-===========------------------========

//-----------------------------------------Save-GET-========================--------------
app.get("/save",userController.createUser);


//--=--=--==-=---------------=--=-----------Save Post With File Upload--=-=-------------=---------

app.post("/save-post",userController.createUserWithPic);


//-=-=-=-=-=--=-=-=-=-=-=====-============Delete Record-=-=-=============-
app.post("/delete",userController.doDelete);


//-=-=-=-=-=--=-=-=-=-=-=====-============Update Record-=-=-=============-
app.post("/update",userController.doUpdate);

//-=======-=====================Fetch all Records-==============-======-==========
app.post("/fetchall",userController.doFetchAll)


//-============--=----=-=-=========Fetch A record-=============================------
app.post("/fetch",userController.doFetch)
//-===============Login
app.post("/login",userController.doLogin)

//-=-=-=-=-=-=-=-======-=--=-=-=-==Using Params Edit User-=-=-=------------------=-=-=
app.get("/fetch-one/:uid",userController.doFetchUsingParams);

//-==============------------------Exporting module-================================
module.exports=app; 