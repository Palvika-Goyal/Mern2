var express=require("express");
var path=require("path");
var app=express.Router();
const { join } = require("path");
var profileController=require(path.join(__dirname,"..","controllers","profile.controller.js"));

app.post("/save-post/:uid",profileController.doSave);

app.post("/update",profileController.doUpdate);

app.post("/fetch",profileController.doFetch);
app.post("/fetch-details",profileController.doFetchDetails);
module.exports=app; 
