import ImgEdit from 'assets/icon/ic_update_user.svg';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';

import IcErr from 'assets/image/ic_err.svg';
import IcWarning from 'assets/image/ic_yellow_wait_acc.svg';
import IcVerify from 'assets/image/ic_green_verify_acc.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info-account.module.scss';

import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { UserInfoModel } from 'models/user-model';
import { useAppStore } from 'hooks';
import { COLOR_TRANSACTION } from 'commons/constants';
import { BUTTON_STYLES } from 'components/button/types';

const cx = classNames.bind(styles);

function InfoAccount() {
    const navigate = useNavigate();
    const { userManager } = useAppStore();
    const [info, setInfo] = useState<UserInfoModel>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refBirth = useRef<TextFieldActions>(null);
    const refAddress = useRef<TextFieldActions>(null);
    const refPhone = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        setInfo(userManager.userInfo || {});
    }, [userManager.userInfo]);

    const renderItem = useCallback((title: string, value?: string, isLast?: boolean) => {
        return (
            <div className={cx(isLast ? 'item-last-container' : 'item-container')}>
                <span className={cx('h6 text-gray medium')}>{title}</span>
                <span className={cx('h6 text-gray')}>{value}</span>
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

    const renderEditView = useMemo(() => {
        return (
            <div className={cx('container-edit', 'shadow')}>
                <span className={cx('text-black h5 medium')}>{Languages.profile.editAccount}</span>
                {renderInput(refName, info?.full_name || '', 'text', Languages.profile.userName, 50, false, 'username')}
                {renderInput(refBirth, info?.birth_date || '', 'date', Languages.profile.birthday, 50, false, 'birth_date')}
                {renderInput(refEmail, info?.email || '', 'email', Languages.profile.email, 50, false, 'email')}
                {renderInput(refAddress, info?.address || '', 'text', Languages.profile.address, 50, false, 'address')}
                {renderInput(refPhone, info?.phone_number || '', 'text', Languages.profile.phone, 10, true, 'phone_number')}
                <div className={cx('wid-100', 'row y20')}>
                    <Button
                        label={Languages.common.save}
                        rightIcon={IcSave}
                        containButtonStyles={cx('btn-container', 'padding')}
                        buttonStyle={BUTTON_STYLES.GREEN}
                        isLowerCase
                        onPress={onSave}
                    />
                    <Button
                        label={Languages.common.cancel}
                        labelStyles={cx('text-red h7 medium')}
                        rightIcon={IcCancel}
                        containButtonStyles={cx('btn-cancel', 'padding')}
                        buttonStyle={BUTTON_STYLES.RED}
                        isLowerCase
                        onPress={oncancel}
                    />
                </div>
            </div>
        );
    }, [info?.address, info?.birth_date, info?.email, info?.full_name, info?.phone_number, onSave, oncancel, renderInput]);

    const renderStatusAcc = useMemo(() => {
        switch (info?.tinh_trang?.color) {
            case COLOR_TRANSACTION.RED:
                return (
                    <div className={cx('err-container')}>
                        <img src={IcErr} />
                        <span className={cx('err-text')} >{Languages.profile.unConfirmed}</span>
                    </div>
                );
            case COLOR_TRANSACTION.YELLOW:
                return (
                    <div className={cx('warning-container')}>
                        <img src={IcWarning} />
                        <span className={cx('warning-text')} >{Languages.profile.waitConfirmed}</span>
                    </div>
                );
            case COLOR_TRANSACTION.GREEN:
                return (
                    <div className={cx('ticked-container')}>
                        <img src={IcVerify} />
                        <span className={cx('ticked-text')} >{Languages.profile.confirmed}</span>
                    </div>
                );
            default:
                return;
        }
    }, [info?.tinh_trang?.color]);

    const renderAccountInfoView = useMemo(() => {
        return (
            <>
                <div className={cx('account-info-view')}>
                    <div className={cx('row space-between b15')}>
                        <span className={cx('text-black h5 medium')}>{Languages.profile.infoAccount}</span>
                        <Button
                            label={Languages.profile.edit}
                            labelStyles={cx('text-white h7')}
                            rightIcon={ImgEdit}
                            containButtonStyles={cx('btn-container')}
                            onPress={onEdit}
                            isLowerCase
                        />
                    </div>
                    {renderItem(Languages.profile.userName, info?.full_name)}
                    {renderItem(Languages.profile.birthday, info?.birth_date)}
                    {renderItem(Languages.profile.gender, info?.gender)}
                    {renderItem(Languages.profile.phone, info?.phone_number)}
                    {renderItem(Languages.profile.email, info?.email)}
                    {renderItem(Languages.profile.address, info?.address, true)}
                </div>
                {renderStatusAcc}
            </>
        );
    }, [info?.address, info?.birth_date, info?.email, info?.full_name, info?.gender, info?.phone_number, onEdit, renderItem, renderStatusAcc]);

    return (
        <div className={cx('colum content')}>
            <div className={cx('column', 'flex')}>
                {!isEdit ? renderAccountInfoView : renderEditView}
            </div>
        </div>

    );
}

export default InfoAccount;
