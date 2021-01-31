import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Modal,Row,Container,Form,Col} from "react-bootstrap";

var CardsShow=(data)=> {
    return (
        <div style={{height:"310px", width:"280px", float:"left", border:"1px black solid",borderRadius:"7%", marginLeft:"47px"}}>
            <center><br></br><img src={data.pic} width="215" height="200" ></img><br></br>
          <br></br><Button style={{backgroundColor:"#6C63FF",borderRadius:"10%"}} onClick={data.call}>{data.heading}</Button></center>
        </div>
    )
}
export default CardsShow
