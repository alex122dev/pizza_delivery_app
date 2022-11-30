import React from 'react';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';

interface IProps {}

export const NoAccess: React.FC<IProps> = ({}) => {
  return <InfoMessage>You do not have access to this page</InfoMessage>;
};
