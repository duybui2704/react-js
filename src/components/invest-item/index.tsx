import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback } from 'react';
import styles from './invest-item.module.scss';
import IcWarning from 'assets/image/ic_yellow_small_warning.svg';
import IcChecked from 'assets/image/ic_red_small_checked.svg';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import { PackageInvest } from 'models/invest';
import utils from 'utils/utils';

const cx = classNames.bind(styles);

function InvestItem({ dataInvest, onPressInvest }:
    {
        dataInvest?: PackageInvest, onPressInvest?: (data?: PackageInvest) => any
    }
) {
    const handlePressInvest = useCallback(() => {
        onPressInvest?.(dataInvest);
    }, [dataInvest, onPressInvest]);

    return (
        <div className={cx('all-container')}>
            <span className={cx('invest-amount-text')}>{utils.formatLoanMoney(dataInvest?.so_tien_dau_tu || '0')}</span>
            <div className={cx('invest-pay-form-container')}>
                <span className={cx('invest-pay-form-text')}>{`${Languages.invest.interestPayForm}${dataInvest?.hinh_thuc_tra_lai}`}</span>
                <img src={IcWarning} />
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} />
                <span className={cx('label-item')}>{Languages.invest.interestYear}</span>
                <span className={cx('value-item')}>{dataInvest?.ti_le_lai_suat_hang_nam}</span>
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} />
                <span className={cx('label-item')}>{Languages.invest.dateInvest}</span>
                <span className={cx('value-item')}>{dataInvest?.thoi_gian_dau_tu}</span>
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} />
                <span className={cx('label-item')}>{Languages.invest.expectedProfit}</span>
                <span className={cx('value-item')}>{utils.formatLoanMoney(dataInvest?.tong_lai_du_kien || '0')}</span>
            </div>
            <div className={cx('invest-now-wrap')}>
                <div className={cx('invest-now-container')} onClick={handlePressInvest} >
                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                </div>
            </div>
        </div>
    );
}

export default InvestItem;
