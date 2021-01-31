import React from 'react';
import Header from './components/layout/header.jsx';
import Content from './components/layout/content.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}
export default App;
