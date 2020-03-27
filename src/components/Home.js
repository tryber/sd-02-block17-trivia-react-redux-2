import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', name: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <div>
          <button data-testid="config-button" />
        </div>
        <div>
          <p>Email do Gravatar:</p>
          <input name="email" value={email} onChange={this.handleChange} data-testid="input-gravatar-email" />
        </div>
        <div>
          <p>Nome do Jogador:</p>
          <input name="name" value={name} onChange={this.handleChange} data-testid="input-player-name" />
        </div>
        <div>
          <button disabled={(name && email) ? '' : 'disabled'} data-testid="btn-play">JOGAR!</button>
        </div>
      </div>
    );
  }
}

export default Home;
