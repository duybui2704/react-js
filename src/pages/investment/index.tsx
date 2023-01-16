import { Col, Row } from 'antd';
import IcFilter from 'assets/image/ic_green_small_filter.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Footer from 'components/footer';
import InvestItem from 'components/invest-item';
import { PopupBaseActions } from 'components/modal/modal';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { observer } from 'mobx-react';
import { ItemProps } from 'models/common';
import { InvestFilter, PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

const Investment = observer(({ onNextScreen }: { onNextScreen: (data: PackageInvest) => void }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices, userManager } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [investList, setInvestList] = useState<PackageInvest[]>([]);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>(0);
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});
    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

    const [offset, setOffset] = useState<number>(0);

    const divRef = useRef<HTMLDivElement>(null);
    const popupSearchRef = useRef<PopupBaseActions>(null);
    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);

    useEffect(() => {
        fetchSearch();
        fetchInvestList();
        if (!isMobile) {
            popupSearchRef.current?.hideModal();
        }
    }, [isMobile, userManager.userInfo]);

    useEffect(() => {
        fetchInvestList();
    }, [dataFilter]);

    const fetchSearch = useCallback(async () => {
        const amountFilter = await apiServices.invest.getListMoneyInvestment() as any;
        const periodFilter = await apiServices.invest.getListTimeInvestment() as any;

        if (amountFilter.success) {
            const dataAmountFilter = utils.formatObjectFilterInvest(amountFilter?.data as Object);
            setAmountList(dataAmountFilter);
        }

        if (periodFilter.success) {
            const dataPeriodFilter = utils.formatObjectFilterInvest(periodFilter?.data as Object);
            setDateList(dataPeriodFilter);
        }
    }, [apiServices.invest]);

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('bottom-container'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const fetchInvestList = useCallback(async (loadMore?: boolean) => {
        const investmentList = await apiServices.invest.getAllContractInvest(
            dataFilter.dateInvest || '',
            dataFilter.amountInvest || '',
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
    }, [apiServices.invest, dataFilter.dateInvest, dataFilter.amountInvest, offset]);

    const renderDivider = useCallback((_label: string, styleContainer?: string) => {
        return (
            <div className={cx(isMobile ? 'mobile-invest' : (styleContainer || 'invest-package-container'))}>
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
        const handleDataFilter = () => {
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? '' : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? '' : dataFilter.amountInvest
            });
            fetchInvestList();
        };
        return (
            <Col className={cx('picker-container')} xs={isMobile ? 24 : 12} sm={12} md={12} lg={12} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder}
                    onSelectItem={onSelectItem}
                    onClear={handleDataFilter} />
            </Col>
        );
    }, [dataFilter.amountInvest, dataFilter.dateInvest, fetchInvestList, isMobile]);

    const handleOpenPopupSearch = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const handleCancelFilter = useCallback(() => {
    }, []);

    const renderTopMobile = useMemo(() => {
        return (
            <div className={cx('top-search-mobile-component')}>
                <span className={cx('text-your-mobile-chance')}>{Languages.invest.yourChance.replace('$count', `${countInvest}`)}</span>
                <div className={cx('right-top-search-component')} >
                    <span onClick={handleOpenPopupSearch} className={cx('text-green h7 x10')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                    <span className={cx('text-red h7 xl10')}>{Languages.common.filter}</span>
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
            onNextScreen(dataInvest);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={`${index}${dataInvest.id}`}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, [onNextScreen]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <div className={cx(isMobile ? 'content-mobile-container' : 'content-web-container')} >
                <Row gutter={isMobile ? [24, 36] : [24, 44]}>
                    {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                        return renderItemInvest(index, itemInvest);
                    })}
                </Row>
            </div>

        );
    }, [isMobile, renderItemInvest]);

    const onClosePopup = useCallback(() => {
        pickerAmountRef.current?.clearValue?.();
        pickerDateRef.current?.clearValue?.();
        setDataFilter({});
    }, []);

    const onSuccessPopup = useCallback(() => {
        // fetchInvestList;
    }, []);

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
        const loadMore = () => {
            fetchInvestList(true);
        };
        return (
            <div className={cx('bottom-container')} >
                {renderDivider(Languages.invest.investPackage, cx('super-invest-package-container'))}
                {renderInvestList(_list)}

                <Row gutter={[24, 44]} className={cx(isMobile ? 'button-see-more-mobile' : 'button-see-more')} >
                    {canLoadMore &&
                        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Button buttonStyle={BUTTON_STYLES.GREEN} fontSize={20} width={100} label={Languages.invest.seeMore} isLowerCase onPress={loadMore} />
                        </Col>
                    }
                </Row>
                <Footer />
            </div>
        );
    }, [renderDivider, renderInvestList, isMobile, canLoadMore, fetchInvestList]);

    return (
        <div className={cx('page-container')}>
            {isMobile && renderTopMobile}
            <div className={cx('page-wrap')} ref={divRef} >
                {!isMobile && renderTopWeb}
                <div className={cx('page-content')} >
                    {renderFlatList(investList)}
                    <div className={cx(scrollTop < 250 ? 'top-button-hide' : isMobile ? 'top-button-mobile' : 'top-button')} onClick={handleScrollToTop}>Top</div>
                </div>
            </div>
            {renderPopupSearchPackage()}
        </div>
    );
});

export default Investment;
