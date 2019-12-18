import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import './styles/index.scss';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="home">
            <h1>Welcome to Reactive</h1>
            <h2>Happy coding :)</h2>
          </div>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
