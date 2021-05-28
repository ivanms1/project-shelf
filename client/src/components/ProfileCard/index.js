import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';

import NoPic from './NoPic';
import { Dropzone } from './ProfileDropZone';
import BannerPopUp from '../ProfileBanner/BannerPopUp';

import { ReactComponent as Edit } from './../../assets/edit.svg';
import { ReactComponent as MultipleUsers } from './../../assets/multiple-users.svg';
import { ReactComponent as Email } from './../../assets/email.svg';
import { ReactComponent as MapPin } from './../../assets/map-pin.svg';
import { ReactComponent as Bookmark } from './../../assets/bookmark-black.svg';
import { ReactComponent as City } from './../../assets/city.svg';
import { ReactComponent as Link } from './../../assets/link.svg';
import { ReactComponent as Calendar } from './../../assets/calendar.svg';
import { ReactComponent as Clock } from './../../assets/clock.svg';

import {
  Wrapper,
  PROFILE_PIC_EDIT_WRAPPER,
  PROFILE_CARD,
  PROFILE_PIC,
  PROFILE_NAME,
  UserName,
  DATES_WRAPPER,
  Follow,
  PROFILE_DETAILS,
  FOLLOWERS_WRAPPER,
  FOLLOW_DETAILS,
  FOLLOW_ICON,
  Details,
  FLEX_ROW,
} from './style';

function Index(props) {
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
    <Wrapper>
      <PROFILE_CARD>
        <div style={{ position: 'relative' }}>
          <PROFILE_PIC>
            {preview == null && <NoPic />}

            {croppedImageUrl && (
              <img src={croppedImageUrl} alt={croppedImageUrl} />
            )}
          </PROFILE_PIC>
          <PROFILE_PIC_EDIT_WRAPPER>
            <Dropzone accept='image/*' onDrop={(e) => handleImage(e)}>
              <Edit />
            </Dropzone>
          </PROFILE_PIC_EDIT_WRAPPER>
        </div>

        <PROFILE_NAME>Miroz Devkota</PROFILE_NAME>
        <UserName>@ revengemiroz</UserName>

        <DATES_WRAPPER>
          <div className='dates'>
            <FOLLOW_ICON>
              <Calendar />
            </FOLLOW_ICON>
            <span className='date'>2021-05-20</span>
          </div>

          <div className='dates'>
            <FOLLOW_ICON>
              <Clock />
            </FOLLOW_ICON>
            <span className='date'>1996-05-20</span>
          </div>
        </DATES_WRAPPER>

        <Follow>Follow</Follow>
      </PROFILE_CARD>

      <PROFILE_DETAILS>
        <FOLLOWERS_WRAPPER>
          <FOLLOW_DETAILS>
            <FOLLOW_ICON>
              <MultipleUsers />
            </FOLLOW_ICON>
            <span className='followNumber'>25</span>
            <span className='followText'>followers</span>
          </FOLLOW_DETAILS>
          <FOLLOW_DETAILS>
            <span className='followNumber'>15</span>
            <span className='followText'>following</span>
          </FOLLOW_DETAILS>
          <FOLLOW_DETAILS>
            <span className='followNumber'>12</span>
            <FOLLOW_ICON>
              <Bookmark />
            </FOLLOW_ICON>
          </FOLLOW_DETAILS>
        </FOLLOWERS_WRAPPER>

        <Details>
          <FLEX_ROW>
            <FOLLOW_ICON>
              <City />
            </FOLLOW_ICON>
            <span>Kathmandu</span>
          </FLEX_ROW>
          <FLEX_ROW>
            <MapPin />
            <span>Nepal</span>
          </FLEX_ROW>
          <FLEX_ROW>
            <FOLLOW_ICON>
              <Email />
            </FOLLOW_ICON>
            <span>mirozxy@gmail.com</span>
          </FLEX_ROW>
          <FLEX_ROW>
            <FOLLOW_ICON>
              <Link />
            </FOLLOW_ICON>
            <span>mirozdevkota.com.np</span>
          </FLEX_ROW>
        </Details>
      </PROFILE_DETAILS>

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
    </Wrapper>
  );
}

export default Index;
