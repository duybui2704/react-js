import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import styles from './child-tabs-transaction.module.scss';
import { Col, Row } from 'antd';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { TYPE_INPUT } from 'commons/constants';
import { BUTTON_STYLES } from 'components/button/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import PeriodInvestMobile from 'components/period-invest-mobile';
import TableInvest from 'components/table-invest';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import { DataColumnTransactionType as DataColumnTransactionType } from 'models/transaction';
import TabsButtonBar from 'components/tabs-button-bar';
import { PopupBaseActions } from 'components/modal/modal';
import PopupBaseMobile from 'components/popup-base-mobile';
import Footer from 'components/footer';
import { useAppStore } from 'hooks';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import ScrollTopComponent from 'components/scroll-top';
import { Button } from 'components/button';
import { arrKeyTransactionMobile, arrKeyTransactionWeb, columnNameTransaction, labelArrTransactionMobile, TabTransaction } from 'assets/static-data/manage';

const cx = classNames.bind(styles);
interface HistoryFilter {
    optionInvest?: string;
    fromDate?: string;
    toDate?: string;
}

function ChildTabsTransaction({ keyTabs }: { keyTabs: number }) {
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [dataFilter, setDataFilter] = useState<HistoryFilter>({
        optionInvest: 'all',
        fromDate: '',
        toDate: ''
    });

    const [isLoading, setLoading] = useState<boolean>(false);
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnTransactionType[]>([]);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);
    const [tabName, setTabName] = useState<number>(keyTabs);

    const popupSearchRef = useRef<PopupBaseActions>(null);
    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);

    useEffect(() => {
        fetchDataFilter();
    }, [dataFilter]);

    const fetchDataFilter = useCallback(async (loadMore?: boolean) => {
        setLoading(true);
        const res = await apiServices.history.getTransactionList(
            dataFilter.fromDate || '',
            dataFilter.toDate || '',
            dataFilter.optionInvest,
            PAGE_SIZE_INVEST,
            loadMore ? offset : 0,
        ) as any;
        setLoading(false);
        if (res.success) {
            setCanLoadMore(res?.data?.length === PAGE_SIZE_INVEST);
            setOffset(last => !loadMore ? PAGE_SIZE_INVEST : last + PAGE_SIZE_INVEST);
            if (loadMore) {
                setDataPeriodInvest(last => [...last, ...res.data]);
            } else {
                setDataPeriodInvest(res?.data);
            }
        }
    }, [apiServices.history, dataFilter, offset]);

    const renderDate = useCallback((_placeHolder: string, _refInput: TextFieldActions | any, _value: string, minDate?: string) => {
        const onChangeInput = (event: string) => {
            if (!isMobile) {
                const isFromDate = _placeHolder === Languages.history.fromDate;
                setOffset(0);
                if (event !== dataFilter.fromDate && isFromDate) {
                    setDataFilter({ ...dataFilter, fromDate: event ? _refInput.current?.getValue?.() : '' });
                } else if (event !== dataFilter.toDate && !isFromDate) {
                    setDataFilter({ ...dataFilter, toDate: event ? _refInput.current?.getValue?.() : '' });
                }
            }
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
                    max={dataFilter.toDate || new Date().toISOString().split('T')[0]}
                    min={minDate}
                    inputStyle={cx('content-item-picker-text')}
                />
            </Col>
        );
    }, [dataFilter, isMobile]);

    const renderFilterWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                <Col xs={24} sm={24} md={12} lg={8} xl={6} className={cx(isMobile ? 'title-mobile' : 'title')}>
                    <span className={cx('text-gray8 medium h6')}>{Languages.transaction.infoTransactions}</span>
                </Col>
                {!isMobile &&
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        <Row gutter={[16, 4]}>
                            {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '')}
                            {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '', dataFilter.fromDate)}
                        </Row>
                    </Col>}
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, isMobile, renderDate]);

    const renderContentPopup = useMemo(() => {
        return (
            <Row gutter={[16, 4]}>
                <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                    <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                </Col>
                {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '')}
                {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
            </Row>
        );
    }, [dataFilter.fromDate, dataFilter.toDate, renderDate]);

    const onClosePopup = useCallback(() => {
        fromDateRef.current?.setValue?.('');
        toDateRef.current?.setValue?.('');
        setDataFilter({
            ...dataFilter,
            fromDate: '',
            toDate: ''
        });
        setOffset(0);
    }, [dataFilter]);

    const onSuccessPopup = useCallback(() => {
        setOffset(0);
        setDataFilter({
            ...dataFilter,
            fromDate: fromDateRef.current?.getValue(),
            toDate: toDateRef.current?.getValue()
        });
    }, [dataFilter]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef}
                hasCloseIc
                customerContent={renderContentPopup}
                hasTwoButton
                labelCancel={Languages.invest.cancel}
                labelSuccess={Languages.common.search}
                titleHeader={Languages.transaction.search}
                buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup}
                onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderContentPopup]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('right-top-search-component')} onClick={handleOpenPopupSearch}>
                <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                <img src={IcFilter} />
            </div>
        );
    }, [handleOpenPopupSearch]);

    const onChangeTab = useCallback((tabIndex: number, tabValue: string) => {
        if (tabName !== tabIndex) {
            setTabName(tabIndex);
            setDataFilter({ ...dataFilter, optionInvest: tabValue });
        }
    }, [dataFilter, tabName]);

    const loadMore = useCallback(() => {
        fetchDataFilter(true);
    }, [fetchDataFilter]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('tabs-container')}>
                <TabsButtonBar dataTabs={TabTransaction} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${keyTabs}`} />
                {isMobile && renderFilterMobile}
            </div>
            <div className={cx('scroll-container')}>
                <div className={cx(isMobile ? 'table-mobile-container' : 'table-web-container')}>
                    {renderFilterWeb}
                    {isMobile
                        ? <PeriodInvestMobile
                            dataTableInvest={dataPeriodInvest}
                            labelArr={labelArrTransactionMobile}
                            isLoading={isLoading}
                            description={Languages.transaction.describeNoData}
                            arrKey={arrKeyTransactionMobile} />

                        : <TableInvest
                            dataTableInvest={dataPeriodInvest}
                            columnName={columnNameTransaction}
                            isLoading={isLoading}
                            description={Languages.transaction.describeNoData}
                            arrKey={arrKeyTransactionWeb} />}
                </div>
                <Row onClick={loadMore} className={cx('button-see-more')}>
                    {canLoadMore &&
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button
                                buttonStyle={BUTTON_STYLES.GREEN}
                                fontSize={20}
                                width={100}
                                labelStyles={cx('label-button-see-more')}
                                label={Languages.transaction.seeMoreTransaction}
                                isLoading={isLoading}
                                spinnerClass={cx('spinner')}
                                isLowerCase />
                        </Col>}
                </Row>
                <Footer />
            </div>
            {renderPopupSearchPackage()}
            <ScrollTopComponent nameClassScroll={cx('scroll-container')} />
        </div>
    );
}

export default ChildTabsTransaction;
