
import classNames from 'classnames/bind';
import React from 'react';
import style from './header.module.scss';

import Languages from 'commons/languages';
import Marquee from 'react-fast-marquee';

import IcLogo from 'assets/icon/menu/logo.svg';

const cx = classNames.bind(style);

function Header() {
    return (
        <div className={cx('container')}>
            <div className={cx('innerLeft')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>
            <div className={cx('innerCenter')}>
                <Marquee pauseOnHover gradient={false}>
                    <div className={cx('textContent')}>
                        <span>{Languages.header.textCenter}</span>
                        <span>{Languages.header.textCenter1}</span>
                    </div>
                </Marquee>
            </div>
        </div>
    );
}

export default Header;
