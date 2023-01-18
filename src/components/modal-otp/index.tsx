import { Modal } from 'antd';
import classNames from 'classnames/bind';
import IcPhone from 'assets/icon/ic_phone.svg';
import Languages from 'commons/languages';
import { PopupBaseProps, PopupBaseActions } from 'components/modal/modal';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './modal-otp.module.scss';
import OtpInput from 'react-otp-input';
import formValidate from 'utils/form-validate';
import utils from 'utils/utils';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { useAppStore } from 'hooks';
import { LoginWithThirdPartyModel } from 'models/auth';
import sessionManager from 'managers/session-manager';
import { UserInfoModel } from 'models/user-model';
import toasty from 'utils/toasty';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import { Paths } from 'routers/paths';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80%'
} as any;

const PopupOTP = forwardRef<PopupBaseActions, PopupBaseProps>(({ dataChannel, data }: PopupBaseProps, ref) => {
    const navigate = useNavigate();
    const timer = useRef<number>(180);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [timerCount, setTimerCount] = useState<number>(180);
    const [checkOTP, setCheckOTP] = useState<boolean>(false);
    const [isShowReferral, setShowReferral] = useState<boolean>(false);
    const [channel, setChannel] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const refPhone = useRef<TextFieldActions>(null);
    const refChannel = useRef<PickerAction>(null);
    const refRefCode = useRef<TextFieldActions>(null);

    const { apiServices, userManager } = useAppStore();

    useEffect(() => {
        setCheckOTP(false);
    }, []);

    const refreshCountdown = useCallback(() => {
        setTimeout(() => {
            if (timer.current - 1 <= 0) {
                setTimerCount(0);
            } else {
                setTimerCount(timer.current - 1);
                timer.current = timer.current - 1;
                refreshCountdown();
            }
        }, 1000);
    }, [timer]);


    const hideModal = useCallback(() => {
        setVisible(false);
        setCheckOTP(false);
    }, []);

    const showModal = useCallback(() => {
        timer.current = 180;
        setVisible(true);
    }, []);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const onBackDrop = useCallback(() => {
        setVisible(false);
    }, []);

    const handleCancel = useCallback(() => {
        hideModal();
    }, [hideModal]);

    const onValidate = useCallback(() => {
        if (value.length === 0) {
            setErrMsg(Languages.errorMsg.emptyOTP);
            return false;
        }
        if (value.length < 6) {
            setErrMsg(Languages.errorMsg.userOTPLength);
            return false;
        } else if (formValidate.validateNumber(value)) {
            setErrMsg(Languages.errorMsg.errMsgOTP);
            return false;
        }
        return true;

    }, [value]);


    const onValidatePhone = useCallback(() => {
        const errMsgChannel = formValidate.emptyValidate(channel);
        const errCode = isShowReferral ? formValidate.passConFirmPhone(code) : '';
        const errPhone = formValidate.passConFirmPhone(phone);
        refPhone.current?.setErrorMsg(errPhone);
        refChannel.current?.setError(errMsgChannel);
        if (isShowReferral) refRefCode.current?.setErrorMsg(errCode);
        if (`${errPhone}${errCode}${errMsgChannel}`.length === 0) {
            return true;
        }
        return false;
    }, [channel, code, isShowReferral, phone]);

    const onChangeOTP = useCallback((otp: string) => {
        setErrMsg('');
        setValue(otp);
    }, []);

    const onConfirmOTP = useCallback(async () => {
        if (onValidate()) {
            const resActive = await apiServices?.auth?.activePhone(data?.id || '', value, data?.checksum || '') as any;
            if (resActive.success) {
                const resData = resActive.data as LoginWithThirdPartyModel;
                sessionManager.setAccessToken(resData?.token);
                userManager.updateUserInfo(resActive.data as UserInfoModel);
                if (sessionManager.accessToken) {
                    if (sessionManager.accessToken) {
                        setTimeout(() => {
                            navigate(Paths.home);
                        }, 500);
                    }
                }
            } else {
                toasty.error(resActive.message);
            }
            setTimeout(() => {
                hideModal();
            }, 2000);
        }
    }, [apiServices?.auth, data?.checksum, data?.id, hideModal, navigate, onValidate, userManager, value]);

    const onSendToOTP = useCallback(async () => {
        if (timerCount === 0) {
            console.log('assda', timerCount);

            await onSendOTP();
        }
    }, [timerCount]);

    const renderViewOTP = useMemo(() => {
        return (
            <>
                <span className={cx('text-black medium h4')}>
                    {Languages.auth.enterAuthCode}
                </span>
                <div className={cx('row y10')}>
                    <span className={cx('text-gray h7 x5')}>
                        {Languages.auth.contentForgotPwd}
                    </span>
                </div>
                <label className={cx('text-gray h7 x5 y30')}>
                    {Languages.auth.codeConfirm}
                    <span className={cx('text-red h7 x5 pl3')}>{Languages.common.mustChoose}</span>
                </label>
                <div className={cx('row')}>
                    <OtpInput
                        value={value}
                        inputStyle={cx('input', 'h6 text-black')}
                        onChange={onChangeOTP}
                        numInputs={6}
                        containerStyle={cx('container-input')}
                        shouldAutoFocus
                        isInputNum
                    />
                </div>
                <div className={cx('message-error')}>
                    <span className={cx('text-red h7')}>{errMsg}</span>
                </div>
                <div className={cx('row')}>
                    <span className={cx('h6 text-gray y10', 'hover-text')} onClick={onSendToOTP}>
                        {timerCount > 0 ? Languages.auth.sendToAfterOTP : Languages.auth.sendToOTP}
                    </span>
                    {timerCount > 0 && <span className={cx('h6 text-red y10 p5')}>
                        {`${utils.convertSecondToMinutes(timerCount)}`}{' '}{Languages.auth.minute}</span>}
                </div>
                <Button
                    label={Languages.auth.confirm}
                    buttonStyle={BUTTON_STYLES.GREEN}
                    isLowerCase
                    onPress={onConfirmOTP}
                    containButtonStyles={'y20'}
                    customStyles={{ padding: 10 }}
                />
            </>
        );
    }, [errMsg, onChangeOTP, onConfirmOTP, onSendToOTP, timerCount, value]);

    const onSendOTP = useCallback(async () => {
        if (onValidatePhone()) {
            const resActive = await apiServices?.auth?.updatePhone(
                data?.id || '',
                phone,
                data?.checksum || '',
                channel,
                code) as any;
            if (resActive.success) {
                const resData = resActive.data as LoginWithThirdPartyModel;
                sessionManager.setAccessToken(resData?.token);
                userManager.updateUserInfo({ ...resData });
                setCheckOTP(true);
                setTimerCount(180);
                timer.current = 180;
                refreshCountdown();
            } else {
                toasty.error(resActive.message);
            }
        }
    }, [apiServices?.auth, channel, code, data, onValidatePhone, phone, refreshCountdown, userManager]);

    const onChooseChannel = useCallback((_channel: string) => {
        setChannel(_channel);
        if (_channel === '5') {
            setShowReferral(true);
        } else {
            setShowReferral(false);
        }
    }, []);

    const onChangeText = useCallback((text: string, label: string) => {
        switch (label) {
            case Languages.auth.phone:
                return setPhone(text);
            default:
                return setCode(text);
        }
    }, []);

    const renderViewPhone = useMemo(() => {
        return (
            <>
                <span className={cx('text-black medium h5')}>
                    {Languages.auth.socialGoogle}
                </span>
                <div className={cx('row y10')}>
                    <span className={cx('text-gray h7 x5')}>
                        {Languages.auth.contentLinkSocial}
                    </span>
                </div>
                <MyTextInput
                    ref={refPhone}
                    type={'phone'}
                    label={Languages.auth.phone}
                    placeHolder={Languages.auth.phone}
                    important
                    containerStyle={cx('y30')}
                    rightIcon={IcPhone}
                    value={phone}
                    maxLength={10}
                    onChangeText={onChangeText}
                />
                <PickerComponent
                    ref={refChannel}
                    data={dataChannel}
                    title={Languages.auth.channel}
                    placeholder={Languages.auth.channel}
                    mainContainer={cx('y180', 'picker-container')}
                    titleItemPickerText={'text-gray h7 regular b5'}
                    isImportant
                    onSelectItem={onChooseChannel}
                />
                {isShowReferral && <MyTextInput
                    ref={refRefCode}
                    type={'phone'}
                    label={Languages.auth.txtRefCode}
                    placeHolder={Languages.auth.txtRefCode}
                    important
                    containerStyle={cx('y180')}
                    rightIcon={IcPhone}
                    value={code}
                    maxLength={10}
                    onChangeText={onChangeText}
                />}
                <Button
                    label={Languages.auth.sendOTP}
                    buttonStyle={BUTTON_STYLES.GREEN}
                    isLowerCase
                    onPress={onSendOTP}
                    containButtonStyles={'y20'}
                    customStyles={{ padding: 10 }}
                />
            </>
        );
    }, [code, dataChannel, isShowReferral, onChangeText, onChooseChannel, onSendOTP, phone]);

    const renderBody = useMemo(() => {
        return (
            <>
                {checkOTP ? renderViewOTP : renderViewPhone}
            </>
        );
    }, [checkOTP, renderViewOTP, renderViewPhone]);

    return (
        <Modal
            open={visible}
            closable={false}
            footer={null}
            onCancel={onBackDrop}
            style={stylesContainerCenter}
        >
            <div className={cx('column', 'container')}>
                {renderBody}
            </div>
        </Modal>
    );
});

export default PopupOTP;
