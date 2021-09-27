import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { AuthProvider } from "./contexts/Auth";
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <AuthProvider>
          <Switch>
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/login" component={Login} />
            <Route path="/app" component={Layout} />
            <Redirect exact from="/" to="/login" />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
