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
import {dataColumnTransaction, TransactionMoneyOut, transactionMoneyIn, columnNameTransaction, columnNameTransactionMobile} from 'pages/__mocks__/transaction';

import { DataColumnTrasactionType } from 'models/transaction';

const cx = classNames.bind(styles);
interface HistoryFilter {
    amountInvest?: string;
    fromDate?: string;
    toDate?: string;
}

function ChildTabsTransaction({keyTabs}: {keyTabs?: string}) {
    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({});
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnTrasactionType[]>([]);

    useEffect(() => {
        console.log('keyTabs', keyTabs);
        if (keyTabs === '1') {
            setDataPeriodInvest(dataColumnTransaction);
        } else if (keyTabs === '2'){
            setDataPeriodInvest(TransactionMoneyOut);
        } else {
            setDataPeriodInvest(transactionMoneyIn);
        }
    }, [keyTabs]);

    
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
                    <PeriodInvestMobile dataTable={dataPeriodInvest} columnName={columnNameTransactionMobile} /> :
                    <TableInvest dataTable={dataPeriodInvest} columnName={columnNameTransaction} />}
            </div>
        </div>
    );
}

export default ChildTabsTransaction;
