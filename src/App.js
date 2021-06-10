import "./App.css";
import "semantic-ui-css/semantic.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Navi from "./layouts/Navi";
import RegisterPage from './pages/javascriptFiles/RegisterPage'
import LoginPage from "./pages/javascriptFiles/LoginPage";
import Home from "./pages/javascriptFiles/Home";
import { Route } from "react-router";
import JobAdvertisementDetail from "./pages/javascriptFiles/JobAdvertisementDetail";

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main">
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/jobAdvertisements/:id" component={JobAdvertisementDetail} />
      </Container>
    </div>
  );
}

export default App;
