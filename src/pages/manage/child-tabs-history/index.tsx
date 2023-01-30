import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { TYPE_INPUT, TYPE_TAB_HISTORY } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import HistoryPackage from 'components/history-package';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { PopupBaseActions } from 'components/modal/modal';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import ScrollTopComponent from 'components/scroll-top';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
import { PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import styles from './child-tabs-history.module.scss';

const cx = classNames.bind(styles);
interface HistoryFilter {
    optionInvest?: string;
    amountInvest?: string;
    fromDate?: string;
    toDate?: string;
}

const ChildTabsHistory = observer(({ onNextScreen, tabsNumber }: {
    onNextScreen: (data: PackageInvest, tabs: number) => void,
    tabsNumber: number
}) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [tabName, setTabName] = useState<number>(tabsNumber);

    const [investList, setInvestList] = useState<PackageInvest[]>([]);
    const [countInvest, setCountInvest] = useState<number>(0);

    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({
        optionInvest: `${tabsNumber + 1}` || '1', // tabsNumber===( 0: investing, 1: đã đáo hạn)
        amountInvest: '',
        fromDate: '',
        toDate: ''
    });
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);

    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);

    useEffect(() => {
        fetchDataSearch();
    }, []);

    useEffect(() => {
        fetchHistoryList();
    }, [dataFilter]);

    const fetchHistoryList = useCallback(async (loadMore?: boolean) => {
        const investmentList = await apiServices.invest.getListContractInvesting(
            dataFilter.optionInvest || '1',
            '',
            dataFilter.amountInvest || '',
            dataFilter.fromDate || '',
            dataFilter.toDate || '',
            loadMore ? offset : 0,
            PAGE_SIZE_INVEST) as any;

        if (investmentList.success) {
            setCountInvest(investmentList?.total || 0);
            setCanLoadMore(investmentList?.data?.length === PAGE_SIZE_INVEST);
            setOffset(last => !loadMore ? PAGE_SIZE_INVEST : last + PAGE_SIZE_INVEST);
            if (loadMore) {
                setInvestList(last => [...last, ...investmentList.data]);
            } else {
                setInvestList(investmentList?.data);
            }
        }
    }, [apiServices.invest, dataFilter, offset]);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('bottom-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const fetchDataSearch = useCallback(async () => {
        const amountFilter = await apiServices.invest.getListMoneyInvestment() as any;
        if (amountFilter.success) {
            const dataAmountFilter = utils.formatObjectFilterInvest(amountFilter?.data as Object);
            setAmountList(dataAmountFilter);
        }
    }, [apiServices.invest]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: string) => {
            if (item && !isMobile) {
                setOffset(0);
                setDataFilter({
                    ...dataFilter,
                    amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
                });
            }
        };
        const handleClearDataFilter = () => {
            setOffset(0);
            setDataFilter({
                ...dataFilter,
                amountInvest: _title === Languages.invest.investAmount ? '' : dataFilter.amountInvest
            });
        };
        return (
            <PickerComponent ref={_ref}
                data={_data}
                title={_title}
                placeholder={_placeholder}
                onSelectItem={onSelectItem}
                allowClear={isMobile ? true : false}
                onClear={handleClearDataFilter} />
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

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>
                    {(tabName === TYPE_TAB_HISTORY.IS_INVESTING
                        ? Languages.history.havePackage
                        : Languages.history.haveInvested)
                        .replace('$count', `${countInvest}`)}
                </span>
                <div className={cx('right-top-search-component')} onClick={handleOpenPopupSearch}>
                    <span className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                </div>
            </div>
        );
    }, [countInvest, handleOpenPopupSearch, tabName]);

    const renderFilterWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {!isMobile && <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('top-intro')}>
                    <span className={cx('text-your-chance')}>
                        {(tabName === TYPE_TAB_HISTORY.IS_INVESTING
                            ? Languages.history.havePackage
                            : Languages.history.haveInvested)
                            .replace('$count', `${countInvest}`)}
                    </span>
                    <span className={cx('text-your-chance-search')}>{Languages.history.searchInvestPackage}</span>
                </Col>}
                <Col className={cx('picker-container')} xs={12} sm={12} md={12} lg={12} xl={8} >
                    {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8}>
                    <Row gutter={[16, 4]}>
                        <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                            <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                        </Col>
                        {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '', dataFilter.fromDate)}
                    </Row>
                </Col>
            </Row>
        );
    }, [amountList, countInvest, dataFilter.fromDate, dataFilter.toDate, isMobile, renderDate, renderPicker, tabName]);

    const renderContentPopup = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                <Col className={cx('picker-container')} xs={24} sm={24} md={24} >
                    {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                    <Row gutter={[16, 4]}>
                        <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={24} >
                            <span className={cx('text-black h6')}>{Languages.invest.dateInvest}</span>
                        </Col>
                        {renderDate(Languages.history.fromDate, fromDateRef, dataFilter.fromDate || '',)}
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '', dataFilter.fromDate)}
                    </Row>
                </Col>
            </Row>
        );
    }, [amountList, dataFilter.fromDate, dataFilter.toDate, renderDate, renderPicker]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNextScreen(dataInvest, tabName);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('col-history')} key={`${index}${dataInvest.id}`}>
                <HistoryPackage onPressPackage={onNavigateInvestDetail} dataInvest={dataInvest} isInvesting={tabName === TYPE_TAB_HISTORY.IS_INVESTING} />
            </Col>
        );
    }, [onNextScreen, tabName]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={isMobile ? [24, 16] : [24, 24]} className={cx('min-height-list')}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(index, itemInvest);
                })}
            </Row>
        );
    }, [isMobile, renderItemInvest]);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        fromDateRef.current?.setValue?.('');
        toDateRef.current?.setValue?.('');
        setDataFilter({});
        setOffset(0);
    }, []);

    const onSuccessPopup = useCallback(() => {
        setOffset(0);
        setDataFilter({
            ...dataFilter,
            amountInvest: `${pickerAmountRef.current?.getValue()}`,
            fromDate: fromDateRef.current?.getValue(),
            toDate: toDateRef.current?.getValue()
        });
    }, [dataFilter]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef} hasCloseIc
                customerContent={renderContentPopup} hasTwoButton
                labelCancel={Languages.invest.cancel} labelSuccess={Languages.common.search}
                titleHeader={Languages.history.searchProjectInvest} buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup} onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderContentPopup]);

    const renderFlatList = useCallback((_list: PackageInvest[]) => {
        const loadMore = () => {
            fetchHistoryList(true);
        };
        return (
            <div className={cx('bottom-container')} >
                <div className={cx(isMobile ? 'flat-list-mobile' : 'flat-list')}>
                    {renderInvestList(_list)}
                    <Row gutter={[24, 0]} onClick={loadMore} className={cx('button-see-more')}>
                        {canLoadMore && <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button buttonStyle={BUTTON_STYLES.GREEN} fontSize={20} width={100} label={Languages.invest.seeMore} isLowerCase />
                        </Col>}
                    </Row>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        );
    }, [canLoadMore, fetchHistoryList, isMobile, renderInvestList]);

    const onChangeTab = useCallback((tabNumber: number) => {
        if (tabName !== tabNumber) {
            setTabName(tabNumber);
            pickerAmountRef.current?.clearValue?.();
            fromDateRef.current?.setValue?.('');
            toDateRef.current?.setValue?.('');
            setDataFilter({ optionInvest: `${tabNumber + 1}` }); // investing: '1', history: '2'
        }
    }, [tabName]);

    return (
        <div className={cx('page-container')}>
            <TabsButtonBar dataTabs={Languages.historyTabs} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${tabsNumber}`} />
            {isMobile && renderFilterMobile}
            <div className={cx(isMobile ? 'page-wrap-mobile' : 'page-wrap')}>
                {!isMobile && renderFilterWeb}
                <div className={cx(isMobile ? 'content-mobile-container' : 'content-web-container')} >
                    {renderFlatList(investList)}
                    <ScrollTopComponent scrollTopHeight={scrollTop} isMobile={isMobile} onScrollTop={handleScrollToTop} />
                </div>
            </div>
            {renderPopupSearchPackage()}
        </div>
    );
});

export default ChildTabsHistory;
