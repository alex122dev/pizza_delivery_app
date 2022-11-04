import React from 'react';
import { CustomButton } from '../common/CustomButton/CustomButton';

interface IProps {
    isSubmitting: boolean;
    text: string;
    className?: string;
}

export const CustomFormikSendFormButton: React.FC<IProps> = ({
    isSubmitting,
    text,
    className,
}) => {
    return (
        <CustomButton
            type='submit'
            startColor='green'
            disabled={isSubmitting}
            className={className}
        >
            {text}
        </CustomButton>
    );
};
