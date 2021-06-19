import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "semantic-ui-react";
import Navi from "./layouts/Navi";
import RegisterPage from "./pages/javascriptFiles/RegisterPage";
import LoginPage from "./pages/javascriptFiles/LoginPage";
import Home from "./pages/javascriptFiles/Home";
import { Route } from "react-router";
import JobAdvertisementDetail from "./pages/javascriptFiles/JobAdvertisementDetail";
import AddJobAdvertisement from "./pages/javascriptFiles/AddJobAdvertisement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnconfirmedJobAdvertisementList from "./pages/javascriptFiles/UnconfirmedJobAdvertisementList";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/jobAdvertisements/:id" component={JobAdvertisementDetail}/>
        <Route path="/addJobAdvertisement" component={AddJobAdvertisement} />
        <Route path="/unconfirmedJobAdvertisements" component={UnconfirmedJobAdvertisementList}/>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop
        closeOnClick={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
