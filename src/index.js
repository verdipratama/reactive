import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="home" style={{ textAlign: 'center', marginTop: '200px' }}>
          <h1>Welcome to Reactive</h1>
          <h2>Happy coding :)</h2>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
