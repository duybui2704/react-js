import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImgHeader from 'assets/image/img_home_header.jpg';
import styles from './invest-package-verify.module.scss';
import classNames from 'classnames/bind';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';
import Languages from 'commons/languages';
import { Col, Row } from 'antd';
import { PackageInvest } from 'models/invest';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';
import IcPopupVerify from 'assets/image/ic_popup_verify.svg';

import IcBank from 'assets/image/ic_green_bank.svg';

import IcNganLuong from 'assets/image/ic_ngan_luong.svg';


import utils from 'utils/utils';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import { useAppStore } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import useIsMobile from 'hooks/use-is-mobile.hook';
import CheckBox from 'components/check-box';

const cx = classNames.bind(styles);

function InvestPackageVerify({ onBackDetail, onNextScreen, investPackage }: { onBackDetail: () => void, onNextScreen: () => void, investPackage?: PackageInvest }) {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const { userManager } = useAppStore();

    const popupAuthRef = useRef<PopupBaseActions>(null);
    const popupAccVerifyRef = useRef<PopupBaseActions>(null);

    useEffect(() => {
        setDataPackage(investPackage);
    }, [investPackage]);

    const onBack = useCallback(() => {
        onBackDetail();
    }, [onBackDetail]);

    const renderKeyValue = useCallback((_key?: string, _value?: string, hasBorder?: boolean, _redValue?: boolean) => {
        return (
            <div className={cx(hasBorder ? 'key-value-no-border-container' : 'key-value-container')}>
                <span className={cx(isMobile ? 'text-gray h7 regular' : 'text-gray h6 regular')}>{_key}</span>
                <span className={_redValue ?
                    cx(isMobile ? 'text-red h7 medium' : 'text-red h6 medium') :
                    cx(isMobile ? 'text-gray h7 medium' : 'text-gray h6 medium')}>
                    {_value}
                </span>
            </div>
        );
    }, [isMobile]);

    const handleInvestNow = useCallback(() => {
        if (userManager?.userInfo) {
            popupAccVerifyRef.current?.showModal();
        } else if (!userManager.userInfo?.tinh_trang) {
            popupAuthRef.current?.showModal();
        } else {
            //invest now action
        }
    }, [userManager.userInfo]);

    const renderPopup = useCallback((
        _ref: any, _labelLeft?: string, _labelRight?: string,
        _icon?: any, _title?: string, _describe?: string
    ) => {
        const handleLeftButton = () => {
            if (_title === Languages.invest.noteAuth) {
                navigate(Paths.login);
            } else {
                navigate(Paths.register);
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

    const renderItemInvestMethod = useCallback((icon?: any, label?: string) => {
        return (
            <div className={cx('item-method-container')}>
                <div className={cx('item-method-left-container')}>
                    <img src={icon || IcBank} />
                    <span className={cx('item-method-text')}>{label || Languages.invest.bankAcc}</span>
                </div>
                <img src={IcLeftArrow} />
            </div>
        );
    }, []);

    const renderInvestMethod = useCallback(() => {
        return (
            <div className={cx('invest-method-container')}>
                <span className={cx(isMobile ? 'invest-method-text-mobile' : 'invest-method-text')}>{Languages.invest.investMethod}</span>
                <Row gutter={[24, 8]} className={cx('invest-wrap')}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                        {renderItemInvestMethod()}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                        {renderItemInvestMethod()}
                    </Col>
                </Row>
                <CheckBox title={Languages.invest.agreePolicy} onChangeText={() => { }} groupCheckBoxContainer={cx(isMobile ? 'group-check-box-container-mobile' : 'group-check-box-container')} />
            </div>

        );
    }, [isMobile, renderItemInvestMethod]);

    const renderButtonInvestNow = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'invest-now-wrap-mobile' : 'invest-now-wrap')}>
                <div className={cx(isMobile ? 'invest-now-container-mobile' : 'invest-now-container')} onClick={handleInvestNow} >
                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                </div>
            </div>
        );
    }, [handleInvestNow, isMobile]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack} className={cx(isMobile ? 'back-mobile' : 'back')}>
                    <img src={IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('content-container')}>
                    <div className={cx(isMobile ? 'text-banner-mobile-container' : 'text-banner-container')}>
                        <span className={cx(isMobile ? 'h11 text-white medium' : 'invest-tien-ngay-text')}>{Languages.invest.investTienNgay}</span>
                        <span className={cx(isMobile ? 'h6 text-white medium' : 'invest-build-future-text')}>{Languages.invest.buildFuture}</span>
                        <span className={cx(isMobile ? 'describe-mobile-text' : 'describe-text')}>{Languages.invest.describe}</span>
                        <div className={cx('content-invest-container')}>
                            <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                            <span className={cx(isMobile ? 'amount-invest-mobile-text' : 'amount-invest-text')}>{utils.formatLoanMoney(dataPackage?.so_tien_dau_tu || '0').replace(' vnđ', '')}</span>
                            <Row gutter={[24, 0]} className={cx('invest-wrap')}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    {renderKeyValue(Languages.invest.contractId, dataPackage?.ma_hop_dong)}
                                    {renderKeyValue(Languages.invest.investmentTerm, dataPackage?.ki_han_dau_tu)}
                                    {renderKeyValue(Languages.invest.expectedDueDate, dataPackage?.ngay_dao_han_du_kien)}
                                    {renderKeyValue(Languages.invest.amountDemandedForInvestment, utils.formatLoanMoney(dataPackage?.so_tien_dau_tu || '0').replace(' vnđ', ''),false, true)}
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatMoneyNotSuffixes(dataPackage?.tong_lai_nhan_duoc))}
                                    {renderKeyValue(Languages.invest.monthlyInterestRate, dataPackage?.ti_le_lai_suat_hang_thang)}
                                    {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(dataPackage?.lai_hang_thang || '0').replaceAll(',', '.'))}
                                    {renderKeyValue(Languages.invest.formInterest, dataPackage?.hinh_thuc_tra_lai, true)}
                                </Col>
                            </Row>
                            {!isMobile && renderInvestMethod()}
                            {!isMobile && renderButtonInvestNow}

                        </div>
                        {isMobile &&
                            <div className={cx('invest-note-container')}>
                                <span className={cx('invest-note-text')}>{Languages.invest.verifyInvest}</span>
                                {renderInvestMethod()}
                                {renderButtonInvestNow}
                            </div>}
                    </div>
                </div>
            </div>
            {renderPopup(popupAuthRef, Languages.auth.login, Languages.auth.register, IcPopupAuth, Languages.invest.noteAuth, Languages.invest.describeAuth)}
            {renderPopup(popupAccVerifyRef, Languages.invest.next, Languages.invest.verifyNow, IcPopupVerify, Languages.invest.noteVerify, Languages.invest.describeVerify)}
        </div>
    );
}

export default InvestPackageVerify;

