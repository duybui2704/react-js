import classNames from 'classnames/bind';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './transaction.module.scss';

const cx = classNames.bind(styles);

function Transaction() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();

    return (
        <div className={cx('page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                Transaction
            </div>
        </div>
    );
}

export default Transaction;
