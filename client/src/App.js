import "./App.css";
import { Fragment } from "react";
import LoginWrapper from "./components/LoginWrapper";
function App() {
  return (
    <Fragment>
      <div className="container">
        <LoginWrapper></LoginWrapper>
      </div>
    </Fragment>
  );
}

export default App;
