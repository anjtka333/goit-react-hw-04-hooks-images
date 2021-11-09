import { Component } from "react";
import s from "./Searchbar.module.css";
import PropTypes from "prop-types";

class Serchbar extends Component {
  state = {
    searchQ: "",
  };

  search = (e) => {
    this.setState({ searchQ: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQ);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s["SearchForm-button-label"]}>Search</span>
          </button>
          <input
            className={s["SearchForm-input"]}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQ}
            onChange={this.search}
          />
        </form>
      </header>
    );
  }
}

Serchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Serchbar;
