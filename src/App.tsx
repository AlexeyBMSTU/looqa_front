import { BrowserRouter as Router } from 'react-router-dom';
import { RouterController } from './router/RouterController';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <RouterController />
      </div>
    </Router>
  );
}

export default App;
