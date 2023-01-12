import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { Loading } from 'components/loading';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import sessionManager from 'managers/session-manager';
import { UserInfoModel } from 'models/user-model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import formValidate from 'utils/form-validate';
import utils from 'utils/utils';
import styles from './otp-auth.module.scss';

const cx = classNames.bind(styles);

function OTPAuth({ onPress, phoneNumber, title }: { onPress: any, phoneNumber: string, title: string }) {
    let timer = 0;
    const isMobile = useIsMobile();
    const [check, setCheck] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { apiServices, userManager } = useAppStore();
    const [timerCount, setTimerCount] = useState(180);
    const navigator = useNavigate();
    const [value, setValue] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    useEffect(() => {
        setCheck(true);
        timer = getTime() + 180;
        refreshCountdown();
    }, []);

    const refreshCountdown = () => {
        setTimeout(() => {
            if (timer - getTime() <= 0) {
                setTimerCount(0);
                setCheck(false);
            } else {
                setTimerCount(timer - getTime());
                refreshCountdown();
            }
        }, 1000);
    };

    const getTime = () => Math.floor(Date.now() / 1000);

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

    const onConfirm = useCallback(async () => {
        if (onValidate()) {
            if (title === Languages.auth.changePwd) {
                const res = await apiServices.auth.validateToken(value, phoneNumber) as any;
                if (res.success) {
                    onPress?.({ name: Languages.auth.login });
                }
            } else if (title === Languages.auth.signUp) {
                setIsLoading(true);
                const res = await apiServices.auth.activeAccount(
                    value,
                    phoneNumber
                ) as any;
                setIsLoading(false);
                if (res.success) {
                    const temp = res?.data as UserInfoModel;
                    if (temp?.token) {
                        sessionManager.setAccessToken(temp?.token);
                        const resInfoAcc = await apiServices.auth.getUserInfo() as any;
                        if (resInfoAcc.success) {
                            const resData = resInfoAcc.data as UserInfoModel;
                            userManager.updateUserInfo(resData);
                        }
                        navigator(Paths.home);
                    }
                }
            }
        }
    }, [apiServices.auth, navigator, onPress, onValidate, phoneNumber, title, userManager, value]);

    const onNavigate = useCallback(async (nameTabs: string) => {
        onPress?.({ name: nameTabs });
    }, [onPress]);

    const onChangeOTP = useCallback((otp: string) => {
        setErrMsg('');
        setValue(otp);
    }, []);

    const sendToOTP = useCallback(async () => {
        if (title === Languages.auth.changePwd) {
            setIsLoading(true);
            const resSendOTP = await apiServices.auth.otpResetPwd(phoneNumber) as any;
            if (resSendOTP.success) {
                setCheck(true);
                timer = getTime() + 180;
                refreshCountdown();
            }
            setIsLoading(false);
        } else if (title === Languages.auth.signUp) {
            setIsLoading(true);
            const response = await apiServices.auth.otpResendToken(phoneNumber) as any;
            setIsLoading(false);
            if (response.success) {
                setCheck(true);
                timer = getTime() + 180;
                refreshCountdown();
            }
        }
    }, []);

    const renderRightContent = useMemo(() => {
        return <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
            <span className={cx('text-black medium h4')}>
                {Languages.auth.enterAuthCode}
            </span>
            <div className={cx('row y10')}>
                <span className={cx('text-gray h7 x5 regular')}>
                    {Languages.auth.contentForgotPwd}
                </span>
            </div>
            <label className={cx('text-gray h7 x5 regular y30')}>
                {Languages.auth.codeConfirm}
                <span className={cx('text-red h7 x5 regular pl3')}>{Languages.common.mustChoose}</span>
            </label>
            <div className={cx('row')}>
                <OtpInput
                    value={value}
                    inputStyle={cx('input', 'h6 text-black regular')}
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
                <span className={cx('h6 text-gray y10')} onClick={timerCount === 0 ? sendToOTP : () => console.log('')}>
                    {timerCount > 0 ? Languages.auth.sendToAfterOTP : Languages.auth.sendToOTP}
                </span>
                {timerCount > 0 && <span className={cx('h6 text-red y10 p5')}>
                    {`${utils.convertSecondToMinutes(timerCount)}`}{' '}{Languages.auth.minute}</span>}
            </div>
            <Button
                label={Languages.auth.confirm}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onConfirm}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
            />
            {isLoading && <Loading />}
        </div>;
    }, [errMsg, isLoading, isMobile, onChangeOTP, onConfirm, sendToOTP, timerCount, value]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default OTPAuth;

