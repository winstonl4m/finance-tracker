import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContext';

const  AddExpenseForm = () =>{
    const {dispatch} = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const [ex,setEx] = useState(true);

    //const [buttonText, setButtonText] = useState("Expense");


    const toggleExpense = (event) => {
        event.preventDefault();
        setEx(value => !value);
    }

    const onSubmit = (event) => {
        event.preventDefault();


        const expense = {
            id: Math.random()*1000,
            name: name,
            cost: ex ? parseInt(cost) : parseInt(cost)*-1,
            ex: ex,
        };



        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense,
        });

        setName('');
        setCost('');
        setEx(true);
    };

    return (
        <form onSubmit = {onSubmit}> 
            <div className = 'row'>
                <div className = 'col-sm'>
                    <label>Name</label>
                    <input
                        required = 'required'
                        type = 'text'
                        className = 'form-control'
                        id = 'name'
                        value = {name}
                        onChange = {(event) => setName(event.target.value)}
                        >
                    </input>
                </div>
                <div className = 'row'>
                    <label>Value</label>
                    <input
                        required = 'required'
                        type = 'number'
                        className = 'form-control'
                        id = 'cost'
                        value = {cost}
                        onChange = {(event) => setCost(event.target.value)}
                        >
                    </input>
                </div>

                <div className = 'col'> 
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