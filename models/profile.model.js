var mongoose=require("mongoose");
function getProfileModel()
{
    var ProfileSchemaObj=new mongoose.Schema({
        uid: {type:String,index:true,unique:true},
       mobile: String,
       namee:String,
        addresss: String,
        city:String,
        statee:String,
        zip:String,
        apic:String,
        dos: {type:Date,default:Date.now }
});

var profileModel=mongoose.model("profilee",ProfileSchemaObj);

return profileModel;
}
module.exports=getProfileModel;