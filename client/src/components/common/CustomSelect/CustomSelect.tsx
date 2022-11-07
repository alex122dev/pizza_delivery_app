import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';

export type OptionType = {
    value: any;
    label: string | number;
};

type PropsType = {
    selected: string | number;
    setSelected: (value: string) => void;
    options: OptionType[];
    startPlaceholder?: string;
    firstChecked?: boolean;
    whiteBtn?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const CustomSelect: React.FC<PropsType> = ({
    selected,
    setSelected,
    options,
    startPlaceholder = 'Make your choice',
    firstChecked = false,
    whiteBtn = false,
    className,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);
    const selectRef = useRef<null | HTMLDivElement>(null);

    const handleKeyDown = (value: any) => (e: React.KeyboardEvent) => {
        switch (e.key) {
            case ' ':
            case 'SpaceBar':
            case 'Enter':
                e.preventDefault();
                setSelected(value);
                setIsActive(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!isActive) return;

        const handleClick = (e: Event) => {
            if (!selectRef.current) return;
            if (!selectRef.current.contains(e.target as HTMLElement)) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isActive]);

    return (
        <div
            ref={selectRef}
            {...props}
            className={cn(styles.body, {
                [styles.active]: isActive,
                [className as string]: className,
            })}
        >
            <button
                type='button'
                onClick={(e) => setIsActive(!isActive)}
                className={styles.btn}
            >
                <span className={styles.chosen}>
                    {selected
                        ? options.find((option) => option.value === selected)
                              ?.label
                        : startPlaceholder}
                </span>
                <span className={styles.arrow} />
            </button>
            <ul className={styles.content}>
                {options.map((option) => (
                    <li
                        key={option.label}
                        tabIndex={isActive ? 0 : -1}
                        onKeyDown={handleKeyDown(option.value)}
                        onClick={(e) => {
                            setSelected(option.value);
                            setIsActive(false);
                        }}
                        className={styles.option}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
