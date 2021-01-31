import React, { useState,useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Modal,Row,Container,Form,Col} from "react-bootstrap";

function Login() {

    var [userObjLogin, setUserObjLogin] = useState({
        uid: "",
        pwd: "",
       });
    
     
      useEffect(()=>{
        handleShowLogin();
    },[]);

    var doUpdateLogin = (event) => {
        var { name, value } = event.target;
        setUserObjLogin({
          ...userObjLogin,
          [name]: value,
    
        });
        
      };
      const [show, setShow] = useState(false);
    
      const handleCloseLogin = () => setShow(false);
      const handleShowLogin = () => setShow(true);
    
      async function doLogin()
  {
    var url="http://localhost:3003/react/login";
    var response=await axios.post(url,userObjLogin);
    if(response.data.length==0)
    {
      setResponseLogin("Invalid Uid or Password..");
      return
    }
    setResponseLogin("Login Successful...");
    window.location.href="/userDashboard";
  }
  var [respMsgLogin,setResponseLogin]=useState("*");

    return (
        <center>

<Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
      <Form>
     
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"  name="uid"
            value={userObjLogin.uid}
            onChange={doUpdateLogin} placeholder="Enter email" />
  
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="text"  name="pwd"
            value={userObjLogin.pwd}
            onChange={doUpdateLogin} placeholder="Password" />
  </Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
  <i><b>
{respMsgLogin}</b></i>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={doLogin}>
          Login
          </Button>
        </Modal.Footer>
      </Modal>
        </center>
    )
}

export default Login;
