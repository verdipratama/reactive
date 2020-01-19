import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.scss';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
