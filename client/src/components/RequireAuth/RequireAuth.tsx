import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface IProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export const RequireAuth: React.FC<IProps> = ({ children, requiredRoles }) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={'/signin'} replace={true} state={{ from: location }} />
    );
  }

  const userRoles = user.roles.map((role) => role.value);
  const isAccess = requiredRoles?.every((role) => userRoles.includes(role));

  if (requiredRoles && !isAccess) {
    return (
      <Navigate to={'/noaccess'} replace={true} state={{ from: location }} />
    );
  }

  return <>{children}</>;
};
