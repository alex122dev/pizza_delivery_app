import React from 'react'
import styles from './CloseButton.module.scss'

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    className?: string
}

export const CloseButton: React.FC<IProps> = ({ className, ...props }) => {

    return <button type='button' className={[styles.closeBtn, className].join(' ')} {...props} />
}
