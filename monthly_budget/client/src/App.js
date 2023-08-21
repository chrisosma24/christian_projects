import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import Update from "./Update.js";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/signup" element = {<Signup />}></Route>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/update_password" element = {<Update/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
