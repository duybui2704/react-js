import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Detail, Total } from 'models/comission';
import React, { useCallback } from 'react';
import style from './table-commission.module.scss';
const cx = classNames.bind(style);

const TableCommission = ({ dataTableInvest, dataFooter, columnName }: {
    dataTableInvest?: Detail[];
    columnName: string[];
    dataFooter: Total;
}) => {
    const renderTableColumnValue = useCallback((_arrayColumn: Array<string>) => {
        return (
            <thead>
                <tr>
                    {_arrayColumn?.map?.((item: string, index: number) => {
                        return <td key={index}>{item}</td>;
                    })}
                </tr>
            </thead>
        );
    }, []);

    const renderTableRowValueInvest = useCallback(
        (_arrayRow: Detail[]) => {
            return (
                <tbody>
                    {_arrayRow?.map?.((item: Detail, index: number) => {
                        return (
                            <tr
                                key={index}
                                className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}
                            >
                                <td>{index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.total_money}</td>
                                <td>{item?.money_commission}</td>
                            </tr>
                        );
                    })}
                </tbody>
            );
        }, []
    );

    const renderTableRowFooter = useCallback(
        (_arrayRow: Total) => {
            return (
                <tbody>
                    <tr className={cx('style-table-footer')}>
                        <td colSpan={2}>{Languages.tableCommission.sum}</td>
                        <td>{_arrayRow?.total_money || 0}</td>
                        <td>{_arrayRow?.money_commission || 0}</td>
                    </tr>
                </tbody>
            );
        }, []
    );

    return (
        <table className={cx('table-style')}>
            {renderTableColumnValue(columnName || [])}
            {renderTableRowValueInvest(dataTableInvest || [])}
            {renderTableRowFooter(dataFooter || [])}
        </table>
    );
};

export default TableCommission;
