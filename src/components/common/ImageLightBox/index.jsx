import React, { useEffect, useState } from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

function ImageLightBox({ data, trigger }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      if (!Array.isArray(data)) {
        console.log('array');
        setImages([data]);
      }
      if (
        typeof data === 'string' ||
        data instanceof String ||
        data === String
      ) {
        console.log('string');
        setImages([data]);
      }

      return setImages(data);
    }
    return null;
  }, [data]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  return (
    <div>
      {images.length > 0 && (
        <Lightbox
          mainSrc={images[photoIndex].image}
          nextSrc={images[(photoIndex + 1) % images.length].image}
          prevSrc={
            images[(photoIndex + images.length - 1) % images.length].image
          }
          onCloseRequest={() => trigger(false)}
          onMovePrevRequest={handlePrevious}
          onMoveNextRequest={handleNext}
          reactModalStyle={{ overlay: { zIndex: '99999999' } }}
        />
      )}
    </div>
  );
}
ImageLightBox.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  trigger: PropTypes.func,
};

ImageLightBox.defaultProps = {
  trigger: () => {},
};

export default ImageLightBox;
