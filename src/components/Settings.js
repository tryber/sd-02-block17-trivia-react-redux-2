import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import loadCategory from '../actions/loadCategory';
import updateSettings from '../actions/updateSettings';
import '../components/style/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    const { returnCategoryName } = this.props;
    const categories = 'api_category.php';
    returnCategoryName(categories);
  }

  handleOnChange(name, value) {
    this.setState({ [name]: value });
  }

  questionCategory(categories) {
    return (
      <select
        name="category"
        data-testid="question-category-dropdown"
        onChange={(e) => this.handleOnChange(e.target.name, e.target.value)}
      >
        <option key="key" value="any">Any Category</option>
        {categories.trivia_categories
          .map((categoryObject) =>
            <option key={categoryObject.name} value={categoryObject.id}>
              {categoryObject.name}
            </option>,
        )}
      </select>
    );
  }

  difficulty() {
    return (
      <select
        name="difficulty"
        data-testid="question-difficulty-dropdown"
        onChange={(e) => this.handleOnChange(e.target.name, e.target.value)}
      >
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    );
  }

  type() {
    return (
      <select
        name="type"
        data-testid="question-type-dropdown"
        onChange={(e) => this.handleOnChange(e.target.name, e.target.value)}
      >
        <option value="any"> Any Type</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True/False</option>
      </select>
    );
  }

  render() {
    const { categories, categoryLoad, changeSettings } = this.props;
    if (!categoryLoad) return (<div><Loading /></div>);
    if (categories !== undefined) {
      return (
        <div className="settings-container">
          <h1 className="title">Settings</h1>
          <div className="select">
            {this.questionCategory(categories)}
          </div>
          <div className="select">
            {this.difficulty()}
          </div>
          <div className="select">
            {this.type()}
          </div>
          <Link to="/">
            <button
              type="button"
              className="save-settings"
              onClick={() => changeSettings(this.state)}
            >
              Play with this settings
            </button>
          </Link>
        </div>
      );
    }
    return (<div>Nothing found</div>);
  }
    }

const mapStateToProps = ({ loadReducer: { categoryLoad, categories } }) => ({
  categoryLoad,
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  returnCategoryName: (categories) => dispatch(loadCategory(categories)),
  changeSettings: (settings) => dispatch(updateSettings(settings)),
});

Settings.defaultProps = {
  categories: [],
};

Settings.propTypes = {
  returnCategoryName: PropTypes.func.isRequired,
  categories: PropTypes.instanceOf(Object),
  changeSettings: PropTypes.func.isRequired,
  categoryLoad: PropTypes.bool,
};

Settings.defaultProps = {
  categoryLoad: false,
  categories: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
