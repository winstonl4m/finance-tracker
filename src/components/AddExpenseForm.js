import React, { useContext, useState,useEffect } from 'react';
import {AppContext} from '../context/AppContext';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const  AddExpenseForm = () =>{
    const {dispatch} = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const [ex,setEx] = useState(true);

    const [cat, setCat] = useState('');

    const [confirm, setConfirm] = useState(false);

    // useEffect(() => {
    //     if(confirm === true){
    //         const expense = {
    //             id: Math.random()*1000,
    //             name: name,
    //             cost: ex ? parseInt(cost) : parseInt(cost)*-1,
    //             ex: ex,
    //             cat: cat,
    //         };
    
    
    //         dispatch({
    //             type: 'ADD_EXPENSE',
    //             payload: expense,
    //         });
    //         setConfirm(false)
    //     }
    // }, [confirm])


    
    const categories = [
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
        //setConfirm(true);
        
    };


    
    


    return (
        <form onSubmit = {onSubmit}> 
            <div className = 'row'>
                <div className = 'col-sm'>
                    
                    <TextField
                        label = 'Enter Item Name'
                        required = {true}
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
                        required = {true}
                        type = 'number'
                        className = 'form-control'
                        id = 'cost'
                        value = {cost}
                        onChange = {(event) => setCost(event.target.value)}
                        >
                    </TextField>
                </div>
                <div className = 'col-sm'>        
                    <TextField 
                        id = 'standard-select-currency' 
                        required = {true}
                        select
                        label = 'Select'
                        helperText ="Please select the Category"
                        value = {cat} 
                        onChange ={(event) => setCat(event.target.value)}>

                        {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                         ))}
                    </TextField>
                </div>
     
                <div className = 'col-sm'>   
                    <FormGroup>
                        <FormControlLabel 
                            type = 'required'
                            control ={
                                <Switch
                                    checked={ex}
                                    id = 'ex'
                                    value = {ex}
                                    onChange = {toggleExpense}                                   
                                    color = 'primary'
                                />}
                            label = {ex ? "Expense" : "Income"}
                            />            
                    </FormGroup>
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