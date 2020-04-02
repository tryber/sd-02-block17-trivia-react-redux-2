import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import EachQuestion from './EachQuestion';

class Game extends Component {
  render() {
    const { dataMock } = this.props;
    return (
      <div>
        <Header />
        <EachQuestion pergunta={dataMock[0]} />
      </div>
    );
  }
}

const mapStateToProps = ({ loadReducer: { dataMock } }) => ({
  dataMock,
});

Game.propTypes = {
  dataMock: PropTypes.array,
};

export default connect(mapStateToProps)(Game);
