import classNames from 'classnames/bind';
import { TYPE_STATUS_INVEST } from 'commons/constants';
import Languages from 'commons/languages';
import { DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './period-invest-mobile.module.scss';
const cx = classNames.bind(style);

const PeriodInvestMobile = ({ dataTableInvest, labelArr, arrKey} : { dataTableInvest: any, labelArr: Object, arrKey: Array<string> }) => {

    const renderLabel = useCallback((item: Object) => {
        for (const key in item) {
            if (key === 'receivingPeriod') {
                return <span className={cx('text-green medium h7 text-center')}>{item['receivingPeriod']}</span>;
            }
            if (key === 'status') {
                return <span className={cx('h7 center', item[key] === TYPE_STATUS_INVEST.PAYED ? 'text-green' : 'text-gray')}>
                    {item[key] === TYPE_STATUS_INVEST.PAYED ? Languages.historyDetail.payed : Languages.historyDetail.unPayed}</span>;
            }
            if (key === 'ma_hop_dong') {    
                return <span className={cx('medium h7 text-center text-green')}>{item['ma_hop_dong']}</span>;
            }
        }
    }, []);

    const renderPeriodInvest = useCallback(() => {
        return (
            <>
                {dataTableInvest && dataTableInvest?.map?.((item: any, index: number) => {

                    return (
                        <div key={index} className={cx('period-container', 'column')}>
                            <div className={cx('column')}>
                                {renderLabel(item)}
                            </div>
                            <div className={cx('column')}>
                                <div key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                                    {arrKey?.map((keyItem: string, indexKey: number) => {
                                        if (Object.keys(item).some((key => key === keyItem))) {
                                            return (
                                                <div className={cx('row y20 space-between')} key={indexKey}>
                                                    <span className={cx('text-gray h7 text-end')}>{labelArr[keyItem]}</span>
                                                    <span className={cx('text-gray h7 text-end')}>{item[keyItem]}</span>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }, [arrKey, dataTableInvest, labelArr, renderLabel]);

    return (
        <div className={cx('table-container')}>
            {renderPeriodInvest()}
        </div>
    );
};

export default PeriodInvestMobile;
