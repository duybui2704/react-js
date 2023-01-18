import { Col, Row } from 'antd';
import BgAuth from 'assets/image/bg_auth.jpg';
import ImgLogin from 'assets/image/bg_login.svg';
import BgPwd from 'assets/image/bg_pwd.svg';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import ImgAppStore from 'assets/image/img_app_store.svg';
import ImgGooglePlay from 'assets/image/img_gg_chplay.svg';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgQrCode from 'assets/image/img_qr.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import PopupOTP from 'components/modal-otp';
import { PopupBaseActions } from 'components/modal-otp/modal';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { LoginWithThirdPartyModel } from 'models/auth';
import { ChannelModel } from 'models/channel';
import { ItemProps } from 'models/common';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import utils from 'utils/utils';
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
    const [steps, setSteps] = useState<any>({ name: Languages.auth.login });
    const [dataGoogle, setDataGoogle] = useState<LoginWithThirdPartyModel>();
    const popupOTP = useRef<PopupBaseActions>(null);
    const { apiServices, userManager } = useAppStore();
    const [dataChannel, setDataChannel] = useState<ItemProps[]>([]);


    // useEffect(() => {
    //     const _location = location.state;
    //     setSteps(_location || { name: Languages.auth.enterAuthCode });
    // }, [location.state]);
    const fetchData = useCallback(async () => {
        const res = await apiServices.auth.getChanelSource(3) as any;
        if (res.success) {
            const _dataChanel = utils.formatObjectFilterInvest(res.data as ChannelModel[]);
            console.log(_dataChanel);
            const temp = [] as ItemProps[];
            _dataChanel?.forEach((item: any) => {
                temp.push({
                    value: item?.value,
                    id: item.text.type,
                    text: item?.text?.name
                });
            });
            setDataChannel(temp);
        }
    }, [apiServices.auth]);

    useEffect(() => {
        fetchData();
    }, []);

    const backgroundImage = useMemo(() => {
        if (steps) {
            switch (steps?.name) {
                case Languages.auth.login:
                    return ImgLogin;
                case Languages.auth.changePwd:
                case Languages.auth.forgotPwd:
                case Languages.auth.enterAuthCode:
                    return BgPwd;
                case Languages.auth.signUp:
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
    }, []);

    const openPopup = useCallback((data: LoginWithThirdPartyModel) => {
        popupOTP.current?.showModal();
        setDataGoogle(data);
    }, []);

    const renderSteps = useMemo(() => {

        switch (steps?.name) {
            case Languages.auth.login:
                return <Login onPress={onChangeSteps} openPopup={openPopup} />;
            case Languages.auth.register:
                return <SignUp onPress={onChangeSteps} dataChannel={dataChannel} />;
            case Languages.auth.forgotPwd:
                return <ForgotPass onPress={onChangeSteps} />;
            case Languages.auth.enterAuthCode:
                return <OTPAuth onPress={onChangeSteps} phoneNumber={steps?.phone} title={steps?.title} />;
            case Languages.auth.changePwd:
                return <ChangePwd onPress={onChangeSteps} />;
            default:
                return null;
        }
    }, [dataChannel, onChangeSteps, openPopup, steps]);

    const renderView = useMemo(() => {
        return <div className={isMobile ? cx('column', 'root-container', 'scroll') : cx('row', 'root-container')}>
            <Row gutter={[24, 16]} className={cx('container')}>
                <Col xs={24} md={24} lg={12} xl={16} className={cx('container')}>
                    {renderLeftContent}
                </Col>
                <Col xs={24} md={24} lg={12} xl={8} className={cx('right')}>
                    {renderSteps}
                </Col>
            </Row>
            <PopupOTP
                ref={popupOTP}
                data={dataGoogle}
                dataChannel={dataChannel}
            />
        </div>;
    }, [dataChannel, dataGoogle, isMobile, renderLeftContent, renderSteps]);

    return renderView;
}

export default Auth;
