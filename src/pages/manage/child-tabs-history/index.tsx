import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { STATUS_CONTRACT, TYPE_INPUT, TYPE_TAB_HISTORY } from 'commons/constants';
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
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { ItemProps } from 'models/common';
import { PackageInvest } from 'models/invest';
import { observer } from 'mobx-react';
import { amountListData, investListData, investListMoreData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import styles from './child-tabs-history.module.scss';

const cx = classNames.bind(styles);
interface HistoryFilter {
    amountInvest?: string;
    fromDate?: string;
    toDate?: string;
}

const ChildTabsHistory = observer(({ onNextScreen, tabsNumber }:
    { onNextScreen: (data: PackageInvest, tabs: number) => void, tabsNumber: number }
) => {

    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices, userManager } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [tabName, setTabName] = useState<number>(tabsNumber);

    const [investList, setInvestList] = useState<PackageInvest[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>(0);
    const [dataFilter, setDataFilter] = useState<HistoryFilter>({});

    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);

    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);
    
    
    useEffect(() => {
        fetchSearch();
    }, []);


    useEffect(() => {
        fetchInvestList();
    }, [isMobile, userManager.userInfo, tabName]);


    const fetchSearch = useCallback(async () => {
        const amountFilter = await apiServices.invest.getListMoneyInvestment() as any;
        if (amountFilter.success) {
            const dataAmountFilter = utils.formatObjectFilterInvest(amountFilter?.data as Object);
            setAmountList(dataAmountFilter);
        }
    }, [apiServices.invest]);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('bottom-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const fetchInvestList = useCallback(async (loadMore?: boolean) => {
        const investmentList = await apiServices.invest.getListContractInvesting(
            tabName === TYPE_TAB_HISTORY.IS_INVESTING ? STATUS_CONTRACT.EFFECT : STATUS_CONTRACT.EXPIRE,
            '',
            '',
            '',
            '',
            loadMore ? offset : 0,
            PAGE_SIZE_INVEST) as any;
        if (investmentList.success) {
            setCountInvest(5);
            setOffset(last => last + PAGE_SIZE_INVEST);
            setCanLoadMore(investmentList?.data?.length === PAGE_SIZE_INVEST);
            if (loadMore) {
                setInvestList(last => [...last, ...investmentList.data]);
            } else {
                setInvestList(investmentList?.data);
            }
        }
    }, [apiServices.invest, offset, tabName]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                ...dataFilter,
                amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            });
        };
        return (
            <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
        );
    }, [dataFilter]);

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

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const renderFilterMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{(tabName === TYPE_TAB_HISTORY.IS_INVESTING ? Languages.history.havePackage : Languages.history.haveInvested).replace('$count', `${countInvest}`)}</span>
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
                    <span className={cx('text-your-chance')}>{(tabName === TYPE_TAB_HISTORY.IS_INVESTING ? Languages.history.havePackage : Languages.history.haveInvested).replace('$count', `${countInvest}`)}</span>
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
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
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
                        {renderDate(Languages.history.toDate, toDateRef, dataFilter.toDate || '')}
                    </Row>
                </Col>
            </Row>
        );
    }, [amountList, dataFilter.fromDate, dataFilter.toDate, renderDate, renderPicker]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNextScreen(dataInvest, tabName);
            console.log('tabName==', tabName);

        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('col-history')} key={`${index}${dataInvest.id}`}>
                <HistoryPackage onPressPackage={onNavigateInvestDetail} dataInvest={dataInvest} isInvesting={tabName === TYPE_TAB_HISTORY.IS_INVESTING} />
            </Col>
        );
    }, [onNextScreen, tabName]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={isMobile ? [24, 16] : [24, 24]}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(index, itemInvest);
                })}
            </Row>
        );
    }, [isMobile, renderItemInvest]);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        setDataFilter({});
    }, []);

    const onSuccessPopup = useCallback(() => {
        fetchInvestList();
    }, [fetchInvestList]);

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
            fetchInvestList(true);
        };
        return (
            <div className={cx('bottom-container')} >
                <div className={cx(isMobile ? 'flat-list-mobile' : 'flat-list')}>
                    {renderInvestList(_list)}
                    <Row gutter={[24, 0]} onClick={loadMore} className={cx('button-see-more')}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button buttonStyle={BUTTON_STYLES.GREEN} fontSize={20} width={100} label={Languages.invest.seeMore} isLowerCase />
                        </Col>
                    </Row>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        );
    }, [fetchInvestList, isMobile, renderInvestList]);

    const onChangeTab = useCallback((tabNumber: number) => {
        if (tabName !== tabNumber) {
            setTabName(tabNumber);
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
                    <div className={cx(scrollTop < 250 ? 'top-button-hide' : isMobile ? 'top-button-mobile' : 'top-button')} onClick={handleScrollToTop}>Top</div>
                </div>
            </div>
            {renderPopupSearchPackage()}
        </div>
    );
});

export default ChildTabsHistory;
