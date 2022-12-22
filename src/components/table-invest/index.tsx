import classNames from 'classnames/bind';
import { DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './table-invest.module.scss';
const cx = classNames.bind(style);

const TableInvest = ({ dataTable, columnName }: { dataTable: DataColumnInvestType[], columnName: string[] }) => {

    const renderTableColumnValue = useCallback((_arrayColumn: Array<string>) => {
        return (
            <thead>
                <tr className={cx('text-column')}>
                    {_arrayColumn.map((item: string, index: number) => { return (<td key={index}>{item}</td>); })}
                </tr>
            </thead>
        );

    }, []);

    const renderTableRowValue = useCallback((_arrayRow: DataColumnInvestType[]) => {
        return (
            <tbody className={cx('text-row')}>
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

    return (
        <table className={cx('table-container')}>
            {renderTableColumnValue(columnName)}
            {renderTableRowValue(dataTable)}
        </table>
    );
};

export default TableInvest;
