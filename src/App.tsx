import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './shared/components/Footer/Footer';
import { RouterController } from './router/RouterController';
import { Navbar } from './shared/components/Navbar/Navbar';
import { ScrollComponent } from './shared/components/ScrollComponent/ScrollComponent';

function App() {
  return (
    <Router>
      <ScrollComponent />
      <Navbar />
      <div className={styles.root}>
        <RouterController />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
