import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './Layout/appbar';
import Articles from './components/articles';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
        <NavBar/>
          <Switch>
            <Route exact path='/' component={Articles}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
