import "./UpdateMovie.css";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function CreateMovie(){

    const {id} = useParams();
    const [image, setImage] = useState();
    const [movie, setMovie] = useState();
    const [date, setDate] = useState();
    const [username, setUsername] = useState();
    const [descrpition, setDescription] = useState();
    const navigate = useNavigate();

    function handleClick(){
        axios({
            method: "PUT",
            url: "/api/movie/" + id,
            data: {
                file: image,
                name: movie,
                date: date,
                username: username,
                description: descrpition
            },
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className = "createMovie">
            <div className = "createForm">
                <h1>Update Movie</h1>
                <input className = "imageInput" type = "file" onChange = {(e) => setImage(e.target.files[0])}></input> <label style = {{marginLeft: 0, color: "white"}}>Input image "png"</label><br></br>
                <input placeholder = "movie name: " onChange = {(e) => setMovie(e.target.value)}></input><br></br>
                <input placeholder = "date : yyyy-mm-dd" onChange = {(e) => setDate(e.target.value)}></input><br></br>
                <input placeholder = "username: " onChange = {(e) => setUsername(e.target.value)}></input><br></br>
                <input className = "description" placeholder = "description: " onChange = {(e) => setDescription(e.target.value)}></input><br></br>
                <button onClick = {handleClick}>Create!</button>
           </div> 
        </div>
    );
}