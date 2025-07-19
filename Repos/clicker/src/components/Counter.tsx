type CounterProps = {
  id: number;
  value: number;
  onCounterChange: (id: number, amount: number) => void;
};

const Counter = ({onCounterChange, id, value}: CounterProps) => {
  
    return(
        <div className = "counterCell">
            <h2>{value}</h2>
            <div className = "buttonGroup">
                <button onClick = {() => onCounterChange(id, 1)}>Add</button>
                <button onClick = {() => onCounterChange(id, -1)} disabled = {value <= 0}>Subtract</button>
            </div>
        </div>
    )
    
}


export default Counter