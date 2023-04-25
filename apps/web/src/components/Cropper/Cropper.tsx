import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { getCroppedImg } from './cropUtils';

interface Props {
  src: string;
  image: string;
  setImage: any;
  setCroppedImage: (croppedImage: string | undefined) => void;
  onSubmit: () => void;
}

function App({ src, image, setImage, setCroppedImage, onSubmit }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      getCroppedImg(image, croppedAreaPixels).then((croppedImage) => {
        setCroppedImage(croppedImage?.toDataURL());
      });
    },
    [image, setCroppedImage]
  );

  useEffect(() => {
    setImage(src);
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      const file = event.target?.files?.[0];
      const reader = new FileReader();

      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        setImage(reader.result);
      };
    },
    []
  );

  return (
    <div>
      <div className='crop-container'>
        {image && (
          <ReactCrop
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={5 / 5}
            maxZoom={10}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape='round'
            showGrid={false}
          />
        )}

        <input
          ref={inputRef}
          type='file'
          accept='image/png, image/gif, image/jpeg'
          onChange={handleFileChange}
          className='hidden'
        />
      </div>
      <div className='mt-[20px] w-full flex justify-between'>
        <button
          onClick={() => {
            inputRef.current.click();
          }}
        >
          New
        </button>
        <button
          onClick={() => {
            onSubmit();
          }}
        >
          Save
        </button>

        {src !== image && (
          <button
            onClick={() => {
              setImage(src);
              setCrop({ x: 0, y: 0 });
              setZoom(1);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
