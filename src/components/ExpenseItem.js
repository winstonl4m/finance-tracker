import React, {useContext} from 'react';
import {TiDelete} from 'react-icons/ti';
import {AppContext} from '../context/AppContext';
import "../App.css"

const ExpenseItem = (props) =>{
    const {dispatch} = useContext(AppContext);

    const handleDeleteExpense = () =>{
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };


    return (
        <li className = 'list-group-item d-flex justify-content-between align-items center'>
            {props.name}
            <div>
                <span className = 'badge badge-primary badge-pill mr-3' >
                    {props.cat}
                </span>
                <span className = {props.ex ?'badge badge-danger badge-pill mr-3' :'badge badge-success badge-pill mr-3'}>
                    ${-1*props.cost}
                </span>
                <a>
                <TiDelete size ='1.5em' onClick = {handleDeleteExpense} ></TiDelete>
                </a>
                
            </div>
        </li>
    );
}

export default ExpenseItem;