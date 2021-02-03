import React, { useState,useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Form,Col} from "react-bootstrap";


function ProfileComponent() {

  //=----------------------------=---------using params to get uid=------------------------=-------====
  const{uid}=useParams();

  //=-------------------------------------useState for profileObj-===================================-
  var [profileObj, setprofileObj] = useState({
    uid: uid,
   namee:"",
    mobile: "" ,
    addresss:"",
    city:"",
    zip:"",
    statee:"",
    myfile:null,
  });
  
//=----------------------------------------------Update on Change-===================================-
  var doUpdate = (event) => {
    var { name, value } = event.target;
    setprofileObj({
      ...profileObj,
      [name]: value,
    });
};
  
//=-------------------------------------useState to store Pic=---------------------------------=---=
  var[fileObj,setFileObj]=useState("/pics/fb.png")
  
  //=--------------------------------=-On change Pic Uploading=---------------------------=-------------
  function onPicChange(event)
  {
    setprofileObj({...profileObj,["myfile"]:event.target.files[0]});
    setFileObj(URL.createObjectURL(event.target.files[0]))
  }
useEffect(() => {
doFetch();
}, [])

  var [respMsg,setResponse]=useState("*");

  //=--------------------=---------Save with Pic Uploading=------------------------------
  async function doSavePost() {    
      var url = "api/profile/save-post/"+uid;
      var formData=new FormData();
      for(var x in profileObj)
      {
        formData.append(x,profileObj[x]);
      }
      var response = await axios.post(url, formData);
      // alert(JSON.stringify(response.data));
     setResponse(response.data.msg); 
}

//=--------------------------------------Update with Pic=------------------------------------
async function doUpdatePost()
{
  var url="api/profile/update";
  var formData=new FormData();
  for(var x in profileObj)
  {
    formData.append(x,profileObj[x]);
  }
  var response = await axios.post(url, formData);
  // alert(JSON.stringify(response.data));
 setResponse(response.data.msg);
}

//-===============================Fetch Details=----------------------------------------------
async function doFetch()
  {
    var url="api/profile/fetch";
    var response=await axios.post(url,profileObj);
    if(response.data.length==0)
    {
      setResponse("No such uid exists..");
      return
    }
    setResponse(JSON.stringify(response.data[0]));
    var {uid,namee,mobile,zip,addresss,apic,city,statee}=response.data[0];
    // alert(uid);
    setprofileObj({"uid":uid,"namee":namee,"mobile":mobile,"zip":zip,"addresss":addresss,"myfile":apic,"city":city,"statee":statee});
  }



    return (
        <div style={{fontFamily:"cursive"}}>
          <br></br>
          <center><h1>Profile Page</h1>
          <img src="/pics/undraw_Profile_data_re_v81r.png" height="120px" width="120px"></img></center>
          <br></br>
            <Form style={{margin:"100px",marginTop:"10px",border:"1px black solid",borderRadius:"2%",padding:"10px"}}> 
  <Form.Row>
 
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email"  name="uid" value={uid} onChange={doUpdate} placeholder="Enter email" />
    </Form.Group>

     </Form.Row>
 
  <Form.Row>
    <Form.Group as={Col} >
      <Form.Label>Name</Form.Label>
      <Form.Control required type="text" name="namee" value={profileObj.namee} onChange={doUpdate} placeholder="Enter Name" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Mobile</Form.Label>
      <Form.Control required type="number" name="mobile" value={profileObj.mobile} onChange={doUpdate} placeholder="Enter Contact details" />
    </Form.Group>

   
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control required onChange={doUpdate} name="addresss" value={profileObj.addresss} placeholder="1234 Main St" />
  </Form.Group>

  

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control required value={profileObj.city} name="city" onChange={doUpdate} />
    </Form.Group>
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control required name="statee" value={profileObj.statee} onChange={doUpdate} />
    </Form.Group>

    

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control required name="zip" value={profileObj.zip} onChange={doUpdate} />
    </Form.Group>
  </Form.Row>
  <Form.Row>
    
  <Form.Group as={Col}>
    <Form.File id="exampleFormControlFile1" name="myfile" onChange={onPicChange} label="Adhar Card Pic" />
    <center><img src={fileObj} style={{ width:"50px",height:"50px"}}></img>
      
     
      
      </center></Form.Group></Form.Row>
    {/* <b>{respMsg}</b> */}
    <Form.Row><Form.Group as={Col}>
  <Button variant="primary" style={{backgroundColor:"#6C63FF"}} size="lg" block onClick={doSavePost}>
    
Save  </Button></Form.Group><Form.Group as={Col}> <Button variant="primary" style={{backgroundColor:"#6C63FF"}} size="lg" onClick={doUpdatePost} block>
Update  </Button></Form.Group></Form.Row>
</Form>
        </div>
    )
}

export default ProfileComponent
