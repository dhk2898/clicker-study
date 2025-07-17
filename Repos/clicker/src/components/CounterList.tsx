import Counter from './Counter.tsx'

const CounterList = ({counters, onCounterChange}) => {
    return(
        <ul>
            {counters.map(counter => (
                <li key = {counter.id}>
                    <Counter onCounterChange = {onCounterChange} id = {counter.id} value = {counter.value}/>
                </li>
            ))}
        </ul>
    );
}

export default CounterList