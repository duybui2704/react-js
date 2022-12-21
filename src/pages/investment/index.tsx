import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { BUTTON_STYLES } from 'components/button/types';
import InvestItem from 'components/invest-item';
import { Loading } from 'components/loading';
import { PopupBaseActions } from 'components/modal/modal';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { ItemProps } from 'models/common';
import { InvestFilter, PackageInvest } from 'models/invest';
import { amountListData, dateListData, investListData, investListMoreData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

function Investment({ onNavigateDetail }: { onNavigateDetail: (data: PackageInvest) => void }) {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [investList, setInvestList] = useState<PackageInvest[]>(investListData);
    const [superInvestList, setSuperInvestList] = useState<PackageInvest[]>(investListData);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});

    const [loadMore, setLoadMore] = useState<boolean>(true);

    const divRef = useRef<HTMLDivElement>(null);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);

    useEffect(() => {
        fetchData();
        if (!isMobile) {
            popupSearchRef.current?.hideModal();
        }
    }, [isMobile]);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('bottom-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const fetchData = useCallback(() => {
        setDateList(dateListData);
        setAmountList(amountListData);
        setCountInvest(23);
    }, []);

    const fetchDataMore = useCallback(() => {
        setDateList(dateListData);
        setAmountList(amountListData);

        setTimeout(() => {
            if (investList.length > 10) {
                setLoadMore(false);
            } else {
                setInvestList(last => [...last, ...investListMoreData]);
                console.log('fetch more');
            }
        }, 1500);
    }, [investList.length]);

    const renderDivider = useCallback((_label: string, styleContainer?: string) => {
        return (
            <div className={cx(styleContainer || 'invest-package-container')}>
                <span className={cx(isMobile ? 'invest-package-mobile-text' : 'invest-package-text')}>{_label}</span>
                <div className={cx('invest-package-bar')} />
            </div>
        );
    }, [isMobile]);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            });
        };
        return (
            <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, [dataFilter]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const renderTopMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{Languages.invest.yourChance.replace('$count', `${countInvest}`)}</span>
                <div className={cx('right-top-search-component')} >
                    <span onClick={handleOpenPopupSearch} className={cx('text-green h7 regular x10')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                    <span className={cx('text-red h7 regular xl10')}>{Languages.common.filter}</span>
                </div>
            </div>
        );
    }, [countInvest, handleOpenPopupSearch]);

    const renderTopWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {!isMobile && <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('top-intro')}>
                    <span className={cx('text-your-chance')}>{Languages.invest.yourChance.replace('$count', `${countInvest}`)}</span>
                    <span className={cx('text-your-chance-search')}>{Languages.invest.yourChanceSearch}</span>
                </Col>}
                {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                {renderPicker(pickerDateRef, Languages.invest.dateInvest, Languages.invest.dateInvestChoose, dateList)}
            </Row>
        );
    }, [amountList, countInvest, dateList, isMobile, renderPicker]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNavigateDetail(dataInvest);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={`${index}${dataInvest.id}`}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, [onNavigateDetail]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={isMobile ? [24, 36] : [24, 44]} className={cx('invest-list-component')}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(index, itemInvest);
                })}
            </Row>
        );
    }, [isMobile, renderItemInvest]);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        pickerDateRef.current?.clearValue?.();
        setDataFilter({});
    }, []);

    const onSuccessPopup = useCallback(() => {
        fetchData();
    }, [fetchData]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef} hasCloseIc
                customerContent={renderTopWeb} hasTwoButton
                labelCancel={Languages.invest.cancel} labelSuccess={Languages.common.search}
                titleHeader={Languages.invest.searchInvestPackage} buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={onClosePopup} onSuccessPress={onSuccessPopup}
            />
        );
    }, [onClosePopup, onSuccessPopup, renderTopWeb]);

    const renderFlatList = useCallback((_list: PackageInvest[]) => {
        return (
            <div id='scrollableDivPackage' className={cx('bottom-container')} >
                <InfiniteScroll
                    dataLength={investList.length}
                    next={fetchDataMore}
                    hasMore={loadMore}
                    loader={<Loading />}
                    pullDownToRefreshThreshold={50}
                    scrollableTarget={'scrollableDivPackage'}
                    className={cx('bottom')}

                >
                    {renderDivider(Languages.invest.superInvestPackage)}
                    {renderInvestList(superInvestList)}

                    {renderDivider(Languages.invest.investPackage, cx('super-invest-package-container'))}
                    {renderInvestList(_list)}
                </InfiniteScroll>
            </div>
        );
    }, [fetchDataMore, investList.length, loadMore, renderDivider, renderInvestList, superInvestList]);

    return (
        <div className={cx('page-container')}>
            {isMobile && renderTopMobile}
            <div className={cx('page-wrap')} ref={divRef} >
                {!isMobile && renderTopWeb}
                <div className={cx(isMobile ? 'content-mobile-container' : 'content-web-container')} >
                    {renderFlatList(investList)}
                    <div className={cx(scrollTop < 250 ? 'top-button-hide' : isMobile ? 'top-button-mobile' : 'top-button')} onClick={handleScrollToTop}>Top</div>
                </div>
            </div>

            {renderPopupSearchPackage()}
        </div>
    );
}

export default Investment;
