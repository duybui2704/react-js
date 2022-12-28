import classNames from 'classnames/bind';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './history.module.scss';

const cx = classNames.bind(styles);

function History() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();

    return (
        <div className={cx('page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                History
            </div>
        </div>
    );
}

export default History;
