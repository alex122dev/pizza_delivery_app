import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm/SignInForm';
import { useAppSelector } from '../../hooks/redux';
import styles from './SignIn.module.scss';

interface IProps {}

export const SignIn: FC<IProps> = ({}) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const from = location.state?.from;

  if (user) {
    return <Navigate to={from || '/home'} replace={true} />;
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
