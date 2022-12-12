import classNames from 'classnames/bind';
import React, { useCallback, useMemo } from 'react';
import styles from './button.module.scss';
import { ButtonProps, BUTTON_STYLES } from './types';

const cx = classNames.bind(styles);

export const Button = ({
    label,
    isLoading,
    onPress,
    disabled,
    isLowerCase,
    leftIcon,
    tag,
    buttonStyle,
    containButtonStyles,
    customStyles,
    width,
    rightIcon,
    rightIconStyles
}: ButtonProps) => {

    const _onPress = useCallback(() => {
        onPress?.(tag || label);
    }, [label, onPress, tag]);

    const containerStyle = useMemo<any>(() => {
        let style: string;

        switch (buttonStyle) {
            case BUTTON_STYLES.RED:
                style = styles.btn_red;
                break;
            case BUTTON_STYLES.GREEN_WHITE:
                style = styles.btn_green_white;
                break;
            case BUTTON_STYLES.GREEN:
                style = styles.btn_green;
                break;
            case BUTTON_STYLES.GRAY:
            default:
                style = styles.btn_gray;
                break;
        }
        return `${style}`;
    }, [buttonStyle]);

    const mergerLabelStyle = useMemo<any>(() => {
        let style: string;

        switch (buttonStyle) {
            case BUTTON_STYLES.GREEN_WHITE:
                style = styles.btn_txt_green;
                break;
            default:
                style = styles.btn_txt_white;
                break;
        }

        return `${style}`;
    }, [buttonStyle]);

    return (
        <button
            disabled={isLoading || disabled}
            className={cx(`${containerStyle} ${containButtonStyles ? containButtonStyles : ''}`)}
            style={{ ...customStyles, width: width + '%' }}
            onClick={_onPress}
        >
            {leftIcon}
            {
                label && <span className={cx(`${mergerLabelStyle}`)}>
                    {isLowerCase ? label : `${label}`.toUpperCase()}
                </span>
            }
            {rightIcon &&
                <img
                    src={rightIcon}
                    className={rightIconStyles ? cx(`${rightIconStyles}`) : cx('icon-right-styles')}
                />}
        </button>
    );
};


