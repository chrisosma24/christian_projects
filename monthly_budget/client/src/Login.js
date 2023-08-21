import "./Login.css";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){

    const [failLogin, setFailLogin] = useState(false);
    const [message, setMessage] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login(){
        const params = {username: username, password: password};
        axios.get("/login", {params})
        .then((response) => {
            const data = response.data;
            const success = data.success;
            if (success === "False"){
                setFailLogin(true);
                const message = data.message;
                if (message === "user does not exist"){
                    setMessage("user does not exist");
                } else { 
                    setMessage("invalid password");
                }
            } else { 
                // login is successful
                setFailLogin(false);
                sessionStorage.setItem("id", data.user_id);
                sessionStorage.setItem("username", data.username);
                navigate("/");
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className = "loginPage">
            <div className = "loginForm">
                <h1>Login</h1>
                {failLogin && 
                <div className = "errorDiv">
                    <div className = "errorBlock">
                        <p className = "errorMessage">{message}</p>
                    </div>
                </div>
                }
                <input onChange = {(e) => setUserName(e.target.value)} style = {{marginTop: 20}} placeholder = "username:"></input><br></br>
                <input onChange = {(e) => setPassword(e.target.value)} placeholder = "password:"></input><br></br>
                <button onClick = {login} style = {{marginTop:16}}>login</button>
                <h2 onClick = {()=>navigate("/signup")}>Don't have an account? Sign up</h2>
            </div>
        </div>
    );
}

export default Login;