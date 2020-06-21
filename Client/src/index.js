import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.scss";
import "./index.css";
import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Adminlogin from "./Components/Admin/Adminlogin";
import Courses from "./Components/Admin/Courses";
import Questions from "./Components/Admin/Questions";
import AdminPanel from "./Components/Admin/AdminPanel";
import Teachers from "./Components/Admin/Teachers";
import Departments from "./Components/Admin/Departments";
import Results from "./Components/Admin/Results";
import About from "./Components/User/About";
import Home from "./Components/User/Home";
import StudentLogin from "./Components/User/StudentLogin";
import NotFoundPage from "./NotFoundPage";
import StudentPanel from "./Components/User/StudentPanel";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Tokens from "./Components/Admin/Tokens";
import Setting from "./Components/Admin/Setting";
import axios from "axios";
import HttpsRedirect from "react-https-redirect";
import ProtectedRoute from "./Containers/Admin/protectedRoute";
import ProtectedRouteUser from "./Containers/Admin/protectedRouteUser";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `/users/`;
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";
ReactDOM.render(
  <HttpsRedirect>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Adminlogin" component={Adminlogin} />
        <ProtectedRoute exact path="/Courses" component={Courses} />
        <ProtectedRoute exact path="/Questions" component={Questions} />
        <ProtectedRoute exact path="/Tokens" component={Tokens} />
        <ProtectedRoute exact path="/AdminPanel" component={AdminPanel} />
        <ProtectedRoute exact path="/Teachers" component={Teachers} />
        <ProtectedRoute exact path="/Departments" component={Departments} />
        <ProtectedRoute exact path="/Results" component={Results} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Studentlogin" component={StudentLogin} />
        <ProtectedRouteUser
          exact
          path="/Studentpanel"
          component={StudentPanel}
        />
        <ProtectedRoute exact path="/Setting" component={Setting} />
        <Route component={NotFoundPage} />
      </Switch>
      <NotificationContainer />
    </Router>
  </HttpsRedirect>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
