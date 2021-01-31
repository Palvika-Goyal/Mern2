var path=require("path");
var mModel=require(path.join(__dirname,"..","models","medicine.model.js"));


var medicineModel=mModel();

async function doSave(req,resp){
     
    var uidd=req.params.uid;
    req.uid=uidd;
    console.log(req.files);
    if(req.files==null)
    req.body.mpic="aluu.JPG";
    else{
        req.body.mpic=req.files.myfile.name;
        var fullPath=path.join(process.cwd(),"reacttt","uploads3",req.body.mpic);
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
   await medicineModel.create(req.body,(err,result)=>{       
        if(err)
        {
            resp.send(err);
            return;
        }
        resp.json(result);
       
        console.log(result);
    });

}



async function doFetchAll(req,resp){
    var uidd=req.params.uid;
    medicineModel.find({uid:uidd})
    .then((result)=>{
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}


async function doDelete(req,resp){
    console.log(JSON.stringify(req.body));
   
    
        medicineModel.deleteOne({uid:req.body.uid,medicine:req.body.medicine}).then((result)=>
        {
            console.log(result);
            if(result.deletedCount!=0)
            resp.json({msg:"Deleted"});
            else
            resp.json({msg:"Invalid Uid"});
        });
}


//=------------------------FINDER=-------------
async function doFetchCity(req,resp){
    medicineModel.distinct("city")
    .then((result)=>{
       
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
async function doFetchMedicine(req,resp){
      var cityy=req.params.city;
    medicineModel.distinct("medicine",{city:cityy})
    .then((result)=>{
        console.log(result.length);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
async function doFetchProvider(req,resp){
   console.log(req.params.city);
    console.log(req.params.medicine);
    medicineModel.find({city:req.params.city,medicine:req.params.medicine})
    .then((result)=>{
        console.log(result.length);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
//-===================

module.exports={doSave,doFetchAll,doDelete,doFetchCity,doFetchMedicine,doFetchProvider}