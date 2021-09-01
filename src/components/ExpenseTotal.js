import React, {useContext} from 'react';
import {AppContext} from '../context/AppContext';



const ExpenseTotal = () =>{
    const {expenses} = useContext(AppContext);

    var incomeArr = expenses.filter(function(expense){
        return expense.ex === false;
    });

    var expenseArr = expenses.filter(function(expense){
        return expense.ex === true;
    });

    const incomeTotal = incomeArr.reduce((incomeTotal, item) =>{
        return (incomeTotal +=item.cost);
    }, 0);

    const expenseTotal = expenseArr.reduce((expenseTotal, item) =>{
        return (expenseTotal +=item.cost);
    }, 0);

    


    return (
        <>
        <div className = 'alert alert-danger'>
            <span> Spent so far : ${expenseTotal}</span>
        </div>

        <div className = 'alert alert-primary'>
            <span> Saved so far : ${-1*incomeTotal}</span>
        </div>
        </>

    );
};

export default ExpenseTotal;