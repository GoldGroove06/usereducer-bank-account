import "./styles.css";
import {useReducer} from "react";


const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,

};

function reducer(state, action) {
  switch(action.type){
    case "openAccount":
      return {...state, isActive : true, balance:500}

    case "closeAccount":
      return (state.balance === 0 && state.loan === 0)  ? initialState : {...state}

    case "deposit":
      return {...state, balance: state.balance + action.payload}

    case "withdraw":
       return state.balance > 0 ? {...state, balance: state.balance - action.payload} : {...state}
    
    case "requestLoan":
      return state.loan === 0 ? {...state, loan:5000, balance: state.balance + 5000} : {...state}   

    case "payLoan":
        return {...state, loan:0, balance: state.balance - state.loan}
  }

}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    balance,
    loan,
    isActive,
   } = state
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => {dispatch({type: "openAccount" })}} disabled={isActive ? true : false}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => {dispatch({type: "deposit", payload: 150 })}} disabled={isActive ? false : true}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => {dispatch({type: "withdraw", payload: 50 })}} disabled={isActive ? false : true}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => {dispatch({type: "requestLoan" })}} disabled={isActive ? false : true}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => {dispatch({type: "payLoan" })}} disabled={isActive ? false : true}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => {dispatch({type: "closeAccount" })}} disabled={isActive ? false : true}>
          Close account
        </button>
      </p>
    </div>
  );
}
