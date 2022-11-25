import React, { useEffect, useRef, useState } from 'react';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import ReactCrop, { Crop } from 'react-image-crop';
import styles from './CropImageModal.module.scss';
import { Preloader } from '../common/Preloader/Preloader';
import 'react-image-crop/src/ReactCrop.scss';
import { CustomButton } from '../common/CustomButton/CustomButton';

interface IProps {
    imageFile: File | undefined;
    isActive: boolean;
    setIsActive: (b: boolean) => void;
    setResult: (file: File) => void;
}

export const CropImageModal: React.FC<IProps> = ({
    isActive,
    setIsActive,
    imageFile,
    setResult,
}) => {
    const basicCrop: Crop = {
        unit: 'px',
        width: 500,
        height: 281.25,
        x: 25,
        y: 25,
    };

    const [crop, setCrop] = useState<Crop>(basicCrop);

    const [image, setImage] = useState('');
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imageFile) {
            setCrop(basicCrop);
            setImage('');
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    useEffect(() => {
        if (!isActive) {
            imgRef.current && cropImageNow(imgRef.current);
        }
    }, [isActive]);

    const renderConfirmBtn = () => {
        return (
            <CustomButton
                startColor='green'
                onClick={(e) => {
                    imgRef.current && cropImageNow(imgRef.current);
                    setIsActive(false);
                }}
            >
                Confirm
            </CustomButton>
        );
    };

    const cropImageNow = (image: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        canvas.toBlob((blob: Blob | null) => {
            if (blob && imageFile) {
                const fileName =
                    imageFile.name.split('.').slice(0, -1).join('.') + '.jpeg';
                const file = new File([blob], fileName, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                });
                setResult(file);
            }
        }, 'image/jpeg');
    };

    return (
        <ModalWindow isActive={isActive} setIsActive={setIsActive}>
            <div className={styles.container}>
                <div className={styles.image}>
                    {!image && <Preloader />}
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        aspect={16 / 9}
                        minWidth={500}
                        keepSelection={true}
                    >
                        {image && <img ref={imgRef} src={image} alt='image' />}
                    </ReactCrop>
                </div>
                {renderConfirmBtn()}
            </div>
        </ModalWindow>
    );
};
