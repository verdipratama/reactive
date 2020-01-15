import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';

import './styles/index.scss';
import Layout from './layouts/Layout';

export default class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        type: 'dark',

        primary: {
          light: '#757ce8',
          main: '#1db954',
          dark: '#191414',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ff7961',
          main: '#ffffff',
          dark: '#191414',
          contrastText: '#000'
        }
      },
      typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['"Lato"', 'sans-serif'].join(',')
      }
    });

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
