var mongoose=require("mongoose");
function getUserModel()
{
    var UserSchemaObj=new mongoose.Schema({
        uid: {type:String,index:true,unique:true},
        pwd : String,
        mobile: String,
        
        dos: {type:Date,default:Date.now }
});

var userModel=mongoose.model("users",UserSchemaObj);

return userModel;
}
module.exports=getUserModel;