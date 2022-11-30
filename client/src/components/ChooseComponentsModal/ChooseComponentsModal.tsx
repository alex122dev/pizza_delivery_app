import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { CloseButton } from '../CloseButton/CloseButton';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { ComponentCard } from '../ComponentCard/ComponentCard';
import styles from './ChooseComponentsModal.module.scss';

interface IProps {
  isActive: boolean;
  setIsActive: (b: boolean) => void;
  componentIds: number[];
  setFieldValue: (value: number[]) => void;
}

export const ChooseComponentsModal: React.FC<IProps> = ({
  isActive,
  setIsActive,
  componentIds,
  setFieldValue,
}) => {
  const components = useAppSelector((state) => state.components.allComponents);
  const [checked, setChecked] = useState(componentIds);

  useEffect(() => {
    setChecked(componentIds);
  }, [isActive]);

  const renderComponents = () => {
    return components.map((c) => {
      return (
        <ComponentCard
          onClick={(e) => {
            if (checked.includes(c.id)) {
              setChecked(checked.filter((id) => id !== c.id));
            } else {
              setChecked([...checked, c.id]);
            }
          }}
          key={c.id}
          component={c}
          isChecked={checked.includes(c.id) || false}
          isNeedActiveState={true}
        />
      );
    });
  };

  return (
    <ModalWindow isActive={isActive} setIsActive={setIsActive}>
      <div className={styles.modalBody}>
        <CloseButton
          className={styles.closeModalBtn}
          onClick={(e) => setIsActive(false)}
        />
        <h2 className={styles.modalTitle}>Add Components To Product</h2>
        <div className={styles.components}>{renderComponents()}</div>
        <CustomButton
          startColor='green'
          className={styles.addBtn}
          onClick={(e) => {
            setFieldValue(checked);
            setIsActive(false);
          }}
        >
          Add To Product
        </CustomButton>
      </div>
    </ModalWindow>
  );
};
