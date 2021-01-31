
const express=require("express");
var bodyParser=require("body-parser");
var cors=require("cors");
var mongoose=require("mongoose");
var path=require("path");
var app=express();



//=----------------------------------

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(cors());


app.use(express.urlencoded({
    extended: true
  }));

  var PORT =process.env.PORT|| 8000;
  var fileUpload=require("express-fileupload");
  app.use(fileUpload());

const db=require("./config/dbconfig");
var dbConfig=db.dburl;
mongoose.connect(dbConfig).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
})

var reactRouter=require("./routers/react-router");
app.use("/react",reactRouter);
var profileRouter=require("./routers/profile-router");
app.use("/profile",profileRouter);
var medicineRouter=require("./routers/medicine-router");
app.use("/medicine",medicineRouter);

app.use(express.static(path.join(__dirname,"reacttt")));
if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"reacttt","build")));
    app.get("*",(req,resp)=>{
        resp.sendFile(path.join(__dirname,"reacttt","build","index.html"));
    })
}
app.listen(PORT,()=>{
    console.log("Listening...");
})


//app.use(express.urlencoded({ extended:false }));

