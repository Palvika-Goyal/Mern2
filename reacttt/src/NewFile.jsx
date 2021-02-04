import React,{useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import {Switch,Route} from "react-router-dom";
import NavBarr from './NavBarr';
import Signup from "./Signup";
import Login from "./Login";
import About from "./About";
import FrontPage from "./FrontPage";
import Cards from "./Cards";
import EditUser from "./EditUser";
import UserDashBoard from "./UserDashBoard";
import ProfileComponent from "./ProfileComponent";
import AvailMedicine from './AvailMedicine';
import MedicineManager from './MedicineManager';
import MedicineFinder from './MedicineFinder';
import FAQ from "./FAQ";
function NewFile() {
    return (
        <div>
           <Switch>
            <Route path="/" exact component={FrontPage}></Route>       
               
           <Route path="/about"  component={About}></Route>
            <Route path="/Card-Show"  component={Cards}></Route>
            <Route path="/faq"  component={FAQ}></Route>
            <Route path="/signup"  component={Signup}></Route>
            <Route path="/login"  component={Login}></Route>
            <Route path="/edituser/:uid" component={EditUser}></Route>
            <Route path="/userDashBoard/:uid" component={UserDashBoard}></Route>
            <Route path="/user/Profile/:uid" component={ProfileComponent}></Route>
            <Route path="/user/avail-medicine/:uid" component={AvailMedicine}></Route>
            <Route path="/user/medicine-manager/:uid" component={MedicineManager}></Route>
            <Route path="/user/medicine-finder/:uid" component={MedicineFinder}></Route>

            </Switch>
        </div>
    )
}

export default NewFile;
