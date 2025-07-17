import {useState, useReducer, useRef, useEffect} from 'react'
import CounterList from './CounterList.tsx'

const CounterManager = () => {
    let nextId = useRef(0);
    const initialState = {autoTicking: false, counters: []};
    const [state, dispatch] = useReducer(counterReducer, initialState);
    const intervalRef = useRef(null);

    function handleAddCounter(){
        dispatch({
            type: "counter-instance-added",
            newId: nextId.current++
        })
    }

    function handleRemoveCounter(){
        dispatch({
            type: "counter-instance-removed"
        })
    }

    function handleCounterChange(id, amount){
        dispatch({
            type: "counter-value-changed",
            id,
            amount 
        });
    }

    function handleGlobalCounterChange(amount){
        dispatch({
            type: "counter-value-changed-global",
            amount
        })
    }

    function handleRandomize() {
        dispatch({
            type: "counter-value-changed-global-random"
        })
    }

    function handleReset(){
        dispatch({
            type: "counter-value-reset-global"
        })
    }

    function handleToggleAutoTick() {
        dispatch({ 
            type: 'counter-toggle-auto-tick' 
        })
    }

    useEffect(() => {
        if (state.autoTicking) {
            intervalRef.current = setInterval(() => {
            dispatch({ type: 'counter-value-changed-global', amount: 1 });}, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);}, 
        [state.autoTicking]);


    return(
        <>
            <h1>Tick Tock!</h1>
            <h1>Total:{state.counters.reduce((sum, c) => sum + c.value, 0)}</h1>
            <button onClick ={() => handleAddCounter()}>Add Counter!</button>
            <button onClick ={() => handleRemoveCounter()}>Subtract Counter!</button>
            <button onClick ={() => handleGlobalCounterChange(1)}>Increment All Counters!</button>
            <button onClick ={() => handleGlobalCounterChange(-1)}>Decrement All Counters!</button>
            <button onClick ={() => handleRandomize()}> Randomize Counter Values! </button>
            <button onClick ={() => handleReset()}> Reset Counter Values! </button>
            <button onClick ={() => handleToggleAutoTick()}> {state.autoTicking ? 'Stop Auto Tick' : 'Start Auto Tick'}</button>
            <CounterList counters = {state.counters} onCounterChange={handleCounterChange}/>
        </>
    )
    
}

function counterReducer(state, action) {
  switch (action.type) {
    case "counter-toggle-auto-tick": {
      return {
        ...state,
        autoTicking: !state.autoTicking
      };
    }

    case "counter-instance-added": {
      return {
        ...state,
        counters: [
          ...state.counters,
          { id: action.newId, value: 0 }
        ]
      };
    }

    case "counter-instance-removed": {
      return {
        ...state,
        counters: state.counters.slice(0, -1)
      };
    }

    case "counter-value-changed": {
      return {
        ...state,
        counters: state.counters.map(counter =>
          counter.id === action.id
            ? { ...counter, value: Math.max(0, counter.value + action.amount)}
            : counter
        )
      };
    }

    case "counter-value-changed-global": {
      return {
        ...state,
        counters: state.counters.map(counter => ({
          ...counter,
          value: Math.max(0, counter.value + action.amount)
        }))
      };
    }

    default:
      return state;
  }
}

export default CounterManager