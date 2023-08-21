import "./Home.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Body from "./Home/Body";
import Header from "./Home/Header.js";

function Home(){

    // housing, transportation, medical, groceries, other, personal

    const [isLogged, setIsLogged] = useState(false);

    const [housingExpenses, setHousingExpenses] = useState([]);
    const [transportationExpenses, setTransportationExpenses] = useState([]);
    const [medicalExpenses, setMedicalExpenses] = useState([]);
    const [groceryExpenses, setGroceryExpenses] = useState([]);
    const [personalExpenses, setPersonalExpenses] = useState([]);
    const [otherExpenses, setOtherExpenses] = useState([]);

    const [housingTotal, setHousingTotal] = useState(0.0);
    const [transportationTotal, setTransportationTotal] = useState(0.0);
    const [medicalTotal, setMedicalTotal] = useState(0.0);
    const [groceryTotal, setGroceryTotal] = useState(0.0);
    const [personalTotal, setPersonTotal] = useState(0.0);
    const [otherTotal, setOtherTotal] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/is_logged")
        .catch((error) => {
            console.log(error);
            navigate("/login");
        })

        setIsLogged(true);
        axios.get("/get_expenses")
        .then((response) => {
            const totalExpenses = response.data.expenses;
            let transTotal = 0.0;
            let houseTotal = 0.0;
            let medTotal = 0.0;
            let grocTotal = 0.0;
            let perTotal = 0.0;
            let othTotal = 0.0;
            let sum = 0.0;
            totalExpenses.forEach((e) => { 
                if (e.category === "transportation"){
                    transTotal += e.amount;
                } else if (e.category === "housing"){
                    houseTotal += e.amount;
                } else if (e.category === "medical"){
                    medTotal += e.amount;
                } else if (e.category === "groceries"){
                    grocTotal += e.amount;
                } else if (e.category === "personal"){
                    perTotal += e.amount;
                } else {
                    othTotal += e.amount;
                }
                sum += e.amount;
            });
            setTransportationTotal(transTotal);
            setHousingTotal(houseTotal);
            setMedicalTotal(medTotal);
            setGroceryTotal(grocTotal);
            setPersonTotal(perTotal);
            setOtherTotal(othTotal);
            setTotal(sum);

            console.log(transTotal);
            console.log(sum);
            
            const trans = totalExpenses.filter(e => e.category === "transportation");
            setTransportationExpenses(trans);
            

            const house = totalExpenses.filter(e => e.category === "housing");
            setHousingExpenses(house); 

            const med = totalExpenses.filter(e => e.category === "medical");
            setMedicalExpenses(med);

            const groc = totalExpenses.filter(e => e.category === "groceries");
            setGroceryExpenses(groc);

            const per = totalExpenses.filter(e => e.category === "personal");
            setPersonalExpenses(per);

            const oth = totalExpenses.filter(e => e.category === "other");
            setOtherExpenses(oth);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return isLogged? <div>
            <Header></Header>
            <Body housing = {housingExpenses} setHousing = {setHousingExpenses} housingTotal = {housingTotal} setHousingTotal = {setHousingTotal} transportation = {transportationExpenses} setTransportation = {setTransportationExpenses} transportationTotal = {transportationTotal} setTransportationTotal = {setTransportationTotal} medical = {medicalExpenses} setMedical = {setMedicalExpenses} medicalTotal = {medicalTotal} setMedicalTotal = {setMedicalTotal} personal={personalExpenses} setPersonal = {setPersonalExpenses} personalTotal = {personalTotal} setPersonalTotal = {setPersonTotal} other={otherExpenses} setOther = {setOtherExpenses} otherTotal = {otherTotal} setOtherTotal = {setOtherTotal} grocery = {groceryExpenses} setGrocery = {setGroceryExpenses} groceryTotal = {groceryTotal} setGroceryTotal = {setGroceryTotal} total = {total} setTotal = {setTotal}></Body>
        </div>: <h1>Loading...</h1>

}

export default Home;