import React, { useEffect, useState } from 'react';
import 'react-18-image-lightbox/style.css';
import Lightbox from 'react-18-image-lightbox';
import PropTypes from 'prop-types';

function ImageLightBox({ data, trigger }) {
  console.log('data', data);

  const [images, setImages] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      if (!Array.isArray(data)) {
        console.log('array');
        setImages([data]);
      }
      console.log('array');
      if (
        typeof data === 'string' ||
        data instanceof String ||
        data === String
      ) {
        console.log('string');
        setImages([data]);
      }
      console.log('outside');

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

  console.log('images', images);
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
