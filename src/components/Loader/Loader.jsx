import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({
  size = 80,
  colors = ['#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500'],
}) => {
  return (
    <div className={css.loader}>
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={colors}
      />
    </div>
  );
};
export default Loader;
