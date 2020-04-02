import propTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home';
import Game from './components/Game';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';
import Settings from './components/Settings';
import './App.css';


class App extends Component {
  componentDidMount() {
    const { player } = this.props;
    localStorage.setItem('player', JSON.stringify(player));
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props;
    if (prevProps.player !== player) {
      localStorage.setItem('player', JSON.stringify(player));
    }
  }

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

const mapStateToProps = ({
  player }) => ({
    player,
  });

export default connect(mapStateToProps)(App);

App.propTypes = {
  player: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};
