import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import Settings from './components/Settings';
import './App.css';

const App = () => (
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

export default App;
