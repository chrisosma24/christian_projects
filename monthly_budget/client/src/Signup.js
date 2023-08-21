import "./Signup.css";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup(){

    const [failSignup, setFailSignup] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function signup(){
        const params = {username: username, password: password};
        axios.get("/signup", {params})
        .then((response) => {
            const data = response.data;
            const success = data.success;
            if (success === "False"){
                setFailSignup(true);
                setMessage("user already exists");
            } else { 
                // login is successful
                setFailSignup(false);
                navigate("/login");
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className = "loginPage">
            <div className = "loginForm">
                <h1>Signup</h1>
                {failSignup && 
                <div className = "errorDiv">
                    <div className = "errorBlock">
                        <p className = "errorMessage">{message}</p>
                    </div>
                </div>
                }
                <input onChange = {(e) => setUserName(e.target.value)} style = {{marginTop: 20}} placeholder = "username:"></input><br></br>
                <input onChange = {(e) => setPassword(e.target.value)} placeholder = "password:"></input><br></br>
                <button onClick = {signup} style = {{marginTop:16}}>signup</button>
                <h2 onClick = {()=>navigate("/login")}>Already have an account? Log in</h2>
            </div>
        </div>
    );
}

export default Signup