import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

export default class App extends Component {
  render() {
    return (
      <div className="home">
        <h1 style={{ textAlign: 'center' }}>Hello Reactive</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
