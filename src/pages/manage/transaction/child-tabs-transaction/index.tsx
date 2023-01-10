import React, { useCallback, useMemo, useRef, useState, useEffect} from 'react';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import styles from './child-tabs-transaction.module.scss';
import { Col, Row } from 'antd';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { TYPE_INPUT } from 'commons/constants';
import useIsMobile from 'hooks/use-is-mobile.hook';
import PeriodInvestMobile from 'components/period-invest-mobile';
import TableInvest from 'components/table-invest';
import {dataColumnTransaction, transactionMoneyOut, transactionMoneyIn, columnNameTransaction, columnNameTransactionMobile} from 'pages/__mocks__/transaction';

import { DataColumnTrasactionType } from 'models/transaction';

const cx = classNames.bind(styles);
interface HistoryFilter {
    amountInvest?: string;
    fromDate?: string;
    toDate?: string;
}

const labelArrMobile = {

    money: Languages.transaction.table.money,
    content: Languages.transaction.table.content,
    time: Languages.transaction.table.time
};

const labelArrWeb = [
    Languages.transaction.table.stt,
    Languages.transaction.table.money,
    Languages.transaction.table.content,
    Languages.transaction.table.contractId,
    Languages.transaction.table.time
];

const arrKeyMobile = ['money', 'content', 'time'];
const arrKeyWeb = ['stt','money', 'content', 'ma_hop_dong', 'time'];


function ChildTabsTransaction({keyTabs}: {keyTabs?: string}) {
    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({});
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnTrasactionType[]>([]);

    useEffect(() => {
        console.log('keyTabs', keyTabs);
        if (keyTabs === '1') {
            setDataPeriodInvest(convertData(dataColumnTransaction));
        } else if (keyTabs === '2'){
            setDataPeriodInvest(convertData(transactionMoneyOut));
        } else {
            setDataPeriodInvest(convertData(transactionMoneyIn));
        }
    }, [keyTabs]);

    // thêm trường stt vào từng item trong mảng
    const convertData = useCallback((data: any) => {
        for (let i = 0; i < data?.length; i++) {
            data[i].stt = (i + 1).toString();
        }
        return data;
    }, []);
    
    const renderDate = useCallback((_placeHolder: string, _refInput: TextFieldActions | any, _value: string) => {
        const onChangeInput = (event: any) => { // format date: 2022-12-14
            // const [year, month, day] = _refInput.current?.getValue?.()?.trim().split('-') || '';
            // const value = `${day}/${month}/${year}` || '';
            console.log('event==', _refInput.current?.getValue?.());

        };
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                <MyTextInput
                    ref={_refInput}
                    type={TYPE_INPUT.DATE}
                    inputStyle={cx('content-item-picker-text')}
                    placeHolder={_placeHolder}
                    value={_value}
                    maxLength={8}
                    onChangeText={onChangeInput}
                />
            </Col>
        );
    }, []);

    const renderFilterWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {!isMobile && <Col xs={24} sm={24} md={12} lg={8} xl={6} className={cx('title')}>                  
                    <span className={cx('text-gray8 medium h6')}>{Languages.transaction.infoTransactions}</span>
                </Col>}
                <Col xs={24} sm={24} md={12} lg={16} xl={18} className={cx('flex-end')}>
                    <div className={cx('wid-50')}>
                        <Row gutter={[16, 4]}>
                            {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                            {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, isMobile, renderDate]);
    return (
        <div className={cx('container')}>
            { renderFilterWeb}
            <div className={cx('invest-note-container')}>
                {isMobile ?
                    <PeriodInvestMobile dataTableInvest={dataPeriodInvest} labelArr={labelArrMobile} arrKey={arrKeyMobile}  /> :
                    <TableInvest dataTableInvest={dataPeriodInvest} columnName={labelArrWeb} arrKey={arrKeyWeb}/> }
            </div>
        </div>
    );
}

export default ChildTabsTransaction;
