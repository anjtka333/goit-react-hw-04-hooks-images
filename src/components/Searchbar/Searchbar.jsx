import { useState } from "react";
import s from "./Searchbar.module.css";

const Serchbar = ({ onSubmit }) => {
  const [searchQ, setSearchQ] = useState("");
  const search = (e) => {
    setSearchQ(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQ);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s["SearchForm-button-label"]}>Search</span>
        </button>
        <input
          className={s["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQ}
          onChange={search}
        />
      </form>
    </header>
  );
};

export default Serchbar;
