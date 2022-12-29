import BgAuth from 'assets/image/bg_auth.jpg';
import ImgAppStore from 'assets/image/img_app_store.png';
import ImgGooglePlay from 'assets/image/img_google_play.png';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgQrCode from 'assets/image/img_qr_download.png';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './login';
import styles from './auth.module.scss';
import SignUp from './sign-up';
import ForgotPass from './forgot-pass';
import OTPAuth from './otp-auth';
import ChangePwd from './change-pwd';

const cx = classNames.bind(styles);

function Auth() {
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    const location = useLocation();
    const [steps, setSteps] = useState<any>({ name: Languages.auth.login });

    // const { apiServices } = useAppStore();


    useEffect(() => {
        const _location = location.state;
        setSteps(_location || { name: Languages.auth.login });
    }, [location.state]);

    const renderLeftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${BgAuth})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
    }, []);

    const renderLeftContent = useMemo(() => {
        return <div className={cx('left-container', 'wid-left')}
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
                <div className={cx('column x50', 'jus-between')}>
                    <img src={ImgAppStore} className={cx('img-store')} />
                    <div className={cx('y40')}>
                        <img src={ImgGooglePlay} className={cx('img-store')} />
                    </div>
                </div>
                <img src={ImgQrCode} className={cx('img-qr')} />
            </div>
        </div>;
    }, [renderLeftBackground]);

    const onChangeSteps = useCallback((transmissionName?: any) => {
        setSteps(transmissionName);
    }, []);

    const renderSteps = useMemo(() => {
        switch (steps?.name) {
            case Languages.auth.login:
                return <Login onPress={onChangeSteps} />;
            case Languages.auth.register:
                return <SignUp onPress={onChangeSteps} />;
            case Languages.auth.forgotPwd:
                return <ForgotPass onPress={onChangeSteps} />;
            case Languages.auth.enterAuthCode:
                return <OTPAuth onPress={onChangeSteps} phoneNumber={steps?.phone} />;
            case Languages.auth.changePwd:
                return <ChangePwd onPress={onChangeSteps} />;
            default:
                return null;
        }
    }, [onChangeSteps, steps]);

    const renderView = useMemo(() => {
        return <div className={isMobile ? cx('column', 'root-container', 'scroll') : cx('row', 'root-container')}>
            {renderLeftContent}
            {renderSteps}
        </div>;
    }, [isMobile, renderLeftContent, renderSteps]);

    return renderView;
}

export default Auth;
