import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { Route } from "react-router";
import Navi from "./layouts/Navi";
import RegisterPage from "./pages/javascriptFiles/RegisterPage";
import LoginPage from "./pages/javascriptFiles/LoginPage";
import Home from "./pages/javascriptFiles/Home";
import JobAdvertisementDetail from "./pages/javascriptFiles/JobAdvertisementDetail";
import UnconfirmedJobAdvertisementList from "./pages/javascriptFiles/UnconfirmedJobAdvertisementList";
import CurriculumVitaeUpdate from "./pages/javascriptFiles/CurriculumVitaeUpdate";
import JobAdvertisementAdd from "./pages/javascriptFiles/JobAdvertisementAdd";
import CurriculumVitaeDetail from "./pages/javascriptFiles/CurriculumVitaeDetail";
import { Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navi />
      <Container className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route
            exact
            path="/jobAdvertisements/add"
            component={JobAdvertisementAdd}
          />
          <Route
            exact
            path="/jobAdvertisements/:id"
            component={JobAdvertisementDetail}
          />
          <Route
            exact
            path="/unconfirmedJobAdvertisements"
            component={UnconfirmedJobAdvertisementList}
          />
          <Route
            exact
            path="/curriculumVitae/:id"
            component={CurriculumVitaeDetail}
          />
          <Route
            exact
            path="/curriculumVitae/update/:id"
            component={CurriculumVitaeUpdate}
          />
        </Switch>
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
