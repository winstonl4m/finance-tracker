import React,{useContext, useState} from 'react'
import Chart from "react-google-charts";
import {AppContext} from '../context/AppContext';
import ExpenseList from './ExpenseList';



const ExpenseChart = ({filteredExpenses}) =>{
    //const {expenses} = useContext(AppContext);


    const [expenseChartEntry, setExpenseChartEntry] = useState(filteredExpenses);

    
    





    return (
        <>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Category', '$ Spent'],
                    ['Rent', 11],
                    ['Food', 2],
                    ['Utility', 2],
                    ['Savings', 2],
                    ['Lifestyle', 7],
                    ['Recreation',10],
                ]}
                options={{
                    title: 'My Finance Spread',
                }}
                rootProps={{ 'data-testid': '1' }}
                />
            
        </>
    )
    
}

export default ExpenseChart
