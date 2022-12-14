import IcPhone from 'assets/icon/ic_phone.svg';
import IcEye from 'assets/icon/ic_eye.svg';
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

    const renderView = useMemo(() => {
        return <div className={cx('root-container')}>
            {!isMobile && renderLeftContent}

            <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
                <span className={cx('text-black medium')}>
                    {Languages.auth.login}
                </span>
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
                    ref={refPhone}
                    type={'text'}
                    label={Languages.auth.pwd}
                    placeHolder={Languages.auth.pwd}
                    containerStyle={cx('y15')}
                    important
                    rightIcon={IcEye}
                    value={''}
                />
            </div>

        </div>;
    }, [isMobile, renderLeftContent]);

    return renderView;
}

export default Login;
