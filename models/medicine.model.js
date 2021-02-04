var mongoose=require("mongoose");
function getMedicineModel()
{
    var MedicineSchemaObj=new mongoose.Schema({
        uid:String,
        medicine: String,
       company: String,
       expiry:Date,
        qty: Number,
        city:String,
        units:String,
        mpic:String,
        dos: {type:Date,default:Date.now }
});

var medicineModel=mongoose.model("medicines2",MedicineSchemaObj);

return medicineModel;
}
module.exports=getMedicineModel;