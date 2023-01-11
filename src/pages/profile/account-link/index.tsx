import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useMemo } from 'react';
import styles from './account-link.module.scss';
import IcGoggle from 'assets/image/ic_gg.svg';
import IcChoose from 'assets/image/ic_choose.svg';

import { useAppStore } from 'hooks';


const cx = classNames.bind(styles);

function AccountLink() {

    const { userManager } = useAppStore();

    const renderContent = useMemo(() => {
        return (
            <div className={cx('y20', 'content-container')}>
                <div className={cx('row', 'align-center')}>
                    <img src={IcGoggle} className={cx('img')} />
                    <div className={cx('column')}>
                        <span className={cx('text-black medium h6')}>{Languages.profile.ggLink}</span>
                        <span className={cx('h6 y5', userManager.userInfo?.id_google ? 'text-green' : 'text-red')}>
                            {userManager.userInfo?.id_google ? Languages.profile.linked : Languages.profile.unlinked}</span>
                    </div>
                </div>
                <img src={IcChoose} className={cx('img-small')} />
            </div>
        );
    }, [userManager.userInfo?.id_google]);

    return (
        <div className={cx('page', 'padding', 'column')}>
            <span className={cx('text-black medium h5')}>{Languages.profile.accountLink}</span>
            {renderContent}
        </div>
    );
}

export default AccountLink;
