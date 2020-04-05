import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import imageLink from '../service/hashConverter';

function Ranking() {
  const { gravatarEmail } = this.props;
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const playersScore = ranking.map((player) => player.score);
  const scoreRank = playersScore.sort((a, b) => b - a);
  const playersRank = scoreRank.map((score) => ranking.find((player) => player.score === score));
  const leaderboard = playersRank.map((player, position) => (
    <div key={player}>
      <img data-testid={`profile-picture-${position}`} src={imageLink(gravatarEmail)} alt="Game Player" />
      <h4 data-testid={`${player.name}-${position}`}>{player.name}</h4>-
      <p>{player.score} Pontos</p>
    </div>
  ));

  return (
    <div>
      <h1>Ranking</h1>
      {leaderboard}
      <Link to="/">
        <button type="button">Jogar Novamente</button>
      </Link>
    </div>
  );
}

const mapStateToProps = ({ player: { gravatarEmail } }) => ({
  gravatarEmail
});

Ranking.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);