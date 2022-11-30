import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { BackButton } from '../BackButton/BackButton';
import { CloseButton } from '../CloseButton/CloseButton';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import styles from './OrderAuthModal.module.scss';

interface IProps {
  isActive: boolean;
  setIsActive: (b: boolean) => void;
  isOrderConfirmed: boolean;
  setIsOrderConfirmed: (b: boolean) => void;
}

enum SelectedFormComponent {
  none = 'none',
  signIn = 'signin',
  signUp = 'signup',
}

export const OrderAuthModal: React.FC<IProps> = ({
  isActive,
  setIsActive,
  isOrderConfirmed,
  setIsOrderConfirmed,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [formComponent, setFormComponent] = useState(
    SelectedFormComponent.none,
  );

  useEffect(() => {
    if (user) {
      setFormComponent(SelectedFormComponent.none);
    }
  }, [user]);

  const renderCloseButton = () => {
    return (
      <CloseButton
        className={styles.closeModalBtn}
        onClick={(e) => {
          setIsActive(false);
          setTimeout(() => {
            isOrderConfirmed && setIsOrderConfirmed(false);
          }, 300);
        }}
      />
    );
  };

  const renderOpenFormButton = (
    text: string,
    selectedComponent: SelectedFormComponent,
  ) => {
    return (
      <CustomButton
        startColor='blue'
        onClick={(e) => setFormComponent(selectedComponent)}
      >
        {text}
      </CustomButton>
    );
  };

  const renderAuthButtons = () => {
    if (user || formComponent !== SelectedFormComponent.none) {
      return null;
    }

    return (
      <div className={styles.authButtons}>
        {renderOpenFormButton('Sign In', SelectedFormComponent.signIn)}
        {renderOpenFormButton('Sign Up', SelectedFormComponent.signUp)}
      </div>
    );
  };

  const renderBackButton = () => {
    if (formComponent === SelectedFormComponent.none) {
      return null;
    }

    return (
      <BackButton
        onClick={(e) => {
          setFormComponent(SelectedFormComponent.none);
        }}
      />
    );
  };

  const renderSuccessButton = () => {
    if (!user) {
      return null;
    }

    return (
      <CustomButton
        startColor='green'
        className={styles.successBtn}
        onClick={(e) => {
          setIsActive(false);
          setTimeout(() => {
            isOrderConfirmed && setIsOrderConfirmed(false);
          }, 300);
        }}
      >
        Ok
      </CustomButton>
    );
  };

  const renderTitle = (text: string) => {
    return <h2 className={styles.modalTitle}>{text}</h2>;
  };

  return (
    <ModalWindow isActive={isActive} setIsActive={setIsActive}>
      <div className={styles.container}>
        <div className={styles.body}>
          {renderBackButton()}
          {renderCloseButton()}
          {!isOrderConfirmed &&
            !user &&
            renderTitle('To place an order, you must sign in or sign up!')}
          {!isOrderConfirmed &&
            user &&
            renderTitle('Success! You can place an order.')}
          {isOrderConfirmed &&
            renderTitle(
              'Thank you! Your order is being processed. Our managers will contact you shortly.',
            )}
          {renderAuthButtons()}
          {formComponent === SelectedFormComponent.signIn && <SignInForm />}
          {formComponent === SelectedFormComponent.signUp && <SignUpForm />}
          {renderSuccessButton()}
        </div>
      </div>
    </ModalWindow>
  );
};
