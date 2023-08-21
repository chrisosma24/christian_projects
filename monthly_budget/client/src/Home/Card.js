import React, {useState} from "react";
import "./Card.css";
import axios from "axios";
import Delete from "../Images/delete-removebg-preview.png";
import Add from "../Images/add.png";
import {useNavigate} from "react-router-dom";

function Card({category, expenses, setExpenses, expenseTotal, setExpenseTotal, total, setTotal}){

    const [expenseInput, setExpenseInput] = useState("");
    const [amountInput, setAmountInput] = useState();
    const navigate = useNavigate();

    function createExpense(){
        const params = {category: category.toLowerCase(), expense: expenseInput, amount: Number(amountInput)};
        axios.get("/create_expense", {params})
        .then((response) => {
            axios.get("/get_expenses")
            .then((response) => {
                const newCategory = category.toLowerCase();
                const totalExpenses = response.data.expenses;
                const newArray = totalExpenses.filter(e => e.category === newCategory);
                setExpenses(newArray);
            })
            .catch((error) => {
                navigate("/login");
                console.log(error);
            })
        })
        .catch((error) => {
            navigate("/login");
            console.log(error);
        });

        setExpenseTotal(expenseTotal + Number(amountInput));
        setTotal(total + Number(amountInput));
        setExpenseInput("");
        setAmountInput(""); 
    }

    function handleDelete(id, amount){
        const params = {id: id};
        axios.get("/delete_expense", {params})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            navigate("/login");
            console.log(error);
        });

        const newArray = expenses.filter(e => e.id !== id);
        setExpenses(newArray);
        setExpenseTotal(expenseTotal - amount);
        setTotal(total - amount);
    }

    return (
        <div className = "card">
            <div className = "cardHeader">
                <h3>{category}</h3>
            </div>
            <div className = "columnNames">
                <h3 style = {{marginLeft: 5}}>Expense</h3>
                <h3 style = {{marginLeft: 80}}>Amount</h3>
            </div>
            <div className = "expenseSection">
                {expenses.map((e) => {
                    return (
                        <div className = "expenseRow">
                            <h3 className = "firstRow" style = {{marginLeft: 5}} >{e.expense}</h3>
                            <h3 className = "secondRow" >{e.amount}</h3>
                            <img onClick = {()=>handleDelete(e.id, e.amount)}className = "deleteImage" src = {Delete} alt = "delete"></img>
                        </div>
                    )
                })}
            </div>
            <div className = "totalExpense">
                <h3>Total Expense : </h3>
                <h3>$ {expenseTotal.toFixed(2)}</h3>
            </div>
            <div className = "addExpense">
                <input value = {expenseInput} onChange = {(e)=>setExpenseInput(e.target.value)}className = "expenseInput" placeholder = "expense: "></input>
                <input value = {amountInput} onChange = {(e) =>setAmountInput(e.target.value)} className = "amountInput" placeholder = "amount :"></input>
                <img onClick = {createExpense} className = "addImage" src = {Add} alt = "add"></img>
            </div>
        </div>
    );
}

export default Card;