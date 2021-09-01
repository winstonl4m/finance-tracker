import { createContext, useReducer } from "react";




const AppReducer = (state,action) =>{
    switch (action.type){
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                ),
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        default: 
            return state;
    }
};

//1. SETS INITIAL STATE
const initialState = {
    budget: JSON.parse(localStorage.getItem('budgetValue')),
    expenses: JSON.parse(localStorage.getItem('expensesStorage'))
    
};

//2. CREATES CONTEXT, IMPORTS COMPONENT AND GETS STATE
export const AppContext = createContext();


//3. PROVIDER COMPONENT : WRAPS THE COMPONENTS WE WANT TO GIVE ACCESS TO THE STATE
// ACCEPTS CHILDREN
export const AppProvider = (props) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value = {{
                budget : state.budget,
                expenses : state.expenses,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};