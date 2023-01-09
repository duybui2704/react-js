import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import {
    DataColumnCommissionType,
    DataTotalColumnCommissionType
} from 'models/invest';
import React, { useCallback } from 'react';
import style from './table-commission.module.scss';
const cx = classNames.bind(style);

const TableCommission = ({dataTableInvest, dataFooter, columnName }: {
  dataTableInvest?: DataColumnCommissionType[];
  columnName: string[];
  dataFooter: DataTotalColumnCommissionType;
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
        (_arrayRow: DataColumnCommissionType[]) => {
            return (
                <tbody>
                    {_arrayRow?.map?.((item: DataColumnCommissionType, index: number) => {
                        return (
                            <tr
                                key={index}
                                className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}
                            >
                                <td>{item?.id}</td>
                                <td>{item?.phoneNumber}</td>
                                <td>{item?.totalInvest}</td>
                                <td>{item?.commissionAmount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            );
        }, []
    );

    const renderTableRowFooter = useCallback(
        (_arrayRow: DataTotalColumnCommissionType) => {
            return (
                <tbody>
                    <tr className={cx('style-table-footer')}>
                        <td colSpan={2}>{Languages.tableCommission.sum}</td>
                        <td>{_arrayRow?.totalInvest}</td>
                        <td>{_arrayRow?.totalCommission}</td>
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
