import { Col, Row, Steps } from 'antd';
import BgAuth from 'assets/image/bg_auth.jpg';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import ImgAppStore from 'assets/image/img_app_store.png';
import ImgChange from 'assets/image/img_change_pass.jpeg';
import ImgForgot from 'assets/image/img_forgot.jpeg';
import ImgGooglePlay from 'assets/image/img_google_play.png';
import ImgLogin from 'assets/image/img_login.jpeg';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgOtp from 'assets/image/img_otp.jpeg';
import ImgQrCode from 'assets/image/img_qr_download.png';
import ImgSignUp from 'assets/image/img_sign_up.jpeg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import styles from './auth.module.scss';
import ChangePwd from './change-pwd';
import ForgotPass from './forgot-pass';
import Login from './login';
import OTPAuth from './otp-auth';
import SignUp from './sign-up';

const cx = classNames.bind(styles);

function Auth() {
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    const location = useLocation();
    const [steps, setSteps] = useState<any>({ name: Languages.auth.login });

    // const { apiServices } = useAppStore();


    // useEffect(() => {
    //     const _location = location.state;
    //     setSteps(_location || { name: Languages.auth.enterAuthCode });
    // }, [location.state]);

    const backgroundImage = useMemo(() => {
        if (steps) {
            switch (steps?.name) {
                case Languages.auth.login:
                    return ImgLogin;
                case Languages.auth.signUp:
                    return ImgSignUp;
                case Languages.auth.changePwd:
                    return ImgChange;
                case Languages.auth.forgotPwd:
                    return ImgForgot;
                case Languages.auth.enterAuthCode:
                    return ImgOtp;
                default:
                    return BgAuth;
            }
        }
    }, [steps]);

    const renderLeftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
    }, [backgroundImage]);

    const renderLeftContent = useMemo(() => {
        return <div className={cx('left-container')}
            style={renderLeftBackground}>
            <div className={cx('style-close')}>
                <img src={Ic_Close} className={cx('img-close')} onClick={() => navigate(Paths.home)} />
            </div>
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
    }, [navigate, renderLeftBackground]);

    const onChangeSteps = useCallback((transmissionName?: any) => {
        setSteps(transmissionName);
        transmissionName.onPressOTP();
    }, []);

    const resendOTP = useCallback(async () => {
        console.log('steps === ', steps);
        await steps.onPressOTP?.();
    }, [steps]);

    useEffect(() => {
        console.log('uupdated');

    }, [steps]);

    const renderSteps = useMemo(() => {

        switch (steps?.name) {
            case Languages.auth.login:
                return <Login onPress={onChangeSteps} />;
            case Languages.auth.register:
                return <SignUp onPress={onChangeSteps} />;
            case Languages.auth.forgotPwd:
                return <ForgotPass onPress={onChangeSteps} />;
            case Languages.auth.enterAuthCode:
                return <OTPAuth onPress={onChangeSteps} resend={resendOTP} phoneNumber={steps?.phone} title={steps?.title} />;
            case Languages.auth.changePwd:
                return <ChangePwd onPress={onChangeSteps} />;
            default:
                return null;
        }
    }, [onChangeSteps, resendOTP, steps]);

    const renderView = useMemo(() => {
        return <div className={isMobile ? cx('column', 'root-container', 'scroll') : cx('row', 'root-container')}>
            <Row gutter={[24, 16]} className={cx('container')}>
                <Col xs={24} md={24} lg={12} xl={16} className={cx('container')}>
                    {renderLeftContent}
                </Col>
                <Col xs={24} md={24} lg={12} xl={8} >
                    {renderSteps}
                </Col>
            </Row>
        </div>;
    }, [isMobile, renderLeftContent, renderSteps]);

    return renderView;
}

export default Auth;
