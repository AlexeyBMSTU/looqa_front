import { observer } from 'mobx-react-lite';
import { counterStore } from '../store/CounterStore';
import styles from './Counter.module.css';

export const Counter = observer(() => (
  <div className={styles.counter}>
    <h2>Counter: {counterStore.count}</h2>
    <button onClick={() => counterStore.increment()}>+</button>
    <button onClick={() => counterStore.decrement()}>-</button>
  </div>
));