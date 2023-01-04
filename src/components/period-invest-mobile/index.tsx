import classNames from 'classnames/bind';
import { TYPE_STATUS_DETAIL_HISTORY } from 'commons/constants';
import Languages from 'commons/languages';
import { DataColumnHistoryType, DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './period-invest-mobile.module.scss';
const cx = classNames.bind(style);

const PeriodInvestMobile = ({ dataTableInvest, dataTableHistory, isDetailHistory }: { dataTableInvest?: DataColumnInvestType[], dataTableHistory?: DataColumnHistoryType[], isDetailHistory?: boolean }) => {

    const renderKeyValue = useCallback((label: string, value?: string, greenValue?: boolean) => {
        return (
            <div className={cx(value ? 'key-value-container' : 'not-key-value-container')}>
                <span className={cx(greenValue ? 'green-key-text' : 'key-text')}>{label}</span>
                <span className={cx('value-text')}>{value}</span>
            </div>
        );

    }, []);

    const renderPeriodInvest = useCallback((_arrayRow: DataColumnInvestType[]) => {
        return (
            <>
                {_arrayRow && _arrayRow?.map?.((item: DataColumnInvestType, index: number) => {
                    return (
                        <div key={index} className={cx('period-container')}>
                            {renderKeyValue(item?.receivingPeriod)}
                            {renderKeyValue(Languages.invest.datePayment, item?.receivedDate)}
                            {renderKeyValue(Languages.invest.principalAmount, item?.principalAmount)}
                            {renderKeyValue(Languages.invest.interestAmount, item?.profitAmount)}
                            {renderKeyValue(Languages.invest.totalAmount, item?.total)}
                        </div>
                    );
                })}
            </>
        );
    }, [renderKeyValue]);

    const renderPeriodHistory = useCallback((_arrayRow: DataColumnHistoryType[]) => {
        return (
            <>
                {_arrayRow && _arrayRow?.map?.((item: DataColumnHistoryType, index: number) => {
                    return (
                        <div key={index} className={cx('period-container')}>
                            {renderKeyValue(item?.status === TYPE_STATUS_DETAIL_HISTORY.PAYED ? Languages.historyDetail.payed : Languages.historyDetail.unPayed, '', item?.status === TYPE_STATUS_DETAIL_HISTORY.PAYED ? true : false)}
                            {renderKeyValue(Languages.invest.datePayment, item?.receivedDate)}
                            {renderKeyValue(Languages.invest.principalAmount, item?.principalAmount)}
                            {renderKeyValue(Languages.invest.interestAmount, item?.profitAmount)}
                            {renderKeyValue(Languages.invest.totalAmount, item?.total)}
                        </div>
                    );
                })}
            </>
        );
    }, [renderKeyValue]);

    return (
        <div className={cx('table-container')}>
            {isDetailHistory ? renderPeriodHistory(dataTableHistory || []) : renderPeriodInvest(dataTableInvest || [])}
        </div>
    );
};

export default PeriodInvestMobile;
