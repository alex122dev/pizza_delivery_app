import cn from 'classnames';
import styles from './Preloader.module.scss';

type PropsType = {} & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const Preloader: React.FC<PropsType> = ({ className, ...props }) => {
    return (
        <div {...props} className={[styles.preloader, className].join(' ')} />
    );
};
