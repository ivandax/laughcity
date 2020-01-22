import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, Route 
} from 'react-router-dom';

import Welcome from './pages/Welcome';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Welcome}></ Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
