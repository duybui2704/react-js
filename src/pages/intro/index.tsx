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

    return (
        <div className={cx('page')}>
            <img src={ImgHeader} className={cx('banner')} />
            <div className={cx('view-title')}>
                <span className={cx('text', 'span-big')}>{Languages.intro.invest}</span>
                <span className={cx('text', 'span-normal')}>{Languages.intro.buildTheFuture}</span>
                <span className={cx('text', 'span-small')}>{Languages.intro.contentResult}</span>
            </div>
            <div className={cx('view-intro')}>
                <div className={cx('view-intro-center')}>
                    <span className={cx('span-small', 'color-green', 'line-height')}>{Languages.intro.contentStart}</span>
                    <span className={cx('span-small', 'line-height')}>{Languages.intro.contentEnd}</span>
                </div>
            </div>
        </div>
    );
}

export default Intro;
