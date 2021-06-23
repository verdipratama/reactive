import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, AboutPage, ErrorPage } from './components/pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={AboutPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
