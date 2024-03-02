import { Header, Content, Footer } from './pages';
import styles from './App.module.scss';

function App() {

  function fetchData() {
    fetch("http://localhost:5000/get-cookie", { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error("Ошибка сети!");
        }
        return response.text();
      })
      .then(data => console.log('Значение куки: ', data))
      .catch(error => console.error("Произошла ошибка!"))
  }

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={fetchData}>Get cookie</button>
      <Content />
      <Footer />
    </div>
  )
}

export default App