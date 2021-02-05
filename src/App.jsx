import React from 'react';
import Header from './components/layout/header.jsx';
import Authentication from './components/layout/authentication.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Authentication />
      </div>
    );
  }
}
export default App;
