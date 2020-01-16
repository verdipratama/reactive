import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';

import routes from './routes';
import './styles/index.scss';

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
          <CssBaseline>
            <Router>
              <div>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={props => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      }}
                    />
                  );
                })}
              </div>
            </Router>
          </CssBaseline>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
