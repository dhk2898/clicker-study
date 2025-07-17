import {useState, useReducer, useRef} from 'react'
import CounterList from './CounterList.tsx'

const CounterManager = () => {
    let nextId = useRef(0);
    const initialCounters = [];
    const [total, setTotal] = useState(0);
    const [counters, dispatch] = useReducer(counterReducer, initialCounters)

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

    return(
        <>
            <h1>Tick Tock!</h1>
            <button onClick ={() => handleAddCounter()}>Add Counter!</button>
            <button onClick ={() => handleRemoveCounter()}>Subtract Counter!</button>
            <button onClick ={() => handleGlobalCounterChange(1)}>Increment All Counters!</button>
            <button onClick ={() => handleGlobalCounterChange(-1)}>Decrement All Counters!</button>
            <button onClick ={() => handleRandomize()}> Randomize Counter Values! </button>
            <button onClick ={() => handleReset()}> Reset Counter Values! </button>
            <CounterList counters = {counters} onCounterChange={handleCounterChange}/>
        </>
    )
    
}

function counterReducer(counters, action){
    switch(action.type){
        case "counter-value-changed": {
            return counters.map(counter =>
                counter.id === action.id
                ? { ...counter, value: counter.value + action.amount }
                : counter
            );
        }
        case "counter-value-changed-global": {
            return counters.map(counter =>
                ({ ...counter, value: counter.value + action.amount })
            );
        }
        case "counter-value-changed-global-random":{
            return counters.map(counter =>
                ({ ...counter, value: Math.floor(Math.random()*10) })
            );
        }
        case "counter-value-reset-global":{
            return counters.map(counter =>
                ({ ...counter, value: 0})
            );
        }
        case "counter-instance-added":{
            return ([
            ...counters,
            {
                id: action.newId,
                value:0
            }
            ]);
        }
        case "counter-instance-removed":{
            return counters.slice(0, -1);
        }
        default:
            return counters;
    }
}


export default CounterManager