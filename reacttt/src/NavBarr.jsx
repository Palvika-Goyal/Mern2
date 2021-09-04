import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Form,Navbar,Nav,Modal,Button,FormControl} from "react-bootstrap";
import axios from "axios";
function NavBarr() {

  //-======-====================================SignUp=-----------------------------------------
  var [userObj, setUserObj] = useState({
    uid: "",
    pwd: "",
    mobile: "" ,   
  });
var [msg,setmsg]=useState("*");

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
  var [respMsg,setResponse]=useState("*");

  async function doSavePost() {
          if(errObj.uid=="Fine" && errObj.pwd=="Fine"&& errObj.mobile=="Fine")
          {
            setmsg("Signup Successful..");
            var url = "api/react/save-post";
            var response = await axios.post(url, userObj);
            //alert(JSON.stringify(response.data));
           setResponse(response.data.msg);
          }
          else{
          setmsg("Signup Failed");
          }
    }
  
  //-===========================-----=========-=----Login=--------------------------------

  var [userObjLogin, setUserObjLogin] = useState({
    uid: "",
    pwd: "",
   });

var doUpdateLogin = (event) => {
    var { name, value } = event.target;
    setUserObjLogin({
      ...userObjLogin,
      [name]: value,

    });
    
  };
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  async function doLogin(uid)
{
  
  
var url="api/react/login";
var response=await axios.post(url,userObjLogin);
if(response.data.length==0)
{
  setResponseLogin("Invalid Uid or Password..");
  return
}
else
{
setResponseLogin("Login Successful...");
window.location.href="/userDashboard/"+uid;
}
}
var [respMsgLogin,setResponseLogin]=useState("*");

    return (
        <div style={{fontFamily:"cursive"}}>
            <Navbar bg="white" expand="lg">
  <Navbar.Brand href="#home">Medix</Navbar.Brand>
  <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
       
      </Nav>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  
    <Form inline>
    <Button variant="primary" style={{backgroundColor:"#6C63FF"}} onClick={handleShow}>SignUp</Button>&nbsp;&nbsp;
<Button variant="primary" style={{backgroundColor:"#6C63FF"}} onClick={handleShowLogin}>Loginn</Button>
    </Form>
    
  </Navbar.Collapse>
</Navbar>


{/* -========================Signup Modal -============== */}
<Modal style={{fontFamily:"cursive"}} show={show}  onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title >SignUp Modal</Modal.Title>
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
 
{errObj.msg}
</Form>
</Modal.Body>
<Modal.Footer>
<b><i>{msg}</i></b>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
          <Button variant="primary" style={{backgroundColor:"#6C63FF"}} onClick={doSavePost}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>

     
{/* // =-----------------------------------LOGIN MODAL-===========--------------------============ */}

<Modal style={{fontFamily:"cursive"}} show={showLogin} onHide={handleCloseLogin}>
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
          <Button variant="primary" style={{backgroundColor:"#6C63FF"}} onClick={()=>doLogin(userObjLogin.uid)}>
          Login
          </Button>
        </Modal.Footer>
      </Modal>

      </div>


    )
}
export default NavBarr;
