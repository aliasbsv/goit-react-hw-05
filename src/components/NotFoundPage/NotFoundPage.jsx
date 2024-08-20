import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section>
      <NavLink to="/">Back to homepage</NavLink>
      <p>
        It seems you've landed on a page that doesn't exist. It may have been
        moved or deleted. Please check the URL for accuracy or return to the
        homepage.
      </p>
    </section>
  );
};

export default NotFoundPage;
