import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style/Ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { clearPlayer, clearRequest } = this.props;
    this.setState({
      shouldRedirect: true,
    });
    clearPlayer();
    clearRequest();
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const leaderboard = ranking.map((player, position) => (
      <div className="players" key={player}>
        <img data-testid={`profile-picture-${position}`} src={player.picture} alt="Player's gravatar" />
        <h4 data-testid={`${player.name}-${position}`}>{player.name}</h4>-
        <p>{player.score} Pontos</p>
      </div>
    ));
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="rankWrapper">
        <h1 className="title">Ranking</h1>
        {leaderboard}
        <button onClick={this.handleClick} type="button">Jogar Novamente</button>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, score } }) => ({
  name,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  clearPlayer: () => dispatch({
    type: 'CLEAR_USER_DATA',
  }),
  clearRequest: () => dispatch({
    type: 'CLEAR_REQUEST',
  }),
});

Ranking.propTypes = {
  clearPlayer: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
