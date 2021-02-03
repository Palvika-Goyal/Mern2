import React, { useState,useEffect, createContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Modal,Row,Container,Form,Col} from "react-bootstrap";
import {useParams} from "react-router-dom";


function AvailMedicine() {

  //=-------------------------------------=-USing Params to fet uid=------------------------=--=-----
  const{uid}=useParams();
  var [mediObj, setmediObj] = useState({
    uid:uid,
    medicine: "",
   company:"",
    expiry: "" ,
    city:"",
    qty:"",
    units:"",
    myfile:null,
    });
    var[fileObj,setFileObj]=useState("/pics/fb.png");
//=--------------------------On useEffect Getting City of uid from profile=-------------------==--
  useEffect(async() => {
   var url="http://localhost:8000/profile/fetch";
    var response=await axios.post(url,mediObj);
    if(response.data.length==0)
    {
      setResponse("No such uid exists..");
      return
    }
    var {city}=response.data[0];
    setmediObj({"uid":uid,"city":city});
  },[])

  //=-----======================-------------ONCHANGE =------------------------=----------
  var doUpdate = (event) => {
    var { name, value } = event.target;
    setmediObj({
      ...mediObj,
      [name]: value,
    });
};

//=----------------------------------------On Pic Change=-----------------------------------------
  function onPicChange(event)
  {
    setmediObj({...mediObj,["myfile"]:event.target.files[0]});
    setFileObj(URL.createObjectURL(event.target.files[0]))
  }
  var [respMsg,setResponse]=useState("*");
  

  //=---------------------------------------Save Post With Pic=--------------------------------------------
  async function doSavePost() {      
      var url = "http://localhost:8000/medicine/save-post/"+uid;
      var formData=new FormData();
      for(var x in mediObj)
      {
        formData.append(x,mediObj[x]);
      }
      var response = await axios.post(url, formData);
      // alert(JSON.stringify(response.data));
     setResponse(response.data.msg); 
}



    return (
        <div style={{fontFamily:"cursive"}}><br></br>
          <center><h2>Avail Medicine</h2>
          <img src="/pics/medicine.png" height="135px" width="135px"></img></center>
          <br></br>
            <Form style={{margin:"100px",marginTop:"10px",border:"1px black solid",padding:"10px"}}> 
  <Form.Row>
  <Form.Group as={Col} >
      <Form.Label>uid</Form.Label>
      <Form.Control type="text" name="uid" value={uid} onChange={doUpdate} placeholder="Enter Name Of Medicine" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Medicine</Form.Label>
      <Form.Control type="text" name="medicine" value={mediObj.medicine} onChange={doUpdate} placeholder="Enter Name Of Medicine" />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Company</Form.Label>
      <Form.Control type="text" name="company" value={mediObj.company} onChange={doUpdate} placeholder="Enter Company" />
    </Form.Group>
  
  </Form.Row>
  <Form.Row>
   
    <Form.Group as={Col} >
      <Form.Label>Expiry Date</Form.Label>
      <Form.Control type="date" name="expiry" value={mediObj.expiry} onChange={doUpdate} placeholder="Date" />
    </Form.Group>

   
  </Form.Row>

  <Form.Group >
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="number" onChange={doUpdate} name="qty" value={mediObj.qty} placeholder="0" />
  </Form.Group>

  

  <Form.Row>
  <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select" name="units" onChange={doUpdate} value={mediObj.units}>
    
      <option value="Tablets">Tablets</option>
      <option value="Bottles">Bottles</option>
      <option value="Boxes">Boxes</option>
      <option value="Strips"> strips</option>
      <option value="Injections">Injections</option>
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col} >
      <Form.Label>City </Form.Label>
      <Form.Control type="text" readOnly  name="city" value={mediObj.city} onChange={doUpdate} placeholder="city" />
    </Form.Group>
    

    
  </Form.Row>
<Form.Row><Form.Group as={Col}>
    <Form.File id="exampleFormControlFile1" name="myfile" onChange={onPicChange} label="Adhar Card Pic" />
    <center><img src={fileObj} style={{ width:"50px",height:"50px"}}></img></center></Form.Group>
</Form.Row>
  
  
  <b>{respMsg}</b><Form.Row><Form.Group as={Col}>
  <Button variant="primary" size="lg" block onClick={doSavePost}>
    
Save  </Button></Form.Group></Form.Row>
</Form>
        </div>
    )
}

export default AvailMedicine;
