import React from 'react';

class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
      </tr>
    );
  }
}

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
