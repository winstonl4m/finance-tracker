import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import {AppContext} from '../context/AppContext';
import ExpenseChart from './ExpenseChart';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


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
    }

    const categories = [
        {
            value: 'All',
            label: 'All',
        },
        {
            value: 'Miscellaneous',
            label: 'Miscellaneous',
        },
        {
            value: 'Rent',
            label: 'Rent',
        },
        {
            value: 'Food',
            label: 'Food',
        },
        {
            value: 'Utilities',
            label: 'Utilities',
        },
        {
            value: 'Savings',
            label: 'Savings',
        },
        {
            value: 'Lifestyle',
            label: 'Lifestyle',
        },
        {
            value: 'Recreation',
            label: 'Recreation',
        },
    ];

    
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
                    <TextField 
                        id = 'standard-select-currency' 
                        select
                        label = 'Select'
                        helperText ="Please select the Category"
                        value = {catVal} 
                        onChange ={handleCatChange}>

                        {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                         ))}
                    </TextField>
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
            <ExpenseChart filteredExpenses = {filteredExpenses}></ExpenseChart>
        </>
    );
};

export default ExpenseList;