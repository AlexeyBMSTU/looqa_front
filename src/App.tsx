import { BrowserRouter as Router } from 'react-router-dom';
import { RouterController } from './router/RouterController';
import { Navbar } from './components/Navbar/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.root}>
        <RouterController />
      </div>
    </Router>
  );
}

export default App;
