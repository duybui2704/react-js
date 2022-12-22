import { Table } from 'antd';
import classNames from 'classnames/bind';
import React, { ReactNode, useCallback } from 'react';
import style from './table-invest.module.scss';
const cx = classNames.bind(style);

interface DataColumnInvestType {
    key: string;
    id: string;
    receivingPeriod: string;
    principalAmount: string;
    profitAmount: string;
    total: string;
    receivedDate: string;
}

interface Column {
    title: string;
    dataIndex: string;
    key: string;
    align?: 'left' | 'right' | 'center';
    className?: string;
    defaultFilteredValue?: string[];
    render: ReactNode;

}

const columnName = ['STT', 'Kỳ nhận', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Ngày nhận'];
const columnDataIndex = ['id', 'receivingPeriod', 'principalAmount', 'profitAmount', 'total', 'receivedDate'];

export const data: DataColumnInvestType[] = [
    {
        key: '1',
        id: '1',
        receivingPeriod: 'Kỳ 1',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000,000',
        total: '1,000,000',
        receivedDate: '12/05/2023'
    },
    {
        key: '2',
        id: '2',
        receivingPeriod: 'Kỳ 2',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/06/2023'
    },
    {
        key: '3',
        id: '3',
        receivingPeriod: 'Kỳ 3',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/07/2023'
    },
    {
        key: '4',
        id: '4',
        receivingPeriod: 'Kỳ 4',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/08/2023'
    }
];



const TableInvest = () => {
    const arrayColumn = [] as Array<Column> | any;

    columnName.map((item: string, index: number) => {
        arrayColumn.push({
            title: item,
            dataIndex: columnDataIndex[index],
            key: columnDataIndex[index],
            align: 'center'
        });
    });

    const renderTableColumnValue = useCallback((_arrayColumn: Column[]) => {
        return (
            <thead>
                <tr className={cx('text-column')}>
                    {_arrayColumn.map((item: Column, index: number) => { return (<td key={index}>{item?.title}</td>); })}
                </tr>
            </thead>
        );

    }, []);

    const renderTableRowValue = useCallback((_arrayRow: DataColumnInvestType[]) => {
        return (
            <tbody className={cx('text-row')}>
                {_arrayRow?.map?.((item: DataColumnInvestType, index: number) => {
                    return (
                        <tr  key={index}>
                            <td>{item.id}</td>
                            <td>{item.receivingPeriod}</td>
                            <td>{item.principalAmount}</td>
                            <td>{item.profitAmount}</td>
                            <td>{item.total}</td>
                            <td>{item.receivedDate}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }, []);

    return (
        <table className={cx('table-container')} border={0}>

            {renderTableColumnValue(arrayColumn)}
            {renderTableRowValue(data)}

        </table>

    );
};

export default TableInvest;
