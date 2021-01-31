import React from 'react';
import {useParams} from"react-router-dom";
import Card from "./CardsShow";
function UserDashBoard() {
    const {uid}=useParams();
  function profile()
  {
      window.location.href="/user/Profile/"+uid;
  }
  function availmedicine()
  {
    window.location.href="/user/avail-medicine/"+uid;

  }
  function medicinemanager()
  {
    window.location.href="/user/medicine-manager/"+uid;
  }
  function medicinefinder()
  {
    window.location.href="/user/medicine-finder/"+uid;
  }
  function logout()
  {
    window.location.href="/";
  }
  // function faqs()
  // {
  //   window.location.href="/faq";
  // }
    return (
        <div style={{fontFamily:"cursive"}}>
     <div style={{backgroundColor:"#6C63FF", color:"white"}}>  <br></br>
            <h2>&nbsp;&nbsp;&nbsp;&nbsp;User Dash Board
           <i style={{float:"right"}}> Welcome:{uid}&nbsp;<img src="/pics/undraw_profile_pic_ic5t.png" width="50px" height="50px" style={{borderRadius:"50%"}}></img>&nbsp;&nbsp;&nbsp;&nbsp;</i></h2>
            <hr></hr>
            </div>
            <Card pic="/pics/undraw_profile_pic_ic5t.png" heading="Profile" call={profile}></Card>
            <Card pic="/pics/medicine.png" heading="Post Medicine" call={availmedicine}></Card>
             <Card pic="/pics/delete.png" heading="Medicine Manager" call={medicinemanager}></Card> 
             <Card pic="/pics/search.png" heading="Medicine Finder" call={medicinefinder}></Card> 
             <Card pic="/pics/exit.png" heading="Logout" call={logout}></Card> 
             {/* <Card pic="/pics/fb.png" heading="FAQs" call={faqs}></Card>  */}
        </div>
    )
}
export default UserDashBoard;
