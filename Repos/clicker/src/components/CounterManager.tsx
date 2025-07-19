import {useReducer, useRef, useEffect} from 'react'
import CounterList from './CounterList.tsx'

//#region Custom Type Definitions
type Counter = {
  id: number;
  value: number;
}

type State = {
  autoTicking: boolean;
  counters: Counter[];
}

type Action =
| { type: "counter-toggle-auto-tick" }
| { type: "counter-instance-added"; newId: number }
| { type: "counter-instance-removed" }
| { type: "counter-value-changed"; id: number; amount: number }
| { type: "counter-value-changed-global"; amount: number }
| { type: "counter-value-changed-global-random" }
| { type: "counter-value-reset-global" }
| { type: "reset-has-changed"};
//#endregion

const CounterManager = () => {
  let nextId = useRef<number>(0);
  const initialState: State = {autoTicking: false, counters: []};
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const total = state.counters.reduce((sum, c) => sum + c.value, 0)
    
  //#region event handlers
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
    //#endregion event handlers

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
      <div className = "container">
        <div className = "headers">
          <h1>Clicker</h1>
          <h1>Clicker</h1>
        </div>
        <div className = "headers">
          <h2>Total: {total}</h2>
          <h2>Total: {total}</h2>
        </div>

          <div className = "buttonGroup">
            <button onClick ={() => handleAddCounter()}>Add Counter</button>
            <button onClick ={() => handleRemoveCounter()}>Subtract Counter</button>
            <button onClick ={() => handleGlobalCounterChange(1)}>Increment All Counters</button>
            <button onClick ={() => handleGlobalCounterChange(-1)}>Decrement All Counters</button>
            <button onClick ={() => handleRandomize()}> Randomize Counter Values</button>
            <button onClick ={() => handleReset()}> Reset Counter Values</button>
            <button onClick ={() => handleToggleAutoTick()}> {state.autoTicking ? 'Stop Auto Tick' : 'Start Auto Tick'}</button>
          </div>
          <CounterList counters = {state.counters} onCounterChange={handleCounterChange}/>
      </div>
  )
    
}

function counterReducer(state: State, action: Action) {
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
        hasChanged: true,
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

    case "counter-value-changed-global-random":{
        return{
        ...state,
        counters: state.counters.map(counter => ({
            ...counter,
            value: Math.floor(Math.random()*10)
        }))
      };
    }

    case "counter-value-reset-global":{
        return{
        ...state,
        counters: state.counters.map(counter => ({
            ...counter,
            value: 0
        }))
      };
    }

    case "reset-has-changed": {
      return {
        ...state, 
        hasChanged: false
      };
    }
    default:
      return state;
  }
}

export default CounterManager