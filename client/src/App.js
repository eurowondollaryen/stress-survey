import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminMainPage from "./components/AdminMainPage";
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [token, setToken] = useState();
  //when not logged in
  if(!token) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} setToken={setToken}/>
          <Route exact path="/login" component={LoginPage} setToken={setToken}/>
          <Route path="*" component={NotFoundPage}/>
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
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
  
}

export default App;
