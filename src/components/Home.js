import React, { Component } from 'react';
import { connect } from 'react-redux';
import changeUser from '../actions/userChangeAction';

class Home extends Component {
  render() {
    const { name, gravatarEmail, handleChange } = this.props;
    return (
      <div>
        <div>
          <button data-testid="config-button" />
        </div>
        <div>
          <p>Email do Gravatar:</p>
          <input name="gravatarEmail" onChange={handleChange} data-testid="input-gravatar-email" />
        </div>
        <div>
          <p>Nome do Jogador:</p>
          <input name="name" onChange={handleChange} data-testid="input-player-name" />
        </div>
        <div>
          <button disabled={(name && gravatarEmail) ? '' : 'disabled'} data-testid="btn-play">
            JOGAR!
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail } }) => ({
  name,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => dispatch(changeUser(event.target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
