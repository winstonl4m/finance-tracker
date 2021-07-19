import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContext';
import { TextField } from '@material-ui/core';

const  AddExpenseForm = () =>{
    const {dispatch} = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const [ex,setEx] = useState(true);

    const [cat, setCat] = useState('');



    const toggleExpense = (event) => {
        event.preventDefault();
        setEx(value => !value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(cost < 0){
            alert("Cost cannot be negative!")
            return
        }


        const expense = {
            id: Math.random()*1000,
            name: name,
            cost: ex ? parseInt(cost) : parseInt(cost)*-1,
            ex: ex,
            cat: cat,
        };

    



        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setCost('');
        setEx(true);
        
    };

    const isNeg = () =>{
        if(cost < 0){
            alert("Cost cannot be negative!")
        }
    }

    return (
        <form onSubmit = {onSubmit}> 
            <div className = 'row'>
                <div className = 'col-sm'>
                    
                    <TextField
                        label = 'Enter Item Name'
                        required = 'required'
                        type = 'text'
                        className = 'form-control'
                        id = 'name'
                        value = {name}
                        onChange = {(event) => setName(event.target.value)}
                        >
                    </TextField>
                </div>
                <div className = 'col-sm'>                    
                    <TextField
                        label = 'Enter Cost'
                        required = 'required'
                        type = 'number'
                        className = 'form-control'
                        id = 'cost'
                        value = {cost}
                        onChange = {(event) => setCost(event.target.value)}
                        >
                    </TextField>
                </div>
                <div className = 'col-sm'>
                    <label>Category: </label>
                    <select id = 'cat' value = {cat} onChange ={(event) => setCat(event.target.value)}>
                        <option value = 'Miscellaneous'>Miscellaneous</option>
                        <option value = 'Rent'>Rent</option>
                        <option value = 'Food'>Food</option>
                        <option value = 'Utilities'>Utilities</option>
                        <option value = 'Savings'>Savings</option>
                        <option value = 'Lifestyle'>Lifestyle</option>
                        <option value = 'Recreation'>Recreation</option>
                    </select>
                </div>
     
                <div className = 'col-sm'>    
                    <button 
                        type = 'required'
                        className = {ex ? 'btn btn-danger mt-3' : 'btn btn-success mt-3'}
                        id = 'ex'
                        value = {ex}
                        onClick = {toggleExpense}
                        >
                        {ex ? "Expense" : "Income"}
                    </button>
                </div>
                
            </div>


            <div className = 'row'> 
            
                <div className = 'col-sm'>
                    <button type = 'submit' className = 'btn btn-primary mt-3'>
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddExpenseForm;