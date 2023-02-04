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
import { CHANNEL } from 'commons/constants';

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
    const [errMsg, setErrMsg] = useState<string>('');
    const [timerCount, setTimerCount] = useState<number>(180);
    const [checkOTP, setCheckOTP] = useState<boolean>(false);
    const [isShowReferral, setShowReferral] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const formData = useRef({
        phone: '',
        channel: '',
        code: '',
        otp: ''
    });
    const refPhone = useRef<TextFieldActions>(null);
    const refChannel = useRef<PickerAction>(null);
    const refCode = useRef<TextFieldActions>(null);

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
        setCheckOTP(false);
        setShowReferral(false);
        formData.current = {
            phone: '',
            channel: '',
            code: '',
            otp: ''
        };
        setErrMsg('');
    }, []);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const handleCancel = useCallback(() => {
        hideModal();
    }, [hideModal]);

    const onBackDrop = useCallback(() => {
        handleCancel();
    }, [handleCancel]);

    const onValidate = useCallback(() => {
        if (formData.current.otp.length === 0) {
            setErrMsg(Languages.errorMsg.emptyOTP);
            return false;
        }
        if (formData.current.otp.length < 6) {
            setErrMsg(Languages.errorMsg.userOTPLength);
            return false;
        } else if (formValidate.validateNumber(formData.current.otp)) {
            setErrMsg(Languages.errorMsg.errMsgOTP);
            return false;
        }
        return true;
    }, []);

    const onValidatePhone = useCallback(() => {
        setCheckOTP(false);
        const errMsgChannel = formValidate.emptyValidate(formData.current.channel || '');
        const errCode = isShowReferral ? formValidate.passConFirmPhone(formData.current.code) : '';
        const errPhone = formValidate.passConFirmPhone(formData.current.phone);
        refPhone.current?.setErrorMsg(errPhone);
        refChannel.current?.setError(errMsgChannel);
        if (isShowReferral) refCode.current?.setErrorMsg(errCode);
        if (`${errPhone}${errCode}${errMsgChannel}`.length === 0) {
            return true;
        }
        return false;
    }, [isShowReferral]);

    const onChangeOTP = useCallback((_otp: string) => {
        setErrMsg('');
        setToggle(last => !last);
        formData.current.otp = _otp;
    }, []);

    const onConfirmOTP = useCallback(async () => {
        if (onValidate()) {
            const resActive = await apiServices?.auth?.activePhone(data?.id || '', formData.current.otp, data?.checksum || '') as any;
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
            // setTimeout(() => {
            //     hideModal();
            // }, 2000);
        }
    }, [apiServices?.auth, data?.checksum, data?.id, navigate, onValidate, userManager]);

    const onSendToOTP = useCallback(async () => {
        if (timerCount === 0) {
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
                        {/* {Languages.auth.contentForgotPwdEnd} */}
                    </span>
                </div>
                <label className={cx('text-gray h7 x5 y30')}>
                    {Languages.auth.codeConfirm}
                    <span className={cx('text-red h7 x5 pl3')}>{Languages.common.mustChoose}</span>
                </label>
                <div className={cx('row')}>
                    <OtpInput
                        value={formData.current.otp}
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
                        {utils.convertSecondToMinutes(timerCount)}</span>}
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
    }, [errMsg, onChangeOTP, onConfirmOTP, onSendToOTP, timerCount, toggle]);

    const onSendOTP = useCallback(async () => {
        if (onValidatePhone()) {
            const resActive = await apiServices?.auth?.updatePhone(
                data?.id || '',
                formData.current.phone,
                data?.checksum || '',
                formData.current.channel || '',
                formData.current.code
            ) as any;
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
    }, [apiServices?.auth, data, onValidatePhone, refreshCountdown, userManager]);

    const onChooseChannel = useCallback((_channel: string) => {
        formData.current.channel = _channel;
        setToggle(last => !last);
        if (_channel === CHANNEL.FRIEND) {
            setShowReferral(true);
        } else {
            setShowReferral(false);
        }
    }, []);

    const onChangeText = useCallback((text: string, label: string) => {
        switch (label) {
            case Languages.auth.phone:
                return formData.current.phone = text;
            default:
                return formData.current.code = text;
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
                    value={formData.current.phone || ''}
                    maxLength={10}
                    onChangeText={onChangeText}
                />
                <PickerComponent
                    ref={refChannel}
                    data={dataChannel}
                    title={Languages.auth.channel}
                    defaultValue={''}
                    placeholder={Languages.auth.channel}
                    mainContainer={cx('y10', 'picker-container')}
                    titleItemPickerText={'text-gray h7 regular b5'}
                    isImportant
                    onSelectItem={onChooseChannel}
                />
                {isShowReferral && <MyTextInput
                    ref={refCode}
                    type={'phone'}
                    label={Languages.auth.txtRefCode}
                    placeHolder={Languages.auth.txtRefCode}
                    important
                    containerStyle={cx('y10')}
                    rightIcon={IcPhone}
                    value={formData.current.code || ''}
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
    }, [dataChannel, isShowReferral, onChangeText, onChooseChannel, onSendOTP, toggle]);

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
