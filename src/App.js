import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { createMuiTheme } from '@material-ui/core/styles';
// import theme from './theme';
import routes from './routes';

const theme = {
  colors: {
    primary: 'red'
  }
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
