import logo from 'assets/icon/logo.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    // const { apiServices } = useAppStore();

    const onLogin = useCallback(async() => {
        // const response = await apiServices.common.checkAppState();
        // console.log(response);
        // userManager.updateDemo(response.data);
    }, [navigate]);

    return (
        <div className={cx('app')}>
            <img src={logo} className={cx('app-logo')} alt="logo" />
            <p>
                aaaaaaa
            </p>

            <Button
                label={Languages.auth.login}
                onPress={onLogin}
                buttonStyle={'RED'}
            />
        </div>
    );
}

export default Login;
