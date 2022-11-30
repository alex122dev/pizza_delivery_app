import React from 'react';
import styles from './BackButton.module.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

export const BackButton: React.FC<IProps> = ({ className, ...props }) => {
  return (
    <button
      type='button'
      className={[styles.backBtn, className].join(' ')}
      {...props}
    >
      <span />
    </button>
  );
};
