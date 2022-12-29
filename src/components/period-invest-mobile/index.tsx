import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './period-invest-mobile.module.scss';
const cx = classNames.bind(style);

const PeriodInvestMobile = ({ dataTable }: { dataTable: DataColumnInvestType[] }) => {

    const renderKeyValue = useCallback((label: string, value?: string) => {
        return (
            <div className={cx(value?'key-value-container': 'not-key-value-container')}>
                <span className={cx('key-text')}>{label}</span>
                <span className={cx('value-text')}>{value}</span>
            </div>
        );

    }, []);

    const renderPeriod = useCallback((_arrayRow: DataColumnInvestType[]) => {
        return (
            <>
                {_arrayRow?.map?.((item: DataColumnInvestType, index: number) => {
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

    return (
        <div className={cx('table-container')}>
            {renderPeriod(dataTable)}
        </div>
    );
};

export default PeriodInvestMobile;
