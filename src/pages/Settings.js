import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Category from '../components/Category';
import Type from '../components/Type';
import Difficulty from '../components/Difficulty';
import '../style/Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings-container">
        <h1 className="title">Settings</h1>
        <div className="select">
          <Category />
        </div>
        <div className="select">
          <Difficulty />
        </div>
        <div className="select">
          <Type />
        </div>
        <Link to="/">
          <button type="button" className="save-settings">Play with this settings</button>
        </Link>
      </div>
    );
  }
}

export default Settings;
