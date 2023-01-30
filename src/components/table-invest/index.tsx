import classNames from 'classnames/bind';
import { COLOR_TRANSACTION, TYPE_STATUS_INVEST } from 'commons/constants';
import Languages from 'commons/languages';
import React, { useCallback } from 'react';
import { COLORS } from 'theme/colors';
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
                    {_arrayRow?.map?.((item: any, index: number) => {

                        const renderItem = (key: string, _indexItem: number) => {
                            if (key === 'trang_thai') {
                                return <td
                                    key={_indexItem}
                                    className={cx('h7')}
                                    style={{ color: item['color'] === COLOR_TRANSACTION.GREEN ? COLORS.GREEN_2 : item['color'] }}
                                >
                                    {item['trang_thai']}</td>;
                            } else {
                                return <td className={cx('text-gray h7')} key={_indexItem}>{item[key]}</td>;
                            }
                        };

                        return (
                            <tr key={index} className={cx((index + 1) % 2 === 0 ? 'row-even' : 'row-odd')}>
                                {_arrKey?.map((keyItem: string, _index: number) => {
                                    if (Object.keys(item).some((key => key === keyItem))) {
                                        return renderItem(keyItem, _index);
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

