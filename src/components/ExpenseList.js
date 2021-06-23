import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import {AppContext} from '../context/AppContext';

const ExpenseList = () =>{
    const { expenses } = useContext(AppContext);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

    useEffect(() => {
        setFilteredExpenses(expenses);
        saveLocalExpenses();
    }, [expenses]);

    const handleChange = (event) =>{
        const searchResults = expenses.filter((filteredExpenses) =>
            filteredExpenses.name.toLowerCase().includes(event.target.value)
        );
        setFilteredExpenses(searchResults);
    }
    
    useEffect(()=>{
        getLocalExpenses();
    },[]);


    //local storage
    const saveLocalExpenses = () =>{
        localStorage.setItem("expensesStorage", JSON.stringify(expenses));
    };
  
    const getLocalExpenses = () => {
      if(localStorage.getItem("expensesStorage") === null){
        localStorage.setItem("expensesStorage", JSON.stringify([]));
      }
      else{
        let expensesLocal = JSON.parse(localStorage.getItem("expensesStorage"));
        setFilteredExpenses(expensesLocal);
      }
    };


    return (
        <>
            <input 
                type ='text'
                className = 'form-control mb-2 mr-sm-2'
                placeholder = 'Type to Search..'
                onChange = {handleChange}
            />



            <ul className = 'list-group mt-3 mb-3'>
                {filteredExpenses.map((expense) =>(
                    <ExpenseItem 
                        id = {expense.id} 
                        name = {expense.name} 
                        cost = {expense.cost}
                        key = {expense.id}
                        ex = {expense.ex}
                        
                    />
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;