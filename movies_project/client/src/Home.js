import "./Home.css";
import React, {useState} from "react";
import Search from "./search.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Home(){

    const [username, setUsername] = useState("");
    const [searchedMovie, setSearchMovie] = useState("");
    const [returnMovies, setReturnMovies] = useState([]);
    const [error, setError] = useState({
        isError: false,
        message: ""
    });
    const navigate = useNavigate();

    function getMoviesLike(){
        const params = {name: searchedMovie};
        axios.get("/api/movies_like", {params})
        .then((response) => {
            setReturnMovies(response.data);
        })
        .catch((error) => console.log(error));
    }

    function handleClick(movieId){
        if (username.length !== 0){
            sessionStorage.setItem("username", username);
            navigate("/movie/" + movieId);
        }
        const newError = {
            isError: true,
            message: "please input username!"
        }
        setError(newError);
    }

    return (
        <div className = "home">
            <h1>Welcome to our app! Review your favorite movies!</h1>
            <h2 onClick = {() => navigate("/create_movie")}>Can't find you movie? Create one!</h2>
            <div className = "inputSection">
                {error.isError && <div className = "error"><p>{error.message}</p></div>}
                <input className = "usernameinput" onChange = {(e) => setUsername(e.target.value)} value = {username} placeholder = "username: " required></input>
                <div style = {{marginLeft: 60}} className = "searchingDiv">
                    {returnMovies.length > 0 && 
                        <div className = "queriedMovies">
                        {returnMovies.map((m) => {
                            return <h3 onClick = {() => handleClick(m.id)}>{m.name}</h3>
                        })}
                        </div>
                    }
                    <input className = "searchInput" placeholder = "search:" onChange = {(e) => setSearchMovie(e.target.value)}></input>
                    <span onClick = {getMoviesLike} className = "searchDiv">
                        <img alt = "search" src = {Search}></img>
                    </span>
                </div>
            </div>
            
            
        </div>
    );
}

export default Home;