import React, { useEffect, useState } from 'react';
import { Preloader } from '../common/Preloader/Preloader';
import styles from './ImagePreview.module.scss';

interface IProps {
    image: File | string;
}

export const ImagePreview: React.FC<IProps> = ({ image }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (typeof image !== 'string') {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(image);
        }
    }, [image]);

    return (
        <>
            {preview ? (
                <div className={styles.previewImage}>
                    <img src={preview} alt='image' />
                </div>
            ) : (
                <Preloader />
            )}
        </>
    );
};
