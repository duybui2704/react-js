import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import InvestItem from 'components/invest-item';
import PickerComponent from 'components/picker-component/picker-component';
import { useAppStore } from 'hooks';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { ItemProps } from 'models/common';
import { InvestFilter, PackageInvest } from 'models/invest';
import { amountListData, dateListData, investListData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

function Investment({ onNavigateDetail }: { onNavigateDetail: (data: PackageInvest) => void }) {
    const navigate = useNavigate();
    
    const { apiServices } = useAppStore();

    const [investList, setInvestList] = useState<PackageInvest[]>(investListData);
    const [superInvestList, setSuperInvestList] = useState<PackageInvest[]>(investListData);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});

    const divRef = useRef<any>(null);
    const { scrollTop } = useWindowScrollPositions(cx('page-container'));

    useEffect(() => {
        fetchData();
    }, []);

    const handleScrollToTop = () => {
        divRef.current.scrollIntoView({ behavior: 'smooth', top: 0 });
    };

    const fetchData = useCallback(() => {
        setDateList(dateListData);
        setAmountList(amountListData);
        setCountInvest(23);
    }, []);

    const renderDivider = useCallback((_label: string, styleContainer?: string) => {
        return (
            <div className={cx(styleContainer || 'invest-package-container')}>
                <span className={cx('invest-package-text')}>{_label}</span>
                <div className={cx('invest-package-bar')} />
            </div>
        );
    }, []);

    const renderPicker = useCallback((_title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            });
        };
        return (
            <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={8} >
                <PickerComponent data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, [dataFilter]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
            onNavigateDetail(dataInvest);
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={index}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, [onNavigateDetail]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={[24, 44]} className={cx('invest-list-component')}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(index, itemInvest);
                })}
            </Row>
        );
    }, [renderItemInvest]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('page-wrap')}>
                <div className={cx('content-container')} ref={divRef}>
                    <Row gutter={[24, 16]} className={cx('top-search-component')}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('top-intro')}>
                            <span className={cx('text-your-chance')}>{Languages.invest.yourChance.replace('$count', `${countInvest}`)}</span>
                            <span className={cx('text-your-chance-search')}>{Languages.invest.yourChanceSearch}</span>
                        </Col>
                        {renderPicker(Languages.invest.investAmount, Languages.invest.investAmountChoose, amountList)}
                        {renderPicker(Languages.invest.dateInvest, Languages.invest.dateInvestChoose, dateList)}
                    </Row>
                    {renderDivider(Languages.invest.investPackage)}
                    {renderInvestList(investList)}
                    {renderDivider(Languages.invest.superInvestPackage, cx('super-invest-package-container'))}
                    {renderInvestList(superInvestList)}
                    <div className={cx(scrollTop < 300 ? 'top-button-hide' : 'top-button')} onClick={handleScrollToTop}>Top</div>
                </div>
            </div>
        </div>
    );
}

export default Investment;
