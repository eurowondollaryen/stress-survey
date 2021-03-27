import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminMainPage from "./components/AdminMainPage";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";
//login logic
import { signIn } from "./util/auth";

function App() {
  //login info setting
  const [user, setUser] = useState(null);
  const authenticated = user != null;
  //reference : https://www.daleseo.com/react-router-authentication/
  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);
  console.log(login);
  //when not logged in
  if (!authenticated) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
  //when logged in
  return (
    <Router>
      <div>
        <div className="mainbody">
          <Switch>
            <Route path="/admin/main" component={AdminMainPage} />
            <Route path="/admin" component={AdminMainPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
