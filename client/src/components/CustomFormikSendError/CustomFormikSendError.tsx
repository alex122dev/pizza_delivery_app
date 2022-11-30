import React from 'react';
import styles from './CustomFormikSendError.module.scss';

interface IProps {
  message: string;
}

export const CustomFormikSendError: React.FC<IProps> = ({ message }) => {
  return (
    <p className={styles.errMessage}>
      Try again, please. Some error occured: {message}
    </p>
  );
};
