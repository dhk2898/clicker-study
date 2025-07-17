const Counter = ({onCounterChange, id, value}) => {
  
    return(
        <>
            <h1>{value}</h1>
            <button onClick = {() => onCounterChange(id, 1)}>
                Add
            </button>
            <button onClick = {() => onCounterChange(id, -1)}>
                Subtract
            </button>
        </>
    )
    
}


export default Counter