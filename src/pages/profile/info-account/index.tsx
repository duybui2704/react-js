import ImgEdit from 'assets/icon/ic_update_user.svg';
import IcSave from 'assets/image/ic_save.svg';
import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import IcCancel from 'assets/image/ic_cancel.svg';

import IcErr from 'assets/image/ic_err.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { InfoUser } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info-account.module.scss';

import { Button } from 'components/button';
import { UserInfoModel } from 'models/user-model';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';

const cx = classNames.bind(styles);

function InfoAccount() {
    const navigate = useNavigate();
    const [info, setInfo] = useState<UserInfoModel>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refBirth = useRef<TextFieldActions>(null);
    const refAddress = useRef<TextFieldActions>(null);
    const refPhone = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        setInfo(InfoUser);
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
            {isMobile &&
                <div className={cx('row space-between y20', 'top')}>
                    <span className={cx('text-black bold h4')}>{info?.username}</span>
                    <img src={IcTwoPeople} />
                </div>}
            <div className={cx('column', 'flex')}>
                {!isEdit ? <>
                    <div className={cx('container', 'shadow')}>
                        <div className={cx('row space-between')}>
                            <span className={cx('text-black h5 bold')}>{Languages.profile.infoAccount}</span>
                            <Button
                                label={Languages.profile.edit}
                                labelStyles={cx('text-white h7 regular')}
                                rightIcon={ImgEdit}
                                containButtonStyles={cx('btn-container')}
                                onPress={onEdit}
                                isLowerCase
                            />
                        </div>
                        {renderItem(Languages.profile.userName, info?.username)}
                        {renderItem(Languages.profile.birthday, info?.birth_date)}
                        {renderItem(Languages.profile.gender, info?.gender)}
                        {renderItem(Languages.profile.phone, info?.phone_number)}
                        {renderItem(Languages.profile.email, info?.email)}
                        {renderItem(Languages.profile.address, info?.address)}
                    </div>
                    <div className={cx('y20 row', 'border-red',)}>
                        <div className={cx('img')}>
                            <img src={IcErr} className={cx('p5')} />
                        </div>
                        <span className={cx('h6 text-red regular')}>{Languages.profile.unconfirmed}</span>
                    </div>
                </>
                    :
                    <>
                        <div className={cx('container-edit', 'shadow')}>
                            <span className={cx('text-black h5 bold')}>{Languages.profile.editAccount}</span>
                            {renderInput(refName, info?.username || '', 'text', Languages.profile.userName, 50, false, 'username')}
                            {renderInput(refBirth, info?.birth_date || '', 'date', Languages.profile.birthday, 50, false, 'birth_date')}
                            {renderInput(refEmail, info?.email || '', 'email', Languages.profile.edit, 50, false, 'email')}
                            {renderInput(refAddress, info?.address || '', 'text', Languages.profile.address, 50, false, 'address')}
                            {renderInput(refPhone, info?.phone_number || '', 'text', Languages.profile.phone, 10, true, 'phone_number')}
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

export default InfoAccount;
