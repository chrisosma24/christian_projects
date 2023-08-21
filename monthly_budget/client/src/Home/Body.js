import React, {useState} from "react";
import "./Body.css";
import Card from "./Card.js";

function Body({housing, setHousing, housingTotal, setHousingTotal, transportation, setTransportation, transportationTotal, setTransportationTotal, medical,setMedical, medicalTotal, setMedicalTotal,  personal, setPersonal, personalTotal, setPersonalTotal, other, setOther, otherTotal, setOtherTotal, grocery, setGrocery, groceryTotal, setGroceryTotal, total, setTotal}){

    // housing, transportation, medical, groceries, other, personal

    const [income, setIncome] = useState(0.0);
    const [profit, setProfit] = useState((-1 * total).toFixed(2));

    return (
        <div className = "body">
            <div className = "leftBody">
                <Card category = "Transportation" expenses = {transportation} setExpenses = {setTransportation} expenseTotal = {transportationTotal} setExpenseTotal = {setTransportationTotal} total = {total} setTotal = {setTotal}/>
                <Card category = "Housing" expenses = {housing} setExpenses = {setHousing} expenseTotal = {housingTotal} setExpenseTotal = {setHousingTotal} total = {total} setTotal = {setTotal}/>
                <Card category = "Medical" expenses = {medical} setExpenses = {setMedical} expenseTotal = {medicalTotal} setExpenseTotal = {setMedicalTotal} total = {total} setTotal = {setTotal}/>
                <Card category = "Groceries" expenses = {grocery} setExpenses = {setGrocery} expenseTotal = {groceryTotal} setExpenseTotal = {setGroceryTotal} total = {total} setTotal = {setTotal}/>
                <Card category = "Personal" expenses = {personal} setExpenses = {setPersonal} expenseTotal = {personalTotal} setExpenseTotal = {setPersonalTotal} total = {total} setTotal = {setTotal}/>
                <Card category = "Other" expenses = {other} setExpenses = {setOther} expenseTotal = {otherTotal} setExpenseTotal = {setOtherTotal} total = {total} setTotal = {setTotal}/>
            </div>
            <div className = "rightBody">
                <h1 style = {{marginTop: 50}}>Your total expenses are ${total.toFixed(2)}!!!</h1>
                <div className = "inputIncome">
                    <h2> Input Monthly Income : </h2>
                    <input onChange = {(e) => {setIncome(e.target.value); setProfit(Number(e.target.value-total).toFixed(2))}}value = {income} placeholder = "income: "></input>
                </div>
                <div className = "profitSection">
                    <div className = "profitHeader">
                        <h3>Net Income</h3>
                    </div>
                    <div className = "showProfit">
                        <h3>${profit}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*{transportation.map((e) => { 
    return (
        <>
            <div>
            <h1>{e.expense}</h1>
            <h1>{e.amount}</h1>
            <button onClick = {()=> handleDelete(e.id, "transportation", e.amount)}>Delete</button>
            </div>
        </>
    );
})}*/

export default Body;