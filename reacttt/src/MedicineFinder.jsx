import React, { useState,useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Card,Modal,Col} from "react-bootstrap";

function MedicineFinder() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //=---------------------All cities=----------------------
    var [jsonAryCity,filljsonAryCity]=useState(["city"]);
  //=--------------------Mobile=---------------------------
    var[detailss,setmobile]=useState({
      namee:"",
      city:"",
      mobile:"",
      addresss:"",
      statee:"",
      zip:""

    })
    //=------------------Medicines according to city selected=-------
    var [medicineObj,fillMedicine]=useState([]);
    //-=====================-==--=Provider on basis of city and medicine selected
    var [providerObj,fillProviderObj]=useState([]);

    var[finder,fetchfinder]=useState(
        {
            cityy:"",
            medicine:""
        }
    )
//=--------------------ONCHANGE-=======================
    var doUpdate = (event) => {
        var { name, value } = event.target;
        fetchfinder({
          ...finder,
          [name]: value,
        });
      };

//=-------------------=-------USE EFFECT -FETCH ALL DISTINCT CITIES=-------------
useEffect(async() => {
    var url="/api/medicine/fetch-all";
    var response=await axios.post(url);
    filljsonAryCity(response.data);
}, [])

//=------------------------=--=FETCH ALL MEDICINES ONBASIS OF CITY SELECTED=------------=-=-
async function doFill(e)
{    
    doUpdate(e);
    var url="/api/medicine/fetch-medicine/"+e.target.value;
    var response=await axios.post(url);
    fillMedicine(response.data);
   // alert(JSON.stringify(response.data));
}

//=----------------------------FETCH ALL DETAILS AND SHOW IN CARD-==========================
async function showCard(finder)
{
    var url="/api/medicine/fetch-provider/"+finder.cityy+"/"+finder.medicine;
    var response=await axios.post(url);
     fillProviderObj(response.data);
    // alert(JSON.stringify(response.data));
}

//=-------------------------------=-=-=-TO FETCH MOBILE NUMBER=------------------------
async function doFetchProviderDetails(obj){
    // alert(JSON.stringify(obj));
    handleShow();
    var url="/api/profile/fetch-details";
    var response=await axios.post(url,obj);
    // alert(JSON.stringify(response.data));
    
    setmobile(response.data[0]);
}
var picture;

    return (
        <div style={{fontFamily:"cursive"}}><center><br></br>
<h2>Search Medicine Providers</h2>
<br></br>
    {/* =--------------============---------CITY=--------=-------------------------- */}
    City:        <select id='template-select' value={finder.cityy} name="cityy"  onChange={doFill}>
      <option>Select City</option>
      {jsonAryCity.map((obj)=>{
          return (
              <option value={obj}>{obj}</option>
          )
      })}
    </select>
&nbsp;&nbsp;

    {/* =--------------============---------MEDICINE=--------=-------------------------- */}

Medicine:
    <select id='template-select' value={finder.medicine} name="medicine"  onChange={doUpdate} >
      <option>Select Medicine</option>
      {medicineObj.map((obj)=>{
          return (
              <option value={obj}>{obj}</option>
          )
      })}
    </select>
    <br>
    </br>
   
    {/* =--------------============---------FIND MEDICINE PROVIDERS=--------=-------------------------- */}

    <br></br>
    <Button variant="primary" onClick={()=>showCard(finder)}>Find Medicine Providers</Button>
    </center>
    
    
      {/* =--------------============---------SHOW IN CARDS=--------=-------------------------- */}

    {
    providerObj.map((obj) => {
              return (
                <Col md={2} style={{float:"left"}}>
                <Card style={{float:"left",width:"270px" ,height:"375px",margin:"10px"}} >
                  <Card.Body>   <center>
                    <Card.Title>{obj.uid}</Card.Title>
                    <Card.Text>
                    <noscript>{picture="/uploads3/"+obj.mpic}</noscript>
                <p>   <img src={picture} width="90%" height="40%" alt="Unable to Load"></img></p> 
                      <p>Medicine:{obj.medicine}</p> 
                      <p>Company:{obj.company}</p>
                      <p>Expiry Date:{obj.expiry}</p>
                    </Card.Text>
                        
<Button style={{backgroundColor:"#6C63FF"}} onClick={()=>doFetchProviderDetails(obj)}>Show  Details</Button>
</center> 
                  </Card.Body>
                </Card>
                </Col>
              );
            })}
          <center>  <img src="/pics/search.png" width="600px" height="600px"></img></center>
          <Modal style={{fontFamily:"cursive"}} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Medicine Provider Details</Modal.Title>
        </Modal.Header>
        <Modal.Body><center>
         Name: {detailss.namee}<br></br>
         Contact No.:{detailss.mobile}<br></br>
         Address:{detailss.addresss}<br></br>
         City:{detailss.city}<br></br>
         Zip:{detailss.zip}<br></br>
         State:{detailss.statee}<br></br></center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default MedicineFinder;
