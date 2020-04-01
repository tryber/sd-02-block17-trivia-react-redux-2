import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';
import Home from './components/Home';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import Settings from './components/Settings';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/settings" component={Settings} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/ranking" component={Ranking} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
