import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import IcGoogle from 'assets/icon/ic_google.svg';
import IcPhone from 'assets/icon/ic_phone.svg';
import IcEmail from 'assets/image/ic_email.svg';
import IcProfile from 'assets/image/ic_profile.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { ItemProps } from 'models/common';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import styles from './sign-up.module.scss';

const cx = classNames.bind(styles);

function SignUp({ onPress, dataChannel }: { onPress: any, dataChannel: ItemProps[] }) {
    const isMobile = useIsMobile();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { apiServices } = useAppStore();

    const refPhone = useRef<TextFieldActions>(null);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refPwdConfirm = useRef<TextFieldActions>(null);
    const refPresenter = useRef<TextFieldActions>(null);
    const refChannel = useRef<PickerAction>(null);

    const refPwd = useRef<TextFieldActions>(null);

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onValidate = useCallback(() => {
        const phone = refPhone.current?.getValue();
        const pwd = refPwd.current?.getValue();
        const email = refEmail.current?.getValue();
        const pwdConfirm = refPwdConfirm.current?.getValue();
        const name = refName.current?.getValue();
        const presenter = refPresenter.current?.getValue();
        const channel = refChannel.current?.getValue();

        const errMsgPhone = formValidate.passConFirmPhone(phone);
        const errMsgName = formValidate.userNameValidate(name);
        const errMsgPwd = formValidate.passValidate(pwd);
        const errMsgEmail = formValidate.emailValidate(email);
        const errMsgConfirm = formValidate.passConFirmValidate(pwd, pwdConfirm);
        const errMsgPresenter = formValidate.passConFirmPhone(presenter);
        const errMsgChannel = formValidate.emptyValidate(channel || '');

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPwd.current?.setErrorMsg(errMsgPwd);
        refName.current?.setErrorMsg(errMsgName);
        refPwdConfirm.current?.setErrorMsg(errMsgConfirm);
        refEmail.current?.setErrorMsg(errMsgEmail);
        refPresenter.current?.setErrorMsg(errMsgPresenter);
        refChannel?.current?.setError(errMsgChannel);

        if (!formValidate.isValidAll([errMsgPhone, errMsgPwd, errMsgName, errMsgConfirm, errMsgEmail, errMsgPresenter, errMsgChannel])) {
            return true;
        }
        return false;
    }, []);

    const onSignUp = useCallback(async () => {
        if (onValidate()) {
            setLoading(true);

            const res = await apiServices.auth.registerAuth(
                refPhone.current?.getValue(),
                refName.current?.getValue(),
                refPwd.current?.getValue(),
                refPwdConfirm.current?.getValue(),
                refEmail.current?.getValue(),
                refChannel.current?.getValue() || '',
                refPresenter.current?.getValue()) as any;
            setLoading(false);
            if (res.success) {
                onPress?.({ name: Languages.auth.enterAuthCode, phone: refPhone.current?.getValue(), title: Languages.auth.signUp });
            }
        }
    }, [apiServices.auth, onPress, onValidate]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const renderRightContent = useMemo(() => {
        return <div className={isMobile ? cx('right-container-mobile') : cx('right-container', 'scroll')}>
            <span className={cx('text-black medium h4 y20')}>
                {Languages.auth.signUp}
            </span>

            <span className={cx('text-gray h7 y10')}>
                {Languages.auth.registerAccountNow}
            </span>

            <MyTextInput
                ref={refName}
                type={'text'}
                label={Languages.auth.name}
                placeHolder={Languages.auth.name}
                important
                rightIcon={IcProfile}
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPhone}
                type={'phone'}
                label={Languages.auth.phone}
                placeHolder={Languages.auth.phone}
                important
                containerStyle={cx('y15')}
                rightIcon={IcPhone}
                value={''}
                maxLength={10}
            />

            <MyTextInput
                ref={refEmail}
                type={'email'}
                label={Languages.auth.email}
                placeHolder={Languages.auth.email}
                important
                rightIcon={IcEmail}
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPwd}
                type={'password'}
                label={Languages.auth.pwd}
                placeHolder={Languages.auth.pwd}
                containerStyle={cx('y15')}
                important
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPwdConfirm}
                type={'password'}
                label={Languages.auth.pwdConfirm}
                placeHolder={Languages.auth.pwdConfirm}
                important
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <PickerComponent
                ref={refChannel}
                data={dataChannel}
                title={Languages.auth.channel}
                placeholder={Languages.auth.channel}
                mainContainer={cx('y15', 'picker-container')}
                titleItemPickerText={'text-gray h7 regular b5'}
                isImportant
            />

            <MyTextInput
                ref={refPresenter}
                type={'phone'}
                label={Languages.auth.presenter}
                placeHolder={Languages.auth.presenter}
                important
                containerStyle={cx('y15')}
                rightIcon={IcPhone}
                value={''}
                maxLength={10}
            />

            <div className={cx('row-center y20')}>
                <Checkbox className={cx('text-gray h7')}
                    onChange={onChange}>
                    {Languages.auth.savePwd}</Checkbox>
                <span className={cx('text-red h7', 'hover-text')} onClick={() => onNavigate(Languages.auth.forgotPwd)}>
                    {Languages.auth.forgotPwd}
                </span>
            </div>

            <Button
                label={Languages.auth.login}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onSignUp}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
            />

            <div className={cx('row-center y30')}>
                <div className={cx('line')} />
                <span className={cx('text-gray h7 p5')}>
                    {Languages.auth.or}
                </span>
                <div className={cx('line')} />
            </div>

            <div className={cx('row-center y30')}>
                <Button
                    label={Languages.auth.google}
                    buttonStyle={BUTTON_STYLES.OUTLINE_RED}
                    isLowerCase
                    containButtonStyles={'flex'}
                    rightIcon={IcGoogle}
                />
            </div>

            <div className={cx('row y10')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.accountYet}
                </span>
                <span className={cx('text-green h6', 'hover-text')} onClick={() => onNavigate(Languages.auth.login)}>
                    {Languages.auth.loginNow}
                </span>
            </div>
        </div>;
    }, [isMobile, dataChannel, onSignUp, onNavigate]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default SignUp;
