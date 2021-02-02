import React from 'react';
import PropTypes from 'prop-types';

class Row extends React.Component {
  render() {
    const { name, email } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
      </tr>
    );
  }
}

Row.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};
Row.defaultProps = {
  name: 'john',
  email: 'sss@dsd',
};

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  myChangeHandler = e => {
    this.setState({ username: e.target.value });
  };

  doSave = () => {
    const { username } = this.state;
    alert(username);
  };

  render() {
    const data = [
      { name: 'A', email: 'a' },
      { name: 'B', email: 'b' },
      { name: 'C', email: 'c' },
    ];
    const rows = data.map(row => <Row name={row.name} email={row.email} />);
    const { username } = this.state;
    return (
      <div>
        <p>
          Enter your name:
          {username}
        </p>
        <input type="text" onChange={this.myChangeHandler} />
        <button type="button" className="btn btn-primary" onClick={this.doSave}>
          Save
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default About;
