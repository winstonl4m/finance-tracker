import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import {AppContext} from '../context/AppContext';

const ExpenseList = () =>{
    const { expenses } = useContext(AppContext);

    const [filteredExpenses, setFilteredExpenses] = useState(expenses || []);

    const [catVal, setCatVal] = useState('All');

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

    const handleCatChange = (event) =>{
        setCatVal(event.target.value)
        //console.log("event.target.value: " + event.target.value)
        //console.log("CatVal: " + catVal)


        if(event.target.value === 'All'){
            setFilteredExpenses(expenses);    
        }
        else{
            const searchResults = expenses.filter((filteredExpenses) =>
                filteredExpenses.cat === event.target.value
            );
            setFilteredExpenses(searchResults);
        }
        
        
        
        /*
        switch(catVal){
            case 'Miscellaneous':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Miscellaneous'))
                break;
            case 'Rent':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Rent'))
                break;
            case 'Food':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Food'))
                break;
            case 'Utilities':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Utilities'))
                break;
            case 'Savings':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Savings'))
                break;
            case 'Lifestyle':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Lifestyle'))
                break;
            case 'Recreation':
                setFilteredExpenses(expenses.filter(expense =>expense.cat === 'Recreation'))
                break;
            default:
                setFilteredExpenses(expenses);
                break;
        }
        */
        
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
            <div className = 'row'>
                <div className = 'col'>
                    <input 
                    type ='text'
                    className = 'form-control mb-2 mr-sm-2'
                    placeholder = 'Type to Search..'
                    onChange = {handleChange}
                    />
                </div>

                <div className = 'col'>
                    <label>Filter by Category:</label>
                    <select id= 'catVal' value ={catVal} onChange = {handleCatChange}>
                        <option value = 'All'>All</option>
                        <option value = 'Miscellaneous'>Miscellaneous</option>
                        <option value = 'Rent'>Rent</option>
                        <option value = 'Food'>Food</option>
                        <option value = 'Utilities'>Utilities</option>
                        <option value = 'Savings'>Savings</option>
                        <option value = 'Lifestyle'>Lifestyle</option>
                        <option value = 'Recreation'>Recreation</option>
                    </select>
                </div>
            </div>


            <ul className = 'list-group mt-3 mb-3'>
                {filteredExpenses.map((expense) =>(
                    <ExpenseItem 
                        id = {expense.id} 
                        name = {expense.name} 
                        cost = {expense.cost}
                        key = {expense.id}
                        ex = {expense.ex}
                        cat = {expense.cat}
                        
                    />
                ))}
            </ul>
        </>
    );
};

export default ExpenseList;