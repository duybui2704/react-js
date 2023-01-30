import classNames from 'classnames/bind';
import { COLOR_TRANSACTION } from 'commons/constants';
import React, { useCallback } from 'react';
import { COLORS } from 'theme/colors';
import style from './period-invest-mobile.module.scss';
const cx = classNames.bind(style);

const PeriodInvestMobile = ({ dataTableInvest, labelArr, arrKey }: { dataTableInvest: any, labelArr: Object, arrKey: Array<string> }) => {

    const renderLabel = useCallback((item?: Object) => {
        for (const key in item) {
            if (key === 'ky_tra') {
                return <span className={cx('text-green medium h7 text-center')}>{item['ky_tra']}</span>;
            }
            if (key === 'trang_thai') {
                return <span
                    className={cx('h7 center')}
                    style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}
                >
                    {item['trang_thai']}</span>;
            }
            if (key === 'ma_hop_dong') {
                return <span className={cx('medium h7 text-center text-blue')}>{item['ma_hop_dong']}</span>;
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
