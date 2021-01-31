import React from 'react';

/* https://velog.io/@bitalkil/Destructuring-assignment%EA%B5%AC%EC%A1%B0-%EB%B6%84%ED%95%B4-%ED%95%A0%EB%8B%B9 */

class BusinessName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: '개발자의품격' };
  }

  changeBrand = () => {
    this.setState({ brand: 'Sayho' });
  };

  render() {
    const { brand } = this.state;
    return (
      <div>
        <h1>{brand}</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.changeBrand}
        >
          Change Brand
        </button>
      </div>
    );
  }
}

export default BusinessName;
