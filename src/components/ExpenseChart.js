import React,{useContext, useState, useEffect} from 'react'
import Chart from "react-google-charts";
import {AppContext} from '../context/AppContext';
import ExpenseList from './ExpenseList';



const ExpenseChart = ({filteredExpenses}) =>{
    //const {expenses} = useContext(AppContext);


    // gets all expenses in array
    const filteredCatEx = filteredExpenses.filter(expense => expense.ex == true);


    const [expenseChartEntry, setExpenseChartEntry] = useState(filteredCatEx);
    
    useEffect(() => {
        setExpenseChartEntry(filteredCatEx)
        
    }, [filteredCatEx])

    // filters rent category
    var rentArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Rent';
    });

    // gets total $ spent on rent
    const rentTotal = rentArr.reduce((rentTotal, item) =>{
        return (rentTotal +=item.cost);
    }, 0);

    var foodArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Food';
    });

    const foodTotal = foodArr.reduce((foodTotal, item) =>{
        return (foodTotal +=item.cost);
    }, 0);

    var utlityArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Utilities';
    });

    const utlityTotal = utlityArr.reduce((utlityTotal, item) =>{
        return (utlityTotal +=item.cost);
    }, 0);

    var savingsArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Savings';
    });

    const savingsTotal = savingsArr.reduce((savingsTotal, item) =>{
        return (savingsTotal +=item.cost);
    }, 0);


    var lifestyleArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Lifestyle';
    });

    const lifestyleTotal = lifestyleArr.reduce((lifestyleTotal, item) =>{
        return (lifestyleTotal +=item.cost);
    }, 0);


    var recreationArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Recreation';
    });

    const recreationTotal = recreationArr.reduce((recreationTotal, item) =>{
        return (recreationTotal +=item.cost);
    }, 0);


    var miscArr = expenseChartEntry.filter(function(expense){
        return expense.cat == 'Miscellaneous';
    });

    const miscTotal = miscArr.reduce((miscTotal, item) =>{
        return (miscTotal +=item.cost);
    }, 0);


    const data = [
        ['Category', '$ Spent'],
        ['Rent', rentTotal],
        ['Food', foodTotal],
        ['Utility', utlityTotal],
        ['Savings', savingsTotal],
        ['Lifestyle', lifestyleTotal],
        ['Recreation',recreationTotal],
        ['Miscellaneous', miscTotal],
    ]

    


    return (
        <>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: 'My Expense Spread',
                }}
                rootProps={{ 'data-testid': '1' }}
                />
            
        </>
    )
    
}

export default ExpenseChart
