import React, { useState } from 'react';
import { Preloader } from '../common/Preloader/Preloader';
import styles from './ImagePreview.module.scss';

interface IProps {
    file: File;
}

export const ImagePreview: React.FC<IProps> = ({ file }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const reader = new FileReader();
    reader.onload = () => {
        setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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
