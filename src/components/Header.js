import React, { Component } from 'react';
import imageLink from '../service/hashConverter';
import { connect } from 'react-redux';

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
          {configButton && <div className="config-button">
            <button data-testid="config-button" />
          </div> }
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

export default connect(mapStateToProps)(Header);
