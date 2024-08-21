import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={css.notFound}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.message}>
        It seems you&apos;ve landed on a page that doesn&apos;t exist. It may
        have been moved or deleted. Please check the URL for accuracy or return
        to the homepage.
      </p>
      <NavLink to="/" className={css.link}>
        Back to homepage
      </NavLink>
    </section>
  );
};

export default NotFoundPage;
