import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from './components/Loading';
import Home from './components/Home';
import './App.css';

class App extends Component {

  render() {
    const { load } = this.props;
    if (!load) return (<Loading />);
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { load } }) => ({
  load,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  load: propTypes.bool.isRequired,
};
