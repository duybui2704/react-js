import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import styles from './child-tabs-transaction.module.scss';
import { Col, Row } from 'antd';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { TYPE_INPUT, TYPE_TAB_HISTORY } from 'commons/constants';
import { BUTTON_STYLES } from 'components/button/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import PeriodInvestMobile from 'components/period-invest-mobile';
import TableInvest from 'components/table-invest';
import { dataColumnTransaction, transactionMoneyOut, transactionMoneyIn, columnNameTransaction, columnNameTransactionMobile } from 'pages/__mocks__/transaction';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import { DataColumnTransactionType as DataColumnTransactionType } from 'models/transaction';
import TabsButtonBar from 'components/tabs-button-bar';
import { PopupBaseActions } from 'components/modal/modal';
import PopupBaseMobile from 'components/popup-base-mobile';
import { ItemProps } from 'models/common';
import { PickerAction } from 'components/picker-component/picker-component';
import { amountListData } from 'pages/__mocks__/invest';
import Footer from 'components/footer';


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

const arrKeyMobile = ['money', 'content', 'time'];
const arrKeyWeb = ['stt', 'money', 'content', 'ma_hop_dong', 'time'];

function ChildTabsTransaction({ keyTabs }: { keyTabs: number }) {
    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);
    const isMobile = useIsMobile();
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({});
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnTransactionType[]>([]);

    const [tabName, setTabName] = useState<number>(keyTabs);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const [countInvest, setCountInvest] = useState<number>(0);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const pickerAmountRef = useRef<PickerAction>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(() => {
        setAmountList(amountListData);
        setCountInvest(tabName === TYPE_TAB_HISTORY.IS_INVESTING ? 12 : 4);
    }, [tabName]);
    

    useEffect(() => {
        console.log('keyTabs', keyTabs);
        if (tabName === 1) {
            setDataPeriodInvest(convertData(dataColumnTransaction));
        } else if (tabName === 2) {
            setDataPeriodInvest(convertData(transactionMoneyOut));
        } else {
            setDataPeriodInvest(convertData(transactionMoneyIn));
        }
    }, [keyTabs, tabName]);

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
                <Col xs={24} sm={24} md={12} lg={8} xl={6} className={cx(isMobile ? 'title-mobile' : 'title')}>
                    <span className={cx('text-gray8 medium h6')}>{Languages.transaction.infoTransactions}</span>
                </Col>
                {!isMobile &&  <Col xs={24} sm={24} md={12} lg={16} xl={18} className={cx('flex-end')}>
                    <div className={cx('wid-50')}>
                        <Row gutter={[16, 4]}>
                            {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                            {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
                        </Row>
                    </div>
                </Col>}
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, isMobile, renderDate]);

    const renderContentPopup = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                    <Row gutter={[16, 4]}>
                        <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                            <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                        </Col>
                        {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
                    </Row>
                </Col>
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, renderDate]);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        setDataFilter({});
    }, []);

    const onSuccessPopup = useCallback(() => {
        fetchData();
    }, [fetchData]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef} hasCloseIc
                customerContent={renderContentPopup} hasTwoButton
                labelCancel={Languages.invest.cancel} labelSuccess={Languages.common.search}
                titleHeader={Languages.transaction.search} buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup} onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderContentPopup]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <div className={cx('right-top-search-component')} onClick={handleOpenPopupSearch}>
                    <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                </div>
            </div>
        );
    }, [handleOpenPopupSearch]);

    const onChangeTab = useCallback((tabNumber: number) => {
        if (tabName !== tabNumber) {
            setTabName(tabNumber);
            console.log(tabNumber);
        }
    }, [tabName]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('content-container')}>
                <div className={cx('tabs-container')}>
                    <TabsButtonBar dataTabs={Languages.transactionTabs} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${keyTabs}`} />
                    {isMobile && renderFilterMobile}
                </div>
                    
            </div>
               
            <div className={cx(isMobile ? 'scroll-mobile-container' : 'scroll-web-container')}>
                <div  className={cx(isMobile ? 'table-mobile-container' : 'table-web-container')}>
                    {renderFilterWeb}
                    {isMobile ?
                        <PeriodInvestMobile dataTableInvest={dataPeriodInvest} labelArr={labelArrMobile} arrKey={arrKeyMobile} /> :
                        <TableInvest dataTableInvest={dataPeriodInvest} columnName={columnNameTransaction} arrKey={arrKeyWeb} />}
                </div>
                <Footer/>
            </div>
            {renderPopupSearchPackage()}
        </div>        
    );
}

export default ChildTabsTransaction;
