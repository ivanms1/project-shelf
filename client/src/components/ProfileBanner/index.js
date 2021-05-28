import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';

import { Dropzone } from './BannerDropZone';
import BannerPopUp from './BannerPopUp';
import NoBanner from './NoBanner';

import { PROFILE_BANNER_WRAPPER, PROFILE_BANNER, EDIT_WRAPPER } from './style';
import 'react-image-crop/dist/ReactCrop.css';

import { ReactComponent as Edit } from './../../assets/edit.svg';

function Index() {
  const [submitModelIsOpen, setSubmitModelIsOpen] = useState(false);
  const openSubmitModal = () => setSubmitModelIsOpen(true);
  const closeSubmitModal = () => setSubmitModelIsOpen(false);

  const [preview, setPreview] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30 });
  const imgRef = useRef();

  async function handleImage(event) {
    if (!event.length) {
      return null;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onabort = () => alert('failed');
    reader.onerror = () => console.log('error');
    reader.onload = async () => {
      setPreview(reader.result);
      openSubmitModal();
    };
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  async function makeClientCrop(crop) {
    if (imgRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(imgRef, crop, 'newFile.jpeg');
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(img, crop) {
    const canvas = document.createElement('canvas');
    const image = img.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  }

  return (
    <PROFILE_BANNER_WRAPPER>
      <EDIT_WRAPPER>
        <Dropzone accept='image/*' onDrop={(e) => handleImage(e)}>
          <Edit />
        </Dropzone>
      </EDIT_WRAPPER>

      <PROFILE_BANNER>
        {preview == null && <NoBanner />}

        {croppedImageUrl && (
          <img
            src={croppedImageUrl}
            alt={croppedImageUrl}
            onClick={() => window.open('/profile-page', '_blank')}
          />
        )}
      </PROFILE_BANNER>

      <BannerPopUp isOpen={submitModelIsOpen} onRequestClose={closeSubmitModal}>
        <ReactCrop
          src={preview}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => {
            makeClientCrop(c);
          }}
        />
      </BannerPopUp>
    </PROFILE_BANNER_WRAPPER>
  );
}

export default Index;
