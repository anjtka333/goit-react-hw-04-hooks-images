import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ pictures, cbOnClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {pictures.map((picture) => (
        <ImageGalleryItem
          cbOnClick={cbOnClick}
          key={v4()}
          pictureTitle={picture.title}
          pictutesUrl={picture.url}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  cbOnClick: PropTypes.func,
};
export default ImageGallery;
