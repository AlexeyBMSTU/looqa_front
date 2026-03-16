import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './pages/home/Footer/Footer';
import { RouterController } from './router/RouterController';
import { Navbar } from './shared/components/Navbar/Navbar';

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
