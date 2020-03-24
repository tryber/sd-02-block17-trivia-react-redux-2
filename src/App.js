import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Loading from './components/Loading';
import Home from './components/Home';

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
})

export default connect(mapStateToProps)(App);
