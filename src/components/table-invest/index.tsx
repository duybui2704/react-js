import classNames from 'classnames/bind';
import { TYPE_STATUS_INVEST } from 'commons/constants';
import Languages from 'commons/languages';
import { DataColumnInvestType } from 'models/invest';
import React, { useCallback } from 'react';
import style from './table-invest.module.scss';
const cx = classNames.bind(style);

const TableInvest = ({ dataTableInvest, arrKey, columnName }: { dataTableInvest: any, arrKey: Array<string>, columnName: string[] }) => {

    const renderTableRowValueInvest = useCallback((_arrayRow: any, _arrayColumn: Array<string>, _arrKey: Array<string>) => {
        return (
            <>
                <thead>
                    <tr>
                        {_arrayColumn?.map?.((item: string, index: number) => { return (<td className={cx('text-black h7 bold')} key={index}>{item}</td>); })}
                    </tr>
                </thead>
                <tbody>
                    {_arrayRow?.map?.((item: DataColumnInvestType, index: number) => {

                        const renderItem = (key: string) => {
                            if (key === 'status') {
                                return <td className={cx('h7', item[key] === TYPE_STATUS_INVEST.PAYED ? 'text-green' : 'text-gray')}>
                                    {item[key] === TYPE_STATUS_INVEST.PAYED ? Languages.historyDetail.payed : Languages.historyDetail.unPayed}</td>;
                            } else {
                                return <td className={cx('text-gray h7')}>{item[key]}</td>;
                            }
                        };

                        return (
                            <tr key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                                {_arrKey?.map((keyItem: string) => {
                                    if (Object.keys(item).some((key => key === keyItem))) {
                                        return (
                                            <>
                                                {renderItem(keyItem)}
                                            </>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </>
        );
    }, []);

    return (
        <table>
            {renderTableRowValueInvest(dataTableInvest, columnName, arrKey)}
        </table>
    );
};

export default TableInvest;

