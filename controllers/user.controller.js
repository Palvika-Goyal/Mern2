var path=require("path");
var uModel=require(path.join(__dirname,"..","models","user.model.js"));

var userModel=uModel();
async function createUser(req,resp){
    await userModel.create(req.query,(err,result)=>{
        if(err)
        {
            resp.send(err);
            return;
        }
        resp.set("json");
        resp.json({"msg":"Inserted"});
        console.log(result);
    });
}

///-=-================================================================
async function createUserWithPic(req,resp){
    console.log(req.files);
    if(req.files==null)
    req.body.ppic="aluu.JPG";
    else{
        req.body.ppic=req.files.myfile.name;
        var fullPath=path.join(process.cwd(),"uploads",req.body.ppic);
        await req.files.myfile.mv(fullPath,(err)=>{
            if(err)
            {
                console.log(err.message);
            }
            else{
                console.log("File Moved");
                
            }
        })
    }
   await userModel.create(req.body,(err,result)=>{       
        if(err)
        {
            resp.send(err);
            return;
        }
        resp.json(result);
        console.log(result);
    });

}

//========-------------------------------============================
async function doDelete(req,resp){
    console.log(JSON.stringify(req.body));
    //await userModel.create(req.body,(err,result)=>{
        userModel.remove({uid:req.body.uid}).then((result)=>
        {
            console.log(result);
            if(result.deletedCount!=0)
            resp.json({msg:"Deleted"});
            else
            resp.json({msg:"Invalid Uid"});
        });
}

//-======================================================================
async function doUpdate(req,resp){
    userModel.update({uid:req.body.uid},{$set:req.body}).then((result)=>{
        console.log(result);
        if(result.nModified!=0)
        resp.json({msg:"Updated Successfully"});
        else
        resp.json({msg:"INVALID"});
         });
}
//=--------------------------------------------------------------
async function doFetchAll(req,resp){
    userModel.find()
    .then((result)=>{
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}

//-============================================================================
async function doFetch(req,resp){
    userModel.find({uid:req.body.uid})
    .then((result)=>{
        console.log(result.length+" Records Found");
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}

//-===================================================
async function doLogin(req,resp){
    
    userModel.find({uid:req.body.uid,pwd:req.body.pwd})
    .then((result)=>{
        
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })

}
//=---------------------------------------------------------
async function doFetchUsingParams(req,resp){
    var uidd=req.params.uid;
    userModel.find({uid:uidd})
    .then((result)=>{
        console.log(result.length);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
module.exports={createUser,doFetchUsingParams,createUserWithPic,doDelete,doUpdate,doFetchAll,doFetch,doLogin}