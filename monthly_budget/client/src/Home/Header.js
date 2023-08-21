import "./Header.css";
import React, {useState} from "react";
import Money from "../Images/money.png";
import User from "../Images/user-removebg-preview.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Header(){

    const [userClicked, setUserClicked] = useState(false);
    const navigate = useNavigate();

    function handleLogout(){
        axios.get("/logout")
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
        navigate("/login");
    }

    function handleDelete(){
        axios.get("/delete_user")
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
        navigate("/signup");
    }

    return (
        <div className = "header">
            <div className = "leftHeader">
                <h2>MonthlyBudget</h2>
                <img style = {{marginLeft: 3}} className = "headerImage" src = {Money} alt = "money img"></img>
            </div>
            <img onClick = {()=>setUserClicked(!userClicked)}className = "logoImage" src = {User} alt = "user"></img>
            <div className = {userClicked? "whiteSection": "nothing"}>
                <p onClick = {handleLogout}>Logout</p>
                <p onClick = {()=>navigate("/update_password")}>Update Password</p>
                <p onClick = {handleDelete} className = "delete">Delete Account : Warning this action is permanent!</p>
            </div>
        </div>
    );
}

export default Header;