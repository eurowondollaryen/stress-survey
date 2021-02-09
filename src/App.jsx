import React from 'react';
import Header from './components/layout/header.jsx';
import Authentication from './components/layout/authentication.jsx';

class App extends React.Component {
  render() {
    const [user, setUser] = useState(null);
    const authenticated = user != null;

    const login = ({ email, password }) => setUser(signIn({ email, password }));
    const logout = () => setUser(null);
    return (
      <div>
        <Header />
        <Authentication />
      </div>
    );
  }
}
export default App;
