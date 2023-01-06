import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { BUTTON_STYLES } from 'components/button/types';
import ColumnChart from 'components/column-chart';
import Footer from 'components/footer';
import ItemReport from 'components/item-report';
import { PopupBaseActions } from 'components/modal/modal';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import PopupBaseMobile from 'components/popup-base-mobile';
import SearchBar from 'components/search-bar';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { ItemProps } from 'models/common';
import { OverviewMonthOfQuarterModel, OverviewQuarterReportModel, OverviewReportModel } from 'models/report';
import { QuarterListData, ReportOverviewData, ReportQuarterOverViewData, YearListData } from 'pages/__mocks__/report';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dateUtils from 'utils/date-utils';
import utils from 'utils/utils';
import styles from './report.module.scss';

const cx = classNames.bind(styles);
interface ReportFilter {
    quarterSearch?: string;
    yearSearch?: string;
}

function Report() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();

    const [quarterList, setQuarterList] = useState<ItemProps[]>([]);
    const [yearList, setYearList] = useState<ItemProps[]>([]);
    const [dataFilter, setDataFilter] = useState<ReportFilter>({ quarterSearch: `${dateUtils.getQuarter(new Date())}`, yearSearch: `${dateUtils.getYear(new Date())}` });

    const [reportQuarterList, setReportQuarterList] = useState<OverviewQuarterReportModel>(ReportQuarterOverViewData);
    const [reportOverviewData, setReportOverviewData] = useState<OverviewReportModel>(ReportOverviewData);

    const pickerQuarterRef = useRef<PickerAction>(null);
    const pickerYearRef = useRef<PickerAction>(null);
    const popupSearchRef = useRef<PopupBaseActions>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(() => {
        setQuarterList(QuarterListData);
        setYearList(YearListData);
    }, []);

    const renderKeyValue = useCallback((_key?: string, _value?: string, noBorder?: boolean) => {
        return (
            <div className={cx(noBorder ? 'no-border-key-value-container' : 'key-value-container')}>
                <span className={cx('text-gray h6')}>{_key}</span>
                <span className={cx('text-gray h6 medium')}>{_value}</span>
            </div>
        );
    }, []);

    const renderPicker = useCallback((_ref: any, _title: string, _data: ItemProps[], _defaultValue?: string) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                quarterSearch: _title === Languages.report.quarter ? item : dataFilter.quarterSearch,
                yearSearch: _title === Languages.report.year ? item : dataFilter.yearSearch
            });
        };
        return (
            <PickerComponent ref={_ref} data={_data} onSelectItem={onSelectItem} defaultValue={_defaultValue} allowClear={true} />
        );
    }, [dataFilter]);

    const renderSearchWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('row-content')}>
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <span className={cx('report-text')}>{`${Languages.report.reportQuarter}${dataFilter.quarterSearch}${' - '}${dataFilter.yearSearch}`}</span>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} >
                    {renderPicker(pickerQuarterRef, Languages.report.quarter, quarterList, dataFilter.quarterSearch)}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} >
                    {renderPicker(pickerYearRef, Languages.report.year, yearList, dataFilter.yearSearch)}
                </Col>
            </Row>
        );
    }, [dataFilter.quarterSearch, dataFilter.yearSearch, renderPicker, quarterList, yearList]);

    const handleFilter = useCallback(() => {
        popupSearchRef.current?.showModal();
    }, []);

    const handleCancelFilter = useCallback(() => {
        setDataFilter({ quarterSearch: `${dateUtils.getQuarter(new Date())}`, yearSearch: `${dateUtils.getYear(new Date())}` });
    }, []);

    const renderSearchMobile = useMemo(() => {
        return (
            <SearchBar title={`${Languages.report.reportQuarter}${dataFilter.quarterSearch}${' - '}${dataFilter.yearSearch}`} onSearch={handleFilter} onCancel={handleCancelFilter} />
        );
    }, [dataFilter.quarterSearch, dataFilter.yearSearch, handleCancelFilter, handleFilter]);

    const onSuccessPopup = useCallback(() => {
        fetchData();
    }, [fetchData]);

    const renderPopupContentFilter = useMemo(() => {
        return (
            <div className={cx('content-popup-mobile')}>
                {renderPicker(pickerQuarterRef, Languages.report.quarter, quarterList, dataFilter.quarterSearch)}
                {renderPicker(pickerYearRef, Languages.report.year, yearList, dataFilter.yearSearch)}
            </div>
        );
    }, [dataFilter.quarterSearch, dataFilter.yearSearch, quarterList, renderPicker, yearList]);

    const renderPopupSearchPackage = useCallback(() => {
        return (
            <PopupBaseMobile ref={popupSearchRef} hasCloseIc
                customerContent={renderPopupContentFilter} hasTwoButton
                labelCancel={Languages.invest.cancel} labelSuccess={Languages.common.search}
                titleHeader={Languages.common.search} buttonLeftStyle={BUTTON_STYLES.GRAY}
                onClose={handleCancelFilter} onSuccessPress={onSuccessPopup}
            />
        );
    }, [handleCancelFilter, onSuccessPopup, renderPopupContentFilter]);

    const renderItemMonthReport = useCallback((_dataItemMonth?: OverviewMonthOfQuarterModel, _title?: string) => {
        return (
            <ItemReport dataMonthReport={_dataItemMonth} title={_title} isMobile={isMobile} />
        );
    }, [isMobile]);

    const renderChart = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                <div className={cx('chart-container')}>
                    <span className={cx('chart-title-text')}>{Languages.report.financialChart}</span>
                    <ColumnChart dataChart={reportQuarterList.data} isMobile={isMobile} />
                </div>
            </Col>
        );
    }, [isMobile, reportQuarterList.data]);

    const renderChartReport = useMemo(() => {
        return (
            <Row gutter={[24, 24]} >
                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                    <ItemReport dataQuarterReport={reportQuarterList.total} title={`${Languages.report.quarterlyOverview}${dataFilter.quarterSearch}`} isOverviewQuarter isMobile={isMobile} />
                </Col>
                {renderChart}
            </Row>
        );
    }, [dataFilter.quarterSearch, isMobile, renderChart, reportQuarterList.total]);

    const renderViewDetailMonth = useCallback((_dataList?: any) => {
        return (
            <Row gutter={[24, 24]} >
                {_dataList?.map((_itemDetail: any, _index: number) => {
                    return (
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className={cx('col')} key={_index}>
                            {renderItemMonthReport(_itemDetail)}
                        </Col>
                    );
                })}
            </Row>
        );
    }, [renderItemMonthReport]);

    return (
        <div className={cx('page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                <Row gutter={[24, 0]} className={cx(isMobile ? 'row-content-mobile' : 'row-content')}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <span className={cx(isMobile ? 'overview-invest-text-mobile' : 'overview-invest-text')}>{Languages.report.overviewInvest}</span>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        {renderKeyValue(Languages.report.totalInvestment, utils.formatLoanMoney(`${reportOverviewData.tong_von_dau_tu}` || '0'))}
                        {renderKeyValue(Languages.report.totalCapitalReceived, utils.formatLoanMoney(`${reportOverviewData.tong_von_da_nhan}` || '0'))}
                        {renderKeyValue(Languages.report.totalRemainingCapital, utils.formatLoanMoney(`${reportOverviewData.tong_von_con_lai}` || '0'))}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                        {renderKeyValue(Languages.report.totalInterest, utils.formatLoanMoney(`${reportOverviewData.tong_lai}` || '0'))}
                        {renderKeyValue(Languages.report.totalProfitReceived, utils.formatLoanMoney(`${reportOverviewData.tong_lai_da_nhan}` || '0'))}
                        {renderKeyValue(Languages.report.totalProfitRemaining, utils.formatLoanMoney(`${reportOverviewData.tong_lai_con_lai}` || '0'), isMobile)}
                    </Col>
                </Row>
                {isMobile ? renderSearchMobile : renderSearchWeb}
                <div className={cx(isMobile ? 'chart-content-mobile' : 'chart-content')}>
                    {renderChartReport}
                    {renderViewDetailMonth(reportQuarterList.data)}
                </div>
            </div>
            {renderPopupSearchPackage()}
            <Footer/>
        </div>
    );
}

export default Report;
