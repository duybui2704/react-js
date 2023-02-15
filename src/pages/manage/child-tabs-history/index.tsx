import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';

import { TabHistory } from 'assets/static-data/manage';
import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { Events, TAB_INDEX, TYPE_INPUT, TYPE_TAB_HISTORY } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import HistoryPackage from 'components/history-package';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { PopupBaseActions } from 'components/modal/modal';
import NoData from 'components/no-data';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import ScrollTopComponent from 'components/scroll-top';
import Spinner from 'components/spinner';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
import { PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventEmitter } from 'utils/event-emitter';
import utils from 'utils/utils';
import styles from './child-tabs-history.module.scss';

const cx = classNames.bind(styles);
interface HistoryFilter {
    optionInvest?: string;
    amountInvest?: string;
    fromDate?: string;
    toDate?: string;
    interestForm?: string;
}

const ChildTabsHistory = observer(({ onNextScreen, tabsNumber }: {
    onNextScreen: (data: PackageInvest, tabs: number) => void,
    tabsNumber: number
}) => {
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [tabIndex, setTabIndex] = useState<number>(tabsNumber);
    const [investList, setInvestList] = useState<PackageInvest[]>([]);

    const [dataTypeInterest, setDataTypeInterest] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({
        optionInvest: `${tabsNumber + 1}` || '1', // tabsNumber===( 0: investing, 1: đã đáo hạn)
        amountInvest: '',
        fromDate: '',
        toDate: '',
        interestForm: ''
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerTypeInterestRef = useRef<PickerAction>(null);

    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);

    useEffect(() => {
        fetchDataSearch();
    }, []);

    useEffect(() => {
        fetchHistoryList();
    }, [dataFilter]);

    const fetchHistoryList = useCallback(async (loadMore?: boolean) => {
        setLoading(true);
        const investmentList = await apiServices.invest.getListContractInvesting(
            dataFilter.interestForm || '',
            dataFilter.optionInvest || '1',
            '',
            dataFilter.amountInvest || '',
            dataFilter.fromDate || '',
            dataFilter.toDate || '',
            loadMore ? offset : 0,
            PAGE_SIZE_INVEST) as any;
        setLoading(false);
        if (investmentList.success) {
            setCanLoadMore(investmentList?.data?.length === PAGE_SIZE_INVEST);
            setOffset(last => !loadMore ? PAGE_SIZE_INVEST : last + PAGE_SIZE_INVEST);
            if (loadMore) {
                setInvestList(last => [...last, ...investmentList.data]);
            } else {
                setInvestList(investmentList?.data);
            }
        }
    }, [apiServices.invest, dataFilter, offset]);

    const fetchDataSearch = useCallback(async () => {
        const amountFilter = await apiServices.invest.getListMoneyInvestment() as any;
        const interest = await apiServices.invest.getListTypeInterest() as any;

        if (amountFilter.success) {
            const dataAmountFilter = utils.formatObjectFilterInvest(amountFilter?.data as Object);
            setAmountList(dataAmountFilter);
        }

        if (interest.success) {
            const dataInterest = utils.formatObjectFilterInvest(interest?.data as Object);
            setDataTypeInterest(dataInterest);
        }
    }, [apiServices.invest]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: string) => {
            if (item && !isMobile) {
                setOffset(0);
                setDataFilter({
                    ...dataFilter,
                    amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest,
                    interestForm: _title === Languages.invest.typeInterest ? item : dataFilter.interestForm
                });
            }
        };
        const handleClearDataFilter = () => {
            setOffset(0);
            setDataFilter({
                ...dataFilter,
                amountInvest: _title === Languages.invest.investAmount ? '' : dataFilter.amountInvest,
                interestForm: _title === Languages.invest.investAmount ? '' : dataFilter.interestForm
            });
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} >
                <PickerComponent ref={_ref}
                    data={_data}
                    title={_title}
                    placeholder={_placeholder}
                    onSelectItem={onSelectItem}
                    allowClear={isMobile ? true : false}
                    onClear={handleClearDataFilter}
                    mainContainer={cx('main-container')}
                />
            </Col>
        );
    }, [dataFilter, isMobile]);

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
                    inputStyle={cx('content-item-picker-text')}
                    placeHolder={_placeHolder}
                    value={_value}
                    maxLength={8}
                    onChangeText={onChangeInput}
                    max={dataFilter.toDate || new Date().toISOString().split('T')[0]}
                    min={minDate}
                />
            </Col>
        );
    }, [dataFilter, isMobile]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const onClosePopup = useCallback(() => {
        pickerTypeInterestRef.current?.clearValue?.();
        pickerAmountRef.current?.clearValue?.();
        fromDateRef.current?.setValue?.('');
        toDateRef.current?.setValue?.('');
        setDataFilter({});
        setOffset(0);
    }, []);

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{Languages.invest.listInvest}</span>
                <div className={cx('row center')}>
                    <div className={cx('right-top-search-component')} onClick={handleOpenPopupSearch}>
                        <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                        <img src={IcFilter} />
                    </div>
                    <span className={cx('text-red h7 xl10')} onClick={onClosePopup}>{Languages.common.filterCancel}</span>
                </div>
            </div>
        );
    }, [handleOpenPopupSearch, onClosePopup]);

    const renderFilterWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {renderPicker(pickerTypeInterestRef, Languages.invest.typeInterest, Languages.invest.chooseTypeInterest, dataTypeInterest)}
                {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                <Col xs={24} sm={24} md={24} lg={24} xl={isMobile ? 24 : 8}>
                    <Row gutter={[24, 4]}>
                        <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                            <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                        </Col>
                        {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '', dataFilter.fromDate)}
                    </Row>
                </Col>
            </Row>
        );
    }, [amountList, dataFilter.fromDate, dataFilter.toDate, dataTypeInterest, isMobile, renderDate, renderPicker]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNextScreen(dataInvest, tabIndex);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('col-history')} key={`${index}${dataInvest.id}`}>
                <HistoryPackage
                    onPressPackage={onNavigateInvestDetail}
                    dataInvest={dataInvest}
                    isInvesting={tabIndex === TYPE_TAB_HISTORY.IS_INVESTING} />
            </Col>
        );
    }, [onNextScreen, tabIndex]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={isMobile ? [24, 16] : [24, 24]}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(index, itemInvest);
                })}
            </Row>
        );
    }, [isMobile, renderItemInvest]);

    const onSuccessPopup = useCallback(() => {
        setOffset(0);
        setDataFilter({
            ...dataFilter,
            interestForm: pickerTypeInterestRef.current?.getValue() || '',
            amountInvest: pickerAmountRef.current?.getValue() || '',
            fromDate: fromDateRef.current?.getValue(),
            toDate: toDateRef.current?.getValue()
        });
    }, [dataFilter]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef}
                hasCloseIc
                customerContent={renderFilterWeb}
                hasTwoButton
                labelCancel={Languages.invest.cancel}
                labelSuccess={Languages.common.search}
                titleHeader={Languages.history.searchProjectInvest}
                buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup}
                onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderFilterWeb]);

    const onInvestNow = useCallback(() => {
        EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INVESTMENT);
    }, []);

    const renderFlatList = useCallback((_list: PackageInvest[]) => {
        const loadMore = () => {
            fetchHistoryList(true);
        };
        return (
            <div className={cx('bottom-container')} >
                {investList.length > 0
                    ? <div className={cx('flat-list')}>
                        {renderInvestList(_list)}
                        <Row gutter={[24, 0]} className={cx('button-see-more')}>
                            {canLoadMore &&
                                <Col xs={24} sm={24} md={12} lg={12} xl={8} onClick={loadMore}>
                                    <Button
                                        buttonStyle={BUTTON_STYLES.GREEN}
                                        fontSize={20}
                                        width={100}
                                        labelStyles={cx('label-button-see-more')}
                                        label={Languages.invest.seeMore}
                                        isLoading={isLoading}
                                        spinnerClass={cx('spinner')}
                                        isLowerCase />
                                </Col>
                            }
                        </Row>
                    </div>
                    : (isLoading
                        ? <Spinner className={cx('spinner-loading')} />
                        : <>
                            <NoData description={Languages.invest.noDataInvest} />
                            {offset !== 0 &&
                                <Button
                                    onPress={onInvestNow}
                                    buttonStyle={BUTTON_STYLES.GREEN}
                                    fontSize={20}
                                    width={isMobile ? 80 : 30}
                                    labelStyles={cx('label-button-see-more')}
                                    label={Languages.invest.investNow}
                                    containButtonStyles={cx('btn-invest-now')}
                                    isLowerCase />}
                        </>
                    )
                }
                <Footer />
            </div>
        );
    }, [canLoadMore, fetchHistoryList, investList.length, isLoading, isMobile, offset, onInvestNow, renderInvestList]);

    const onChangeTab = useCallback((tabNumber: number) => {
        if (tabIndex !== tabNumber) {
            setTabIndex(tabNumber);
            pickerAmountRef.current?.clearValue?.();
            fromDateRef.current?.setValue?.('');
            toDateRef.current?.setValue?.('');
            setDataFilter({ optionInvest: `${tabNumber + 1}` }); // investing: '1', history: '2'
        }
    }, [tabIndex]);    

    return (
        <div className={cx('page-container')}>
            <TabsButtonBar dataTabs={TabHistory} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${tabsNumber}`} />
            {(investList.length === 0
                && offset !== 0
                && Object.keys(dataFilter).filter((item: string) => {
                    if (item !== 'optionInvest') {
                        return dataFilter?.[item]?.length > 0;
                    }
                })?.length === 0)
                ? undefined
                : (isMobile ? renderFilterMobile : renderFilterWeb)
            }
            {renderFlatList(investList)}
            {renderPopupSearchPackage()}
            <ScrollTopComponent nameClassScroll={cx('bottom-container')} />
        </div>
    );
});

export default ChildTabsHistory;
