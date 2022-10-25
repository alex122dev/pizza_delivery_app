import { FC } from 'react';
import styles from './SignUp.module.scss';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { useAppSelector } from '../../hooks/redux';
import { Navigate } from 'react-router-dom';

interface IProps {}

export const SignUp: FC<IProps> = ({}) => {
    const user = useAppSelector((state) => state.auth.user);

    if (user) {
        return <Navigate to={'/home'} />;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign Up</h2>
            <SignUpForm />
        </div>
    );
};
