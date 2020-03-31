import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

import Category from '../components/Category';
import Type from '../components/Type';
import Difficulty from '../components/Difficulty';
import loadCategory from '../actions/loadCategory'
import '../style/Settings.css';

class Settings extends Component {

  componentDidMount() {
    const { returnCategoryName } = this.props;
    const categories = 'api_category.php';
    returnCategoryName(categories)
  }

  render() {
    const { categoryLoad, categories, errorCategory } = this.props;
    if (categories !== undefined) {
      console.log(categories)
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
          {/* <Link to="/">
            <button type="button" className="save-settings">Play with this settings</button>
          </Link> */}
        </div>
      );
    }
    return (<div><Loading /></div>)
  }
    }
    

const mapStateToProps = ({ loadReducer: { categoryLoad, categories, errorCategory }}) => ({
  categoryLoad,
  categories,
  errorCategory,
});

const mapDispatchToProps = (dispatch) => ({
  returnCategoryName: (categories) => dispatch(loadCategory(categories)),
});


export default connect(mapStateToProps, mapDispatchToProps) (Settings);
