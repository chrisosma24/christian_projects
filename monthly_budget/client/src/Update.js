import "./Update.css";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Update(){

    const [failLogin, setFailLogin] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const navigate = useNavigate();

    function update(){
        const params = {username, password,new_password};
        axios.get("/update_password", {params})
        .then((response) => {
            const data = response.data;
            if (data.success === "True") navigate("/login");  
        })
        .catch((error) => {
            setFailLogin(true);
            const data = error.response.data;
            if (data.message === "username not found"){
                setMessage("invalid username");
            } else { 
                setMessage("invalid password");
            }
        })
    }

    return (
    <div className = "loginPage">
            <div className = "loginForm">
                <h1>Update Password</h1>
                {failLogin && 
                <div className = "errorDiv">
                    <div className = "errorBlock">
                        <p className = "errorMessage">{message}</p>
                    </div>
                </div>
                }
                <input onChange = {(e) => setUserName(e.target.value)} style = {{marginTop: 20}} placeholder = "username:"></input><br></br>
                <input onChange = {(e) => setPassword(e.target.value)} placeholder = "password:"></input><br></br>
                <input onChange = {(e) => setNewPassword(e.target.value)} placeholder = "new_password:"></input><br></br>
                <button onClick = {update} style = {{marginTop:16}}>update</button>
                <h2 onClick = {()=>navigate("/login")}>Change your mind? Login</h2>
            </div>
        </div>
    );
}

export default Update;