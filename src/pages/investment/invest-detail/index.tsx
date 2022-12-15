import React, { useCallback } from 'react';
import ImgHeader from 'assets/image/img_home_header.jpg';
import styles from './invest-detail.module.scss';
import classNames from 'classnames/bind';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';

const cx = classNames.bind(styles);

function InvestDetail({ onNavigateInvest }: { onNavigateInvest: () => void }) {
    const onBack = useCallback(() => {
        onNavigateInvest();
    }, [onNavigateInvest]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')}/>
                <div onClick={onBack} className={cx('back')}>
                    <img src={IcLeftArrow} />
                </div>
                <div className={cx('text-banner-container')}>
                    <span>ĐẦU TƯ TIỆN NGAY</span>
                    <span>Xây dựng tương lai</span>
                    <span>Tiếp cận nhanh chóng các khoản đầu tư có chất lượng cao</span>
                </div>
            </div>
            
        </div>
    );
}

export default InvestDetail;
