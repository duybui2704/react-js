import classNames from 'classnames/bind';
import React from 'react';
import styles from './scroll-top.module.scss';
import IcUpTop from 'assets/icon/ic_green_arrow_up.svg';

const cx = classNames.bind(styles);

const ScrollTopComponent = ({ scrollTopHeight, onScrollTop, isMobile }:
    {
        scrollTopHeight: number,
        isMobile: boolean,
        onScrollTop: () => void,
    }
) => {
    return (
        <div className={cx(scrollTopHeight < 300 ? 'top-button-hide' : isMobile ? 'top-button-mobile' : 'top-button')}
            onClick={onScrollTop}>
            <img src={IcUpTop} />
        </div>
    );
};

export default ScrollTopComponent;
