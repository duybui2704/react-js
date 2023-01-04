import ImgEdit from 'assets/icon/ic_update_user.svg';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';

import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { InfoBank } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info-payment.module.scss';

import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { BankModel } from 'models/user-model';

const cx = classNames.bind(styles);

function InfoPayment() {
    const navigate = useNavigate();
    const [info, setInfo] = useState<BankModel>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refName = useRef<TextFieldActions>(null);
    const refNumber = useRef<TextFieldActions>(null);
    const refBank = useRef<PickerAction>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        setInfo(InfoBank);
    }, []);

    const renderItem = useCallback((title: string, value?: string) => {
        return (
            <div className={cx('row space-between')}>
                <span className={cx('h6 text-gray bold')}>{title}</span>
                <span className={cx('h6 text-gray regular')}>{value}</span>
            </div>
        );
    }, []);



    const renderInput = useCallback((_ref: any, value: string, type: string, label?: string, maxLength?: number, disabled?: boolean, key?: string) => {

        const onChange = () => {
            setInfo(
                (last) => {
                    const newObj = last;
                    if (key) {
                        newObj[key] = _ref.current?.getValue();
                    }
                    return newObj;
                }
            );
        };

        return (
            <MyTextInput
                ref={_ref}
                value={value}
                type={type}
                label={label}
                disabled={disabled}
                containerStyle={cx('y15')}
                onChangeText={onChange}
                maxLength={maxLength}
                placeHolder={label}
            />
        );
    }, []);

    const onSave = useCallback(() => {
        console.log('info ===', info);
    }, [info]);

    const oncancel = useCallback(() => {
        setIsEdit(last => !last);
    }, []);

    const onEdit = useCallback(() => {
        setIsEdit(last => !last);
    }, []);

    return (
        <div className={cx('colum content')}>
            <div className={cx('column', 'flex')}>
                {!isEdit ? <>
                    <div className={cx('container', 'shadow')}>
                        <div className={cx('row space-between')}>
                            <span className={cx('text-black h5 bold')}>{Languages.profile.infoPayment}</span>
                            <Button
                                label={Languages.profile.edit}
                                labelStyles={cx('text-white h7 regular')}
                                rightIcon={ImgEdit}
                                containButtonStyles={cx('btn-container')}
                                onPress={onEdit}
                                isLowerCase
                            />
                        </div>
                        {renderItem(Languages.profile.accountName, info?.account_name)}
                        <div className={cx('line', 'y15')}></div>
                        {renderItem(Languages.profile.accountNumber, info?.account_number)}
                        <div className={cx('line', 'y15')}></div>
                        {renderItem(Languages.profile.bank, info?.name_bank)}
                    </div>
                </>
                    :
                    <>
                        <div className={cx('container-edit', 'shadow')}>
                            <span className={cx('text-black h4 bold')}>{Languages.profile.editAccount}</span>
                            <PickerComponent
                                ref={refBank}
                                data={[]}
                                title={Languages.profile.bank}
                                defaultValue={info.name_bank}
                                placeholder={Languages.profile.bank}
                                mainContainer={cx('y15', 'picker-container')}
                                titleItemPickerText={'text-gray h7 regular b5'}
                                isImportant
                            />
                            {renderInput(refName, info?.account_name || '', 'text', Languages.profile.accountName, 50, false, 'account_name')}
                            {renderInput(refNumber, info?.account_number || '', 'phone', Languages.profile.accountName, 50, false, 'account_number')}
                            <span className={cx('h7 regular text-gray y10')}>{Languages.profile.nodeBank}</span>
                            <div className={cx('wid-100', 'row y20')}>
                                <Button
                                    label={Languages.common.save}
                                    labelStyles={cx('text-white h7 regular')}
                                    rightIcon={IcSave}
                                    containButtonStyles={cx('btn-container', 'padding')}
                                    isLowerCase
                                    onPress={onSave}
                                />
                                <Button
                                    label={Languages.common.cancel}
                                    labelStyles={cx('text-red h7 bold')}
                                    rightIcon={IcCancel}
                                    containButtonStyles={cx('btn-cancel', 'padding')}
                                    isLowerCase
                                    onPress={oncancel}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>

    );
}

export default InfoPayment;
