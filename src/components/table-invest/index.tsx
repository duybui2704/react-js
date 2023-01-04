import classNames from 'classnames/bind';
import { TYPE_STATUS_DETAIL_HISTORY } from 'commons/constants';
import Languages from 'commons/languages';
import { DataColumnHistoryType, DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './table-invest.module.scss';
const cx = classNames.bind(style);

const TableInvest = ({ dataTableInvest, dataTableHistory, columnName, isDetailHistory }: { dataTableInvest?: DataColumnInvestType[], dataTableHistory?: DataColumnHistoryType[], columnName: string[], isDetailHistory?: boolean }) => {

    const renderTableColumnValue = useCallback((_arrayColumn: Array<string>) => {
        return (
            <thead>
                <tr>
                    {_arrayColumn?.map?.((item: string, index: number) => { return (<td key={index}>{item}</td>); })}
                </tr>
            </thead>
        );
    }, []);

    const renderTableRowValueInvest = useCallback((_arrayRow: DataColumnInvestType[]) => {
        return (
            <tbody>
                {_arrayRow?.map?.((item: DataColumnInvestType, index: number) => {
                    return (
                        <tr key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                            <td>{item?.id}</td>
                            <td>{item?.receivingPeriod}</td>
                            <td>{item?.principalAmount}</td>
                            <td>{item?.profitAmount}</td>
                            <td>{item?.total}</td>
                            <td>{item?.receivedDate}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }, []);

    const renderTableRowValueHistory = useCallback((_arrayRow: DataColumnHistoryType[]) => {
        return (
            <tbody>
                {_arrayRow?.map?.((item: DataColumnHistoryType, index: number) => {
                    return (
                        <tr key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                            <td>{item?.id}</td>
                            <td>{item?.principalAmount}</td>
                            <td>{item?.profitAmount}</td>
                            <td>{item?.total}</td>
                            <td className={cx(item?.status === TYPE_STATUS_DETAIL_HISTORY.PAYED ? 'green-value' : '')}>{item?.status === TYPE_STATUS_DETAIL_HISTORY.PAYED ? Languages.historyDetail.payed : Languages.historyDetail.unPayed}</td>
                            <td>{item?.receivedDate}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }, []);

    return (
        <table >
            {renderTableColumnValue(columnName || [])}
            {isDetailHistory ? renderTableRowValueHistory(dataTableHistory || []) : renderTableRowValueInvest(dataTableInvest || [])}
        </table>
    );
};

export default TableInvest;
