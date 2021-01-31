var express=require("express");
var path=require("path");
var app=express.Router();
const { join } = require("path");
var medicineController=require(path.join(__dirname,"..","controllers","medicine.controller.js"));

app.post("/save-post/:uid",medicineController.doSave);
app.post("/fetch-all/:uid",medicineController.doFetchAll);
app.post("/fetch-all",medicineController.doFetchCity);
app.post("/fetch-medicine/:city",medicineController.doFetchMedicine);

app.post("/fetch-provider/:city/:medicine",medicineController.doFetchProvider);

app.post("/delete",medicineController.doDelete);
module.exports=app; 
