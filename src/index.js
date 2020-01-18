import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.scss';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { createMuiTheme } from '@material-ui/core/styles';
// import theme from './theme';

const theme = {
  colors: {
    primary: 'red'
  }
};

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
