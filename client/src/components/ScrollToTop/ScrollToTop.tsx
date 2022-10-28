import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}

export const ScrollToTop: React.FC<IProps> = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{children}</>
};
