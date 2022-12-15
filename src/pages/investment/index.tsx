import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import InvestItem from 'components/invest-item';
import PickerComponent from 'components/picker-component/picker-component';
import { ItemProps } from 'models/common';
import { InvestFilter, PackageInvest } from 'models/invest';
import { amountListData, dateListData, investListData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

function Investment() {
    const navigate = useNavigate();
    // const { apiServices } = useAppStore();

    const [investList, setInvestList] = useState<PackageInvest[]>(investListData);
    const [superInvestList, setSuperInvestList] = useState<PackageInvest[]>(investListData);
    const [dateList, setDateList] = useState<ItemProps[]>([]);
    const [amountList, setAmountList] = useState<ItemProps[]>([]);
    const [countInvest, setCountInvest] = useState<number>();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});
    const [showScroll, setShow] = useState<boolean>(false);

    const divRef = useRef<any>(null);

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
    }, []);

    const handleScrollToTop = () => {
        divRef.current.scrollIntoView({ behavior: 'smooth', top: divRef.current.offsetTop });
    };

    const handleScroll = () => {
        setShow(window.pageYOffset > 50);
    };

    const fetchData = useCallback(() => {
        setDateList(dateListData);
        setAmountList(amountListData);
        setCountInvest(23);
    }, []);

    const onLogin = useCallback(async () => {
        navigate('login');
    }, [navigate]);

    const renderDivider = useCallback((_label: string, styleContainer?: any) => {
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

    const renderItemInvest = useCallback((index: number, investAmount: string, interestPayForm: string, interestYear: string, dateInvest: string, expectedProfit: string) => {
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={index}>
                <InvestItem interestPayForm={interestPayForm} onPressInvest={onLogin}
                    interestYear={interestYear} dateInvest={dateInvest}
                    investAmount={utils.formatLoanMoney(investAmount)}
                    expectedProfit={utils.formatLoanMoney(expectedProfit)} />
            </Col>
        );
    }, [onLogin]);

    const renderInvestList = useCallback((_dataList?: any) => {
        return (
            <Row gutter={[24, 44]} className={cx('invest-list-component')}>
                {_dataList?.map((itemInvest: PackageInvest, index: number) => {
                    return renderItemInvest(
                        index,
                        itemInvest?.so_tien_dau_tu,
                        itemInvest?.hinh_thuc_tra_lai,
                        itemInvest?.ti_le_lai_suat_hang_nam,
                        itemInvest.thoi_gian_dau_tu,
                        itemInvest.tong_lai_du_kien);
                })}
            </Row>
        );
    }, [renderItemInvest]);

    console.log('sdhfgd', window.pageYOffset);


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
                    {<div className={cx('top-button')} onClick={handleScrollToTop}>Top</div>}
                </div>
            </div>
        </div>
    );
}

export default Investment;
