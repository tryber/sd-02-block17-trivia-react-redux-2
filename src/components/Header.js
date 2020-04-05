import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import imageLink from '../service/hashConverter';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score, configButton } = this.props;

    return (
      <header>
        <div className="header-left">
          <div className="gravatar-image">
            <img alt="gravatar" src={imageLink(gravatarEmail)} />
          </div>
          <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        </div>
        <div className="header-right">
          <p data-testid="header-score">{`Pontos: ${score}`}</p>
          {configButton && <Link to="/Settings">
          <div className="config-button">
            <button data-testid="config-button" />
          </div>
        </Link> }
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { gravatarEmail, name, score } }) => ({
  gravatarEmail,
  name,
  score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  configButton: PropTypes.bool,
};

Header.defaultProps = {
  configButton: false,
};

export default connect(mapStateToProps)(Header);
