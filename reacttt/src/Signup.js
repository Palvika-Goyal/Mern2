import React, { useState,useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Modal,Row,Container,Form,Col} from "react-bootstrap";

function Signup() {
  var [userObj, setUserObj] = useState({
    uid: "",
    pwd: "",
    mobile: "" ,
    myfile:null,
    
  });
var [msg,setmsg]=useState("*");
//   //Modal
  useEffect(()=>{
    handleShow();
},[]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  var handleShow = () => setShow(true);
 
  var [errObj, setErrors] = useState({
    uid:"Uid Should Not be empty",
    pwd:"Length Should be greater than or equal to 8",
    mobile:"Length Should be greater than or equal to 10"
  });
//on change update  
  var doUpdate = (event) => {
    var { name, value } = event.target;
    setUserObj({
      ...userObj,
      [name]: value,

    });
    var b=true;
          if(userObj.uid.length==0)
              errObj.uid="Invalid";
              else
             {
                  errObj.uid="Fine";
                  b=false;
          }
          
              if(userObj.pwd.length<8)
              errObj.pwd="Invalid";
              else{
      
              b=false;
              errObj.pwd="Fine";
              }
              if(userObj.mobile.length<8)
              errObj.mobile="Invalid";
              else{
      
              b=false;
              errObj.mobile="Fine";
              }
      
            setErrors(errObj);
      
    
  };
  //-=-=============Pic Uploading -=---------------=----
var[fileObj,setFileObj]=useState("pics/fb.png")
  function onPicChange(event)
  {
    setUserObj({...userObj,["myfile"]:event.target.files[0]});
    setFileObj(URL.createObjectURL(event.target.files[0]))

  }

  var [respMsg,setResponse]=useState("*");
  //Save Get 
  async function doSave() {
    var url =
      "api/react/save?uid=" +
      userObj.uid +
      "&pwd=" +
      userObj.pwd +
      "&mobile=" +
      userObj.mobile;
    var response = await axios.get(url);
    await alert(JSON.stringify(response.data));
  }
//Fetch all
  async function doFetchAll()
  {
      window.location.href="/Card-Show";

  }
  async function doSavePost() {
   
   
          if(errObj.uid=="Fine" && errObj.pwd=="Fine"&& errObj.mobile=="Fine")
          {
            setmsg("Signup Successful..");
            var url = "http://localhost:8000/react/save-post";
            var formData=new FormData();
            for(var x in userObj)
            {
              formData.append(x,userObj[x]);
            }
            var response = await axios.post(url, formData);
            //alert(JSON.stringify(response.data));
           setResponse(response.data.msg);
          }
          else{
          setmsg("Signup Failed");
         
          }
    }
  async function doDelete()
  {
    // window.location.assign("http://www.w3schools.com");

   var url="http://localhost:8000/react/delete";
   var response=await axios.post(url,userObj);
   await alert(JSON.stringify(response.data));
  }
  
  async function doUpdatee()
  {
    var url="http://localhost:8000/react/update";
    var response=await axios.post(url,userObj);
    await alert(JSON.stringify(response.data));
  }
  async function doFetch()
  {
    var url="http://localhost:3003/react/fetch";
    var response=await axios.post(url,userObj);
    if(response.data.length==0)
    {
      setResponse("No such uid exists..");
      return
    }
    setResponse(JSON.stringify(response.data[0]));
    var {uid,pwd,mobile}=response.data[0];
    alert(uid);
    setUserObj({"uid":uid,"pwd":pwd,"mobile":mobile});
    //await alert(JSON.stringify(response.data));
  }
  
  return (
    <center><Col md={5}>
       
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
      <Form>
     
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"  name="uid"
            value={userObj.uid}
            onChange={doUpdate} placeholder="Enter email" />
    <Form.Text className="text-muted">
    {errObj.uid}
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  name="pwd"
            value={userObj.pwd}
            onChange={doUpdate} placeholder="Password" />
  </Form.Group>
  <Form.Text className="text-muted">
  {errObj.pwd}
    </Form.Text>
  <Form.Group >
    <Form.Label>Mobile</Form.Label>
    <Form.Control name="mobile"
            value={userObj.mobile}
            onChange={doUpdate} type="number" placeholder="Mobile" />
           
  </Form.Group>
  <Form.Text className="text-muted">
  {errObj.mobile}
    </Form.Text>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Example file input" onChange={onPicChange} />
    <center><img src={fileObj} style={{ width:"50px",height:"50px"}}></img></center>
  </Form.Group>
 
{errObj.msg}
</Form>
</Modal.Body>
<Modal.Footer>
<b><i>{msg}</i></b>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
          <Button variant="primary" onClick={doSavePost}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
          </Col>      
         </center>
  );
}
export default Signup;
