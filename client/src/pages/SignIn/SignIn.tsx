import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import { useAppSelector } from '../../hooks/redux';
import styles from './SignIn.module.scss';

interface IProps {}

export const SignIn: FC<IProps> = ({}) => {
    const user = useAppSelector((state) => state.auth.user);

    if (user) {
        return <Navigate to={'/home'} />;
    }

    return (
        <div>
            <div className={styles.container}>
                <h2 className={styles.title}>SignIn</h2>
                <SignInForm />
            </div>
        </div>
    );
};
