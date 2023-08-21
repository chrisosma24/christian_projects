import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Movie from "./Movie.js";
import Home from "./Home.js";
import CreateMovie from './CreateMovie.js';
import UpdateMovie from "./UpdateMovie.js";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/movie/:id" element = {<Movie />}></Route>
        <Route path = "/create_movie" element = {<CreateMovie/>}></Route>
        <Route path = "/update_movie/:id" element = {<UpdateMovie />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
