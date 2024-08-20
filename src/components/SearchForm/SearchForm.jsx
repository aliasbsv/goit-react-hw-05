import css from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const queryValue = form.elements.query.value.trim();

    onSearch(queryValue);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Enter movie name"
      />
      <button className={css.button} type="submit">
        Find movie
      </button>
    </form>
  );
};

export default SearchForm;
