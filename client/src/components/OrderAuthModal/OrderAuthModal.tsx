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

export const OrderAuthModal: React.FC<IProps> = ({
    isActive,
    setIsActive,
    isOrderConfirmed,
    setIsOrderConfirmed,
}) => {
    const user = useAppSelector((state) => state.auth.user);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        if (user) {
            setIsSignIn(false);
            setIsSignUp(false);
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

    const renderAuthButtons = () => {
        if (!user && !isSignIn && !isSignUp) {
            return (
                <div className={styles.authButtons}>
                    <CustomButton
                        startColor='blue'
                        onClick={(e) => setIsSignIn(true)}
                    >
                        Sign In
                    </CustomButton>
                    <CustomButton
                        startColor='blue'
                        onClick={(e) => setIsSignUp(true)}
                    >
                        Sign Up
                    </CustomButton>
                </div>
            );
        }

        return null;
    };

    const renderBackButton = () => {
        if (isSignIn || isSignUp) {
            return (
                <BackButton
                    onClick={(e) => {
                        setIsSignIn(false);
                        setIsSignUp(false);
                    }}
                />
            );
        }

        return null;
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

    const renderTitle = () => {
        if (!isOrderConfirmed) {
            return (
                <h2 className={styles.modalTitle}>
                    {user
                        ? 'Success! You can place an order.'
                        : 'To place an order, you must sign in or sign up!'}
                </h2>
            );
        }

        return (
            <h2 className={styles.modalTitle}>
                Thank you! Your order is being processed. Our managers will
                contact you shortly.
            </h2>
        );
    };

    return (
        <ModalWindow isActive={isActive} setIsActive={setIsActive}>
            <div className={styles.container}>
                <div className={styles.body}>
                    {renderBackButton()}
                    {renderCloseButton()}
                    {renderTitle()}
                    {renderAuthButtons()}
                    {isSignIn && !isSignUp && <SignInForm />}
                    {!isSignIn && isSignUp && <SignUpForm />}
                    {renderSuccessButton()}
                </div>
            </div>
        </ModalWindow>
    );
};
