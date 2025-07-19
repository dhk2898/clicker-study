import Counter from './Counter.tsx'

type CounterData = {
  id: number;
  value: number;
};

type CounterListProps = {
  counters: CounterData[];
  onCounterChange: (id: number, amount: number) => void;
};

const CounterList = ({counters, onCounterChange}: CounterListProps) => {
    return(
        <div className = "counterGrid">
            {counters.map(counter => (
                <div key = {counter.id}>
                    <Counter onCounterChange = {onCounterChange} id = {counter.id} value = {counter.value}/>
                </div>
            ))}
        </div>
    );
}

export default CounterList