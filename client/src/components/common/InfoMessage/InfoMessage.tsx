import styles from './InfoMessage.module.scss';

type PropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const InfoMessage: React.FC<PropsType> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={[styles.item, className].join(' ')} {...props}>
      {children}
    </p>
  );
};
