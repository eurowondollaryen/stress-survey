import React from 'react';

import BusinessName from './bussinessname.jsx';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <BusinessName brand="개발자의품격" />
        <ul className="list-group">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    );
  }
}

export default Contact;
