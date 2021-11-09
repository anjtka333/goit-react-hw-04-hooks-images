import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ pictureTitle, pictutesUrl, cbOnClick }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => cbOnClick(pictutesUrl, pictureTitle)}
    >
      <img
        src={pictutesUrl}
        alt={pictureTitle}
        className={s["ImageGalleryItem-image"]}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  pictureTitle: PropTypes.string,
  pictutesUrl: PropTypes.string,
  cbOnClick: PropTypes.func,
};

export default ImageGalleryItem;
