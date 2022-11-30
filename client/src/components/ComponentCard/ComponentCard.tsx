import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { ComponentDto } from '../../dtos/components/component.dto';
import { API_URL } from '../../http/http';
import styles from './ComponentCard.module.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  component: ComponentDto;
  isChecked?: boolean;
  button?: JSX.Element;
  isNeedActiveState: boolean;
}

export const ComponentCard: React.FC<IProps> = ({
  component,
  isChecked,
  onClick,
  button,
  isNeedActiveState,
  ...props
}) => {
  const [isActive, setIsActive] = useState(isChecked);

  useEffect(() => {
    setIsActive(isChecked);
  }, [isChecked]);

  return (
    <div
      key={component.id}
      className={cn(styles.container, { [styles.active]: isActive })}
      onClick={(e) => {
        isNeedActiveState && setIsActive(!isActive);
        onClick && onClick(e);
      }}
      {...props}
    >
      <div className={styles.image}>
        <img src={`${API_URL}/${component.image}`} alt={component.name} />
      </div>
      <h4 className={styles.title}>{component.name}</h4>
      {button}
    </div>
  );
};
