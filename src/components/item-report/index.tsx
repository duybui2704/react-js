import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback } from 'react';
import styles from './item-report.module.scss';
import utils from 'utils/utils';
import { OverviewMonthOfQuarterModel, TotalOfQuarterModel } from 'models/report';

const cx = classNames.bind(styles);

function ItemReport({ dataMonthReport, dataQuarterReport, title, isOverviewQuarter, isMobile }:
    {
        title?: string, dataMonthReport?: OverviewMonthOfQuarterModel, dataQuarterReport?: TotalOfQuarterModel, isOverviewQuarter?: boolean, isMobile?: boolean
    }
) {

    const renderKeyValue = useCallback((_label: string, _value?: string, isLast?: boolean) => {
        return (
            <div className={cx('report-key-value-container')}>
                <span className={cx(isMobile ? 'label-item-mobile' : 'label-item')}>{_label}</span>
                <span className={cx(isLast ? (isMobile ? 'last-value-item-mobile' : 'last-value-item') : (isMobile ? 'text-black h7 medium' : 'value-item'))}>{_value}</span>
            </div>
        );
    }, [isMobile]);

    return (
        <div className={cx(isOverviewQuarter ? 'all-container-overview' : 'all-container')}>
            <span className={cx(isMobile ? 'report-detail-month-text-mobile' : 'report-detail-month-text')}>{title || `${Languages.report.detailMonth}${dataMonthReport?.month}`}</span>
            {renderKeyValue(Languages.report.contractNumber, utils.formatMoneyNotSuffixes(isOverviewQuarter ? dataQuarterReport?.tong_hop_dong : dataMonthReport?.so_hop_dong_dau_tu || '0'))}
            {renderKeyValue(Languages.report.amountOfInvest, utils.formatMoneyNotSuffixes(isOverviewQuarter ? dataQuarterReport?.tong_tat_ca_tien_dau_tu : dataMonthReport?.tong_tien_dau_tu || '0'))}
            {renderKeyValue(Languages.report.originAmountCollected, utils.formatMoneyNotSuffixes(isOverviewQuarter ? dataQuarterReport?.tien_goc_thu_ve : dataMonthReport?.tien_goc_thu_ve || '0'))}
            {renderKeyValue(Languages.report.interestAmount, utils.formatMoneyNotSuffixes(isOverviewQuarter ? dataQuarterReport?.tong_lai_phi : dataMonthReport?.tong_lai_phi || '0'), true)}
        </div>
    );
}

export default ItemReport;
