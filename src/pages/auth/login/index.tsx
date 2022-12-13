import BgAuth from 'assets/image/bg_auth.jpg';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgAppStore from 'assets/image/img_app_store.png';
import ImgGooglePlay from 'assets/image/img_google_play.png';
import ImgQrCode from 'assets/image/img_qr_download.png';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    // const { apiServices } = useAppStore();

    const onLogin = useCallback(async () => {
        // const response = await apiServices.common.checkAppState();
        // console.log(response);
        // userManager.updateDemo(response.data);
    }, [navigate]);

    const leftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${BgAuth})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
    }, []);

    return (
        <div className={cx('root-container')}>
            <div className={cx('left-container')}
                style={leftBackground}>
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
            </div>

            <div className={cx('right-container')}>
                <Button
                    label={Languages.auth.login}
                    onPress={onLogin}
                    buttonStyle={'RED'}
                />
            </div>

        </div>
    );
}

export default Login;
