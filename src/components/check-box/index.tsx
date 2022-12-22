import classNames from 'classnames/bind';
import { ItemPropsModel } from 'models/item-props-model';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './check-box.module.scss';
import Validate from 'utils/validate';

export type CheckBoxProps = {
    title?: string,
    data?: ItemPropsModel[],
    groupCheckBoxContainer?: any,
    groupInputContainer?: any,
    titleCheckBoxStyle?: any,
    onChangeText?: (event?: any) => any;
    titleContainer?: any;
};

export type CheckBoxAction = {
    getValue?: (text?: string | number) => void,
    setValue?: (text?: string) => void,
    clearValue?: () => void
};

const cx = classNames.bind(styles);

const CheckBox = forwardRef<CheckBoxAction, CheckBoxProps>(({ title, onChangeText, groupCheckBoxContainer }: CheckBoxProps, ref: any) => {
    const [arraySelect, setArraySelect] = useState<Array<string>>([]);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const orgTextInput = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');

    const [isCheck, setIsCheck] = useState<boolean>(false);

    // useEffect(() => {
    //     if (onChangeText && isFocus) {
    //         onChangeText?.(selectedInput, item?.ti);
    //     }
    // }, [isFocus, selectedInput]);

    const focus = useCallback(() => {
        if (orgTextInput.current) {
            orgTextInput.current?.focus();
        }
        setIsFocus(true);
    }, []);

    const clearValue = useCallback(() => {
    }, []);

    useImperativeHandle(ref, () => ({
        getValue,
        clearValue
    }));

    const getValue = useCallback(() => {
        return arraySelect;
    }, [arraySelect]);

    const renderItemCheckbox = useCallback((_title?: string, value?: any) => {
        const onChange = (e: any) => {
            onChangeText?.(e);
            setIsCheck(!isCheck);
        };
        return (
            <div className={cx('container')}>
                <input
                    type='checkbox'
                    id={'k'}
                    // value={item?.value}
                    onFocus={focus}
                    onChange={onChange}
                    checked={isCheck}
                />
                <label htmlFor={'k'} className={cx('check-mark')}></label>
            </div>
        );
    }, [focus, isCheck, onChangeText]);

    return (
        <div className={cx(groupCheckBoxContainer || 'group-check-box-container')}>
            {renderItemCheckbox(title)}
            <span className={cx('title-check-box')}>{title}</span>
        </div>
    );
});

export default CheckBox;
