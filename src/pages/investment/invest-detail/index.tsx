import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImgHeader from 'assets/image/img_home_header.jpg';
import styles from './invest-detail.module.scss';
import classNames from 'classnames/bind';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';
import IcWhiteLeftArrow from 'assets/image/ic_white_left_arrow.svg';
import Languages from 'commons/languages';
import { Col, Row } from 'antd';
import { DataColumnHistoryType, DataColumnInvestType, PackageInvest } from 'models/invest';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';
import IcPopupVerify from 'assets/image/ic_popup_verify.svg';

import utils from 'utils/utils';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import { useAppStore } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import useIsMobile from 'hooks/use-is-mobile.hook';
import TableInvest from 'components/table-invest';
import { columnNameHistory, columnNameInvest, dataColumnHistory, dataColumnInvest, dataColumnInvesting } from 'pages/__mocks__/invest';
import PeriodInvestMobile from 'components/period-invest-mobile';
import { TYPE_TAB_HISTORY } from 'commons/constants';

const cx = classNames.bind(styles);

function InvestDetail({ onBackScreen, onNextScreen, investPackage, isDetailHistory, tabDetailHistory }:
    {
        onBackScreen: () => void, onNextScreen?: () => void,
        investPackage?: PackageInvest, isDetailHistory?: boolean, tabDetailHistory?: number
    }) {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const [dataPeriodInvest, setDataPeriodInvest] = useState<DataColumnInvestType[]>([]);
    const [dataDetailHistory, setDataDetailHistory] = useState<DataColumnHistoryType[]>([]);
    const { userManager } = useAppStore();

    const popupAuthRef = useRef<PopupBaseActions>(null);
    const popupAccVerifyRef = useRef<PopupBaseActions>(null);

    useEffect(() => {
        setDataPackage(investPackage);
        setDataPeriodInvest(dataColumnInvest);
        setDataDetailHistory(tabDetailHistory === TYPE_TAB_HISTORY.IS_INVESTING ? dataColumnInvesting : dataColumnHistory);
    }, [investPackage, tabDetailHistory]);

    const onBack = useCallback(() => {
        onBackScreen();
    }, [onBackScreen]);

    const onNextPage = useCallback(() => {
        onNextScreen?.();
    }, [onNextScreen]);

    const renderKeyValue = useCallback((_key?: string, _value?: string) => {
        return (
            <div className={cx('key-value-container')}>
                <span className={cx(isMobile ? 'text-gray h7 regular' : 'text-gray h6 regular')}>{_key}</span>
                <span className={cx(isMobile ? 'text-gray h7 medium' : 'text-gray h6 medium')}>{_value}</span>
            </div>
        );
    }, [isMobile]);

    const handleInvestNow = useCallback(() => {
        // if (userManager?.userInfo) {
        //     popupAccVerifyRef.current?.showModal();
        // } else if (!userManager.userInfo?.tinh_trang) {
        //     popupAuthRef.current?.showModal();
        // } else {
        onNextPage();
        // }
    }, [onNextPage]);

    const renderPopup = useCallback((
        _ref: any, _labelLeft?: string, _labelRight?: string,
        _icon?: any, _title?: string, _describe?: string
    ) => {
        const handleLeftButton = () => {
            if (_title === Languages.invest.noteAuth) {
                navigate(Paths.auth);
            } else {
                // navigate(Paths.register);
            }
        };

        const handleRightButton = () => {
            if (_title === Languages.invest.noteAuth) {
                // 
            } else {
                // 
            }
        };
        return (
            <PopupBaseCenterScreen ref={_ref} labelSuccess={_labelRight} labelCancel={_labelLeft}
                hasTwoButton onClose={handleLeftButton} onSuccessPress={handleRightButton}
                icon={_icon} hasCloseIc title={_title} description={_describe} />
        );
    }, [navigate]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack} className={cx(isMobile ? (isDetailHistory ? 'back-mobile-history' : 'back-mobile') : (isDetailHistory ? 'back-history' : 'back'))}>
                    <img src={isDetailHistory ? IcWhiteLeftArrow : IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('content-container')}>
                    <div className={cx(isMobile ? 'text-banner-mobile-container' : 'text-banner-container')}>
                        <span className={cx(isMobile ? 'h11 text-white medium' : 'invest-tien-ngay-text')}>{Languages.invest.investTienNgay}</span>
                        <span className={cx(isMobile ? 'h6 text-white medium' : 'invest-build-future-text')}>{Languages.invest.buildFuture}</span>
                        <span className={cx(isMobile ? 'describe-mobile-text' : 'describe-text')}>{Languages.invest.describe}</span>
                        <div className={cx('content-invest-container')}>
                            <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                            <span className={cx(isMobile ? 'amount-invest-mobile-text' : 'amount-invest-text')}>{utils.formatMoneyNotSuffixes(dataPackage?.so_tien_dau_tu || '0')}</span>
                            <Row gutter={[24, 0]} className={cx('invest-wrap')}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                                    {renderKeyValue(Languages.invest.contractId, dataPackage?.ma_hop_dong)}
                                    {isDetailHistory && renderKeyValue(Languages.historyDetail.remainingOriginalAmount, utils.formatLoanMoney(dataPackage?.tong_goc_con_lai || '0'))}
                                    {isDetailHistory && renderKeyValue(Languages.historyDetail.receivedOriginalAmount, utils.formatLoanMoney(dataPackage?.tong_goc_da_tra || '0'))}
                                    {renderKeyValue(Languages.invest.investmentTerm, dataPackage?.ki_han_dau_tu)}
                                    {isDetailHistory && renderKeyValue(Languages.historyDetail.dateInvest, dataPackage?.ngay_dau_tu)}
                                    {renderKeyValue(Languages.invest.expectedDueDate, dataPackage?.ngay_dao_han_du_kien)}
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                                    {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatLoanMoney(dataPackage?.tong_lai_nhan_duoc || '0'))}
                                    {renderKeyValue(Languages.invest.monthlyInterestRate, dataPackage?.ti_le_lai_suat_hang_thang)}
                                    {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(dataPackage?.lai_hang_thang || '0'))}
                                    {isDetailHistory && renderKeyValue(Languages.historyDetail.receivedInterest, utils.formatLoanMoney(dataPackage?.tong_lai_da_nhan || '0'))}
                                    {isDetailHistory && renderKeyValue(Languages.historyDetail.remainingInterest, utils.formatLoanMoney(dataPackage?.tong_lai_da_tra || '0'))}
                                    {renderKeyValue(Languages.invest.formInterest, dataPackage?.hinh_thuc_tra_lai)}
                                </Col>
                            </Row>
                            {!isDetailHistory && <div className={cx('invest-now-wrap')}>
                                <div className={cx('invest-now-container')} onClick={handleInvestNow} >
                                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                                </div>
                            </div>}

                        </div>
                        <div className={cx('invest-note-container')}>
                            <span className={cx('invest-note-text')}>{isDetailHistory ? Languages.historyDetail.payInterestInfo : Languages.invest.estimatedPaymentSchedule}</span>
                            {isMobile ?
                                <PeriodInvestMobile dataTableInvest={dataPeriodInvest} dataTableHistory={dataDetailHistory} isDetailHistory={isDetailHistory} /> :
                                <TableInvest dataTableInvest={dataPeriodInvest} dataTableHistory={dataDetailHistory} isDetailHistory={isDetailHistory}
                                    columnName={isDetailHistory ? columnNameHistory : columnNameInvest}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {renderPopup(popupAuthRef, Languages.auth.login, Languages.auth.register, IcPopupAuth, Languages.invest.noteAuth, Languages.invest.describeAuth)}
            {renderPopup(popupAccVerifyRef, Languages.invest.next, Languages.invest.verifyNow, IcPopupVerify, Languages.invest.noteVerify, Languages.invest.describeVerify)}
        </div>
    );
}

export default InvestDetail;
