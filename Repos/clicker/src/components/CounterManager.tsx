import {useState} from 'react'
import CounterList from './CounterList.tsx'

let nextId = 0;
const CounterManager = () => {
    const initialCounters = [];
    const [counters, setCounters] = useState(initialCounters);
    const [total, setTotal] = useState(0);


    function handleAddCounter(){
        setCounters([
            ...counters,
            {
                id: nextId++,
                value:0
            }
        ])
    }

    function handleRemoveCounter(){
        setCounters(prev => prev.slice(0, -1));
    }

    function handleCounterChange(id, amount){
        setCounters(prev => prev.map(
            counter => counter.id === id ? 
            {...counter, value: counter.value + amount} : counter
        ))
    }

    function handleGlobalCounterChange(amount){
        setCounters(prev => prev.map(counter => ({
            ...counter,
            value: counter.value + amount
        })))
    }

    function handleRandomize(){
        setCounters(prev => prev.map(counter => ({
            ...counter,
            value: Math.floor(Math.random() * 10)
        })))
    }

     function handleReset(){
        setCounters(prev => prev.map(counter => ({
            ...counter,
            value: 0
        })))
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


export default CounterManager