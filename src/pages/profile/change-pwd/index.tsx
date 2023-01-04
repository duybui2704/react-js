import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';

import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './change-pwd.module.scss';

import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import formValidate from 'utils/form-validate';

const cx = classNames.bind(styles);

function InfoChangePwd() {
    const navigate = useNavigate();
    const { userManager } = useAppStore();
    const refPassCurrent = useRef<TextFieldActions>(null);
    const refPassNew = useRef<TextFieldActions>(null);
    const refPassNewConfirm = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();

    const renderInput = useCallback((_ref: any, label?: string, maxLength?: number, disabled?: boolean) => {

        return (
            <MyTextInput
                ref={_ref}
                type={'password'}
                value={''}
                label={label}
                disabled={disabled}
                containerStyle={cx('y15')}
                maxLength={maxLength}
                placeHolder={label}
                isPassword
            />
        );

    }, []);

    const onSave = useCallback(() => {
        const _passCurrent = refPassCurrent.current?.getValue();
        const _passNew = refPassNew.current?.getValue();
        const _passConfirmNew = refPassNewConfirm.current?.getValue();

        const errMsgPassCurrent = formValidate.passValidate(_passCurrent);
        const errMsgPassNew = formValidate.passValidate(_passNew);
        const errMsgPassConfirmNew = formValidate.passConFirmValidate(_passNew, _passConfirmNew);

        refPassCurrent.current?.setErrorMsg(errMsgPassCurrent);
        refPassNew.current?.setErrorMsg(errMsgPassNew);
        refPassNewConfirm.current?.setErrorMsg(errMsgPassConfirmNew);

        if (`${errMsgPassCurrent}${errMsgPassNew}${errMsgPassConfirmNew}`.length === 0) {
            console.log('log ===', _passCurrent, _passNew, _passConfirmNew);
        }

    }, []);

    const oncancel = useCallback(() => {
        refPassCurrent.current?.setValue('');
        refPassNew.current?.setValue('');
        refPassNewConfirm.current?.setValue('');
    }, []);

    return (
        <div className={cx('colum content')}>
            {isMobile &&
                <div className={cx('row space-between y20', 'top')}>
                    <span className={cx('text-black bold h4')}>{userManager.userInfo?.username}</span>
                    <img src={IcTwoPeople} />
                </div>}
            <div className={cx('column', 'flex')}>
                <div className={cx('container-edit', 'shadow')}>
                    <span className={cx('text-black h5 bold')}>{Languages.profile.editAccount}</span>
                    {renderInput(refPassCurrent, Languages.profile.passCurrent, 50, false)}
                    {renderInput(refPassNew, Languages.profile.passNew, 50, false)}
                    {renderInput(refPassNewConfirm, Languages.profile.passConfirmNew, 50, false)}
                    <div className={cx('wid-100', 'row y20')}>
                        <Button
                            label={Languages.common.save}
                            labelStyles={cx('text-white h7')}
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
            </div>
        </div>

    );
}

export default InfoChangePwd;
