import IcPhone from 'assets/icon/ic_phone.svg';
import IcEye from 'assets/icon/ic_eye.svg';
import IcGoogle from 'assets/icon/ic_google.svg';
import IcFacebook from 'assets/icon/ic_facebook.svg';
import BgAuth from 'assets/image/bg_auth.jpg';
import ImgAppStore from 'assets/image/img_app_store.png';
import ImgGooglePlay from 'assets/image/img_google_play.png';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgQrCode from 'assets/image/img_qr_download.png';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';

const cx = classNames.bind(styles);

function Login() {
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    // const { apiServices } = useAppStore();
    const refPhone = useRef<TextFieldActions>(null);

    const onLogin = useCallback(async () => {
        // const response = await apiServices.common.checkAppState();
        // console.log(response);
        // userManager.updateDemo(response.data);
    }, [navigate]);

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const renderLeftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${BgAuth})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
    }, []);

    const renderLeftContent = useMemo(() => {
        return <div className={cx('left-container')}
            style={renderLeftBackground}>
            <img src={ImgLogo} className={cx('img-logo')} />
            <span className={cx('text-white medium h2 y40')}>
                {Languages.auth.intro[0]}
            </span>
            <span className={cx('text-white medium h3 y15')}>
                {Languages.auth.intro[1]}
            </span>
            <span className={cx('text-white medium h5 y10')}>
                {Languages.auth.intro[2]}
            </span>
            <span className={cx('text-white h5 y40')}>
                {Languages.auth.intro[3]}
            </span>
            <div className={cx('row y10')}>
                <div className={cx('column x50')}>
                    <img src={ImgAppStore} className={cx('img-store')} />
                    <div className={cx('y40')}>
                        <img src={ImgGooglePlay} className={cx('img-store')} />
                    </div>
                </div>
                <img src={ImgQrCode} className={cx('img-qr')} />
            </div>
        </div>;
    }, [renderLeftBackground]);

    const renderRightContent = useMemo(() => {
        return <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
            <span className={cx('text-black medium h4')}>
                {Languages.auth.login}
            </span>
            <div className={cx('row y10')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.notAccountYet}
                </span>
                <span className={cx('text-green h6')}>
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

            <MyTextInput
                ref={refPhone}
                type={'password'}
                label={Languages.auth.pwd}
                placeHolder={Languages.auth.pwd}
                containerStyle={cx('y15')}
                important
                rightIcon={IcEye}
                value={''}
                maxLength={50}
            />

            <div className={cx('row-center y20')}>
                <Checkbox className={cx('text-gray h7')}
                    onChange={onChange}>
                    {Languages.auth.savePwd}</Checkbox>
                <span className={cx('text-red h7')}>
                    {Languages.auth.forgotPwd}
                </span>
            </div>

            <Button
                label={Languages.auth.login}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onLogin}
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
                    label={Languages.auth.facebook}
                    buttonStyle={BUTTON_STYLES.OUTLINE_BLUE}
                    isLowerCase
                    containButtonStyles={'flex x10'}
                    rightIcon={IcFacebook}
                />
                <Button
                    label={Languages.auth.google}
                    buttonStyle={BUTTON_STYLES.OUTLINE_RED}
                    isLowerCase
                    containButtonStyles={'flex'}
                    rightIcon={IcGoogle}
                />
            </div>
        </div>;
    }, [isMobile, onLogin]);

    const renderView = useMemo(() => {
        return <div className={cx('root-container')}>
            {!isMobile && renderLeftContent}
            {renderRightContent}
        </div>;
    }, [isMobile, renderLeftContent, renderRightContent]);

    return renderView;
}

export default Login;
