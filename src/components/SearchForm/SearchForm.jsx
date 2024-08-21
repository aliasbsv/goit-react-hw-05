import { useState } from 'react';
import css from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(query.trim());
    setQuery('');
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter movie name"
      />
      <button className={css.button} type="submit">
        Find movie
      </button>
    </form>
  );
};

export default SearchForm;
