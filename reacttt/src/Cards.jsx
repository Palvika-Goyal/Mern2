
import React, { useState ,useEffect,useNavigate} from "react";
import {Container,Row,Col,Card,Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Cards() {
  var [jsonAry, fillJsonArray] = useState([{"uid":"Palvika"}]);
  var[fileObj,setFileObj]=useState(null);

function EditData(uid)
{

 window.location.href="/edituser/"+uid;
 
}
 useEffect(async() => {
  var url = "http://localhost:3003/react/fetchall";
  var response = await axios.post(url);
  fillJsonArray(response.data);
  setFileObj(response.data.myfile)
  
},[])
  return (
    <>    
      <Container>
        <br></br>
     <center><i><h1>Total Records Found:{jsonAry.length}</h1></i></center>
         <br>
         </br>
        <Row>
          
            {jsonAry.map((obj) => {
              return (
                <Col md={3}>
                <Card >
                  <Card.Body>   
                    <Card.Title>{obj.uid}</Card.Title>
                    <Card.Text><i><b>
                    
                      <p>Password:{obj.pwd}</p> 
                      <p>Mobile:{obj.mobile}</p></b></i> 
                    </Card.Text>
                        
<Button variant="primary" onClick={()=>EditData(obj.uid)}>Edit Details</Button>
                  </Card.Body>
                </Card>
                </Col>
              );
            })}          
        </Row>
      </Container>
    </>
  );
}
export default Cards;