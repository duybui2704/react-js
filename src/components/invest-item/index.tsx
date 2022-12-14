import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React from 'react';
import styles from './invest-item.module.scss';
import IcWarning from 'assets/image/ic_yellow_small_warning.svg';
import IcChecked from 'assets/image/ic_red_small_checked.svg';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';

const cx = classNames.bind(styles);

function InvestItem({ investAmount, interestPayForm, interestYear, dateInvest, expectedProfit, onPressInvest }:
    {
        investAmount?: string, interestPayForm?: string, interestYear?: string, dateInvest?: string, expectedProfit?: string, onPressInvest?: () => void
    }
) {
    return (
        <div className={cx('all-container')}>
            <span className={cx('invest-amount-text')}>{investAmount || '80,000,000 vnđ'}</span>
            <div className={cx('invest-pay-form-container')}>
                <span className={cx('invest-pay-form-text')}>{`${Languages.invest.interestPayForm}${interestPayForm || 'Lãi hàng tháng gốc hàng tháng'}`}</span>
                <img src={IcWarning} />
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} className={cx('ic-checked')} />
                <span className={cx('label-item')}>{Languages.invest.interestYear}</span>
                <span className={cx('value-item')}>{interestYear || '12%'}</span>
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} className={cx('ic-checked')} />
                <span className={cx('label-item')}>{Languages.invest.dateInvest}</span>
                <span className={cx('value-item')}>{dateInvest || '6 tháng'}</span>
            </div>
            <div className={cx('invest-key-value-container')}>
                <img src={IcChecked} />
                <span className={cx('label-item')}>{Languages.invest.expectedProfit}</span>
                <span className={cx('value-item')}>{expectedProfit || '12,000,000 vnđ'}</span>
            </div>
            <div className={cx('invest-now-wrap')}>
                <div className={cx('invest-now-container')} onClick={onPressInvest} >
                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                </div>
            </div>
        </div>
    );
}

export default InvestItem;
