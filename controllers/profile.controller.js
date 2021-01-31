var path=require("path");
var pModel=require(path.join(__dirname,"..","models","profile.model.js"));

var profileModel=pModel();

async function doSave(req,resp){
    console.log(req.files);
    if(req.files==null)
    req.body.apic="aluu.JPG";
    else{
        req.body.apic=req.files.myfile.name;
        var fullPath=path.join(process.cwd(),"uploads2",req.body.apic);
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
   await profileModel.create(req.body,(err,result)=>{       
        if(err)
        {
            resp.send(err);
            return;
        }
        resp.json(result);
       
        console.log(result);
    });

}


//-===================
async function doUpdate(req,resp){
    console.log(req.files);
    if(req.files==null)
    req.body.apic="aluu.JPG";
    else{
        req.body.apic=req.files.myfile.name;
        var fullPath=path.join(process.cwd(),"reacttt","uploads2",req.body.apic);
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

    await profileModel.update({uid:req.body.uid},{$set:req.body}).then((result)=>{
        console.log(result);
        if(result.nModified!=0)
        resp.json({msg:"Updated Successfully"});
        else
        resp.json({msg:"INVALID"});
         });
}

//-=======================
async function doFetch(req,resp){
    profileModel.find({uid:req.body.uid})
    .then((result)=>{
        console.log(result.length+" Records Found");
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}



//=----------------
async function doFetchDetails(req,resp){
    profileModel.find({uid:req.body.uid})
    .then((result)=>{
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
module.exports={doSave,doUpdate,doFetch,doFetchDetails}