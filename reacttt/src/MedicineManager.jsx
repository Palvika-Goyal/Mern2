import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";

function MedicineManager() {
   
    const {uid}=useParams();
    var [jsonAry,filljsonAry]=useState([]);

//=------------------------------------------Fetch all using uid=-------------------------------==-
    async function doFetchMedicine(uid)
    {      
        
        var url="http://localhost:8000/medicine/fetch-all/"+uid;
        var response=await axios.post(url);
        filljsonAry(response.data);
        // alert(response.data.length);        
    }

//=---------------------------------------------=-Delete Medicine=---------------------------------
    async function deleteMedicine(obj)
    {
        var url="http://localhost:8000/medicine/delete";
        const response=await axios.post(url,obj);
        // alert(JSON.stringify(response.data));
        doFetchMedicine(uid);
    }
    return (
        <div style={{fontFamily:"cursive"}}>
            <br></br>
         <center> <h2> <input type="text" value={uid}></input>&nbsp;&nbsp;&nbsp;
         <Button variant="secondary" onClick={()=>doFetchMedicine(uid)}>Get All</Button></h2></center>
         <hr></hr><hr></hr>
         <table width="1400px" border="2">

         <tr height="65px" style={{textAlign:"center"}}>
                <th width="280px">UID</th>
                <th width="280px">MEDICINE</th>
                <th width="280px">EXPIRY DATE</th>
                <th width="280px">COMPANY</th>
                <th width="280px">DELETE</th>
            </tr></table>
        
{jsonAry.map((obj)=>{
    return(
        <table width="1400px" border="2">
                <tr height="65px" style={{textAlign:"center"}}>
                <td width="280px">{obj.uid}</td>
                <td width="280px">{obj.medicine}</td>
                <td width="280px">{obj.expiry}</td>
                <td width="280px">{obj.company}</td>
                <td width="280px"><Button variant="danger" onClick={()=>deleteMedicine(obj)}>Delete</Button></td>
            </tr>
        </table>
    )
}   )}        </div> 
    )
}

export default MedicineManager
