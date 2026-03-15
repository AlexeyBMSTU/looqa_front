import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './pages/home/Footer/Footer';
import { RouterController } from './router/RouterController';

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.root}>
        <RouterController />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
