import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import HistoryPackage from 'components/history-package';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
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
import { useNavigate } from 'react-router-dom';
import styles from './child-tabs-history.module.scss';

const cx = classNames.bind(styles);

function ChildTabsHistory({ isInvesting }: { isInvesting?: boolean }) {

    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [investList, setInvestList] = useState<PackageInvest[]>(investListData);
    // const [superInvestList, setSuperInvestList] = useState<PackageInvest[]>(investListData);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});

    const [loadMore, setLoadMore] = useState<boolean>(true);

    const divRef = useRef<HTMLDivElement>(null);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);

    const fromDateRef = useRef<TextFieldActions>(null);
    const toDateRef = useRef<TextFieldActions>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('bottom-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const fetchData = useCallback(() => {
        setDateList(dateListData);
        setAmountList(amountListData);
        setCountInvest(8);
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

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            });
        };
        return (
            <Col className={cx('picker-container')} xs={12} sm={12} md={12} lg={12} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, [dataFilter]);

    const renderDate = useCallback((_title: string, _refInput: TextFieldActions | any, _value?: string, _type?: any) => {
        const onChangeInput = (event: any) => {

        };
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                <MyTextInput
                    ref={_refInput}
                    type={TYPE_INPUT.DATE}
                    label={_title}
                    inputStyle={cx('content-item-picker-text')}
                    placeHolder={Languages.common.input}
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

    const renderTopMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{(isInvesting ? Languages.history.havePackage : Languages.history.haveInvested).replace('$count', `${countInvest}`)}</span>
                <div className={cx('right-top-search-component')} >
                    <span onClick={handleOpenPopupSearch} className={cx('text-green h7 regular x10')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                    <span className={cx('text-red h7 regular xl10')}>{Languages.common.filter}</span>
                </div>
            </div>
        );
    }, [countInvest, handleOpenPopupSearch, isInvesting]);

    const renderTopWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('top-search-component')}>
                {!isMobile && <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('top-intro')}>
                    <span className={cx('text-your-chance')}>{(isInvesting ? Languages.history.havePackage : Languages.history.haveInvested).replace('$count', `${countInvest}`)}</span>
                    <span className={cx('text-your-chance-search')}>{Languages.history.searchInvestPackage}</span>
                </Col>}
                {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                <Col xs={12} sm={12} md={12} lg={12} xl={8} >
                    <Row gutter={[16, 16]} className={cx('date-container')}>
                        {renderDate('Tu ngay', fromDateRef)}
                        {renderDate('Den  ngay', toDateRef)}
                    </Row>

                </Col>
            </Row>
        );
    }, [amountList, countInvest, isInvesting, isMobile, renderDate, renderPicker]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            // onNextScreen(dataInvest);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={`${index}${dataInvest.id}`}>
                <HistoryPackage onPressPackage={onNavigateInvestDetail} dataInvest={dataInvest} isInvesting={isInvesting} />
            </Col>
        );
    }, [isInvesting]);

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
            <div className={cx('bottom-container')} >
                {renderInvestList(_list)}
                <Row gutter={[24, 44]} className={cx('button-see-more')} onClick={fetchDataMore}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <Button buttonStyle={BUTTON_STYLES.GREEN} fontSize={20} width={100} label={Languages.invest.seeMore} isLowerCase />
                    </Col>
                </Row>
            </div>
        );
    }, [fetchDataMore, renderInvestList]);

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

export default ChildTabsHistory;
