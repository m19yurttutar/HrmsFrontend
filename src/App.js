import "./App.css";
import "semantic-ui-css/semantic.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Navi from "./layouts/Navi";
import Dashboard from "./layouts/Dashboard";
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main">
        <Dashboard/>
      </Container>
    </div>
  );
}

export default App;
