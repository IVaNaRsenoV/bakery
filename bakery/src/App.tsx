import { Header, Content, Footer } from './pages';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App