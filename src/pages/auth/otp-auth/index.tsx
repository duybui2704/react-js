import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import formValidate from 'utils/form-validate';
import styles from './otp-auth.module.scss';


const cx = classNames.bind(styles);

function OTPAuth({ onPress, phoneNumber }) {
    const isMobile = useIsMobile();

    // const { apiServices } = useAppStore();
    const refPhone = useRef<TextFieldActions>(null);
    const [value, setValue] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

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
            onPress?.({ name: Languages.auth.changePwd });
        }
    }, [onPress, onValidate]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const onChangeOTP = useCallback((otp: string) => {
        setErrMsg('');
        setValue(otp);
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
                <span className={cx('text-red h7 regular')}>{errMsg}</span>
            </div>
            <Button
                label={Languages.auth.confirm}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onConfirm}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
            />
        </div>;
    }, [errMsg, isMobile, onChangeOTP, onConfirm, value]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default OTPAuth;
function validateNumber(value: string) {
    throw new Error('Function not implemented.');
}

