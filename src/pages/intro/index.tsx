import ImgHeader from 'assets/image/img_home_header.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);

function Intro() {
    const navigate = useNavigate();
    // const { apiServices } = useAppStore();

    const onLogin = useCallback(async() => {
        // const response = await apiServices.common.checkAppState();
        // console.log(response);
        // userManager.updateDemo(response.data);
    }, [navigate]);

    return (
        <div className={cx('page')}>
            <img src={ImgHeader} className={cx('banner')}/>
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

export default Intro;
