import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import IcPhone from 'assets/icon/ic_phone.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useMemo, useRef } from 'react';
import formValidate from 'utils/form-validate';
import styles from './forgot-pass.module.scss';

const cx = classNames.bind(styles);

function ForgotPass({ onPress }) {
    const isMobile = useIsMobile();

    // const { apiServices } = useAppStore();
    const refPhone = useRef<TextFieldActions>(null);

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onValidate = useCallback(() => {
        const phone = refPhone.current?.getValue();

        const errMsgPhone = formValidate.passConFirmPhone(phone);

        refPhone.current?.setErrorMsg(errMsgPhone);

        if (!formValidate.isValidAll([errMsgPhone])) {
            return true;
        }
        return false;
    }, []);

    const onForgotPwd = useCallback(async () => {
        if (onValidate()) {
            // const response = await apiServices.common.checkAppState();
            // console.log(response);
            // userManager.updateDemo(response.data);
            onPress?.({ name: Languages.auth.enterAuthCode, phone: refPhone.current?.getValue() });

        }
    }, [onPress, onValidate]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const renderRightContent = useMemo(() => {
        return <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
            <span className={cx('text-black medium h4')}>
                {Languages.auth.getBackPass}
            </span>
            <div className={cx('row y10')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.notAccountYet}
                </span>
                <span className={cx('text-green h6')} onClick={() => onNavigate(Languages.auth.register)}>
                    {Languages.auth.registerNow}
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
                value={''}
                maxLength={10}
            />

            <Button
                label={Languages.auth.sendConfirm}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onForgotPwd}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
            />
        </div>;
    }, [isMobile, onForgotPwd, onNavigate]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default ForgotPass;
