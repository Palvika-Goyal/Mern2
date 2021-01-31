import React,{useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Card,Row,Container,Form,Col} from "react-bootstrap";

import axios from "axios";

function EditUser() {
const {uid}=useParams();

//-===========================================use state for inputs=----------------------------------
var [userObj, setUserObj] = useState({
    uid: "uid",
    pwd: "pwd",
    mobile: "mobile" ,
    myfile:null
  });

  //-==============================================doUpdate-=-=-=-=---------------------------------
  var doUpdate = (event) => {
    var { name, value } = event.target;
    setUserObj({
      ...userObj,
      [name]: value,
    });
  };

  //-===============--=====================UseEffect-Calling Seach function-=====================
  useEffect(()=>{
      searchData();
  },[]);

  //-======================================Search Function-=-=----------------------------=--=-=-----==
  async function searchData()
  {
    var url="http://localhost:3003/react/fetch-one/"+uid;
    const response=await axios.get(url);
    setUserObj(response.data[0]);
    
    console.log(JSON.stringify(response.data));
    setResponse(response.data.msg);
  }

  //-=-=-=-======-=-=-=-=-==-=-=-=-=-=-=-=-=-Update Function=-=-=-=-=-=-=-=----------=-=-=-=-=
  async function doUpdatePost()
  {
    var url="http://localhost:3003/react/update";
    var response=await axios.post(url,userObj);
    await alert(JSON.stringify(response.data));
  }

  //-=-=-=-==Response-=-=-=-
  var [respMsg,setResponse]=useState("*");

  //-=-========-=-Return-=-=-=-=
    return (
        <center><Col md={5}>
     <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" readOnly name="uid"
            value={userObj.uid}
            onChange={doUpdate} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  name="pwd"
            value={userObj.pwd}
            onChange={doUpdate} placeholder="Password" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Mobile</Form.Label>
    <Form.Control name="mobile"
            value={userObj.mobile}
            onChange={doUpdate} type="text" placeholder="Mobile" />
  </Form.Group>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Example file input"/>
    
  </Form.Group>
 
 
  <Button variant="primary" type="buttton" onClick={doUpdatePost}>
Update this Record  </Button>
 
  <small>{respMsg}</small>
  <br></br><br></br></Form>

          </Col>
   
          
      <i><h2>{JSON.stringify(userObj)}</h2></i>
         </center>
    )
}
export default EditUser;
