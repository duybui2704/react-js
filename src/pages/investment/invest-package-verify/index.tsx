import { Col, Row } from 'antd';
import IcLeftArrow from 'assets/image/ic_white_left_arrow.svg';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import ImgHeader from 'assets/image/img_home_header.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './invest-package-verify.module.scss';

import { LINKS } from 'api/constants';
import CheckBox from 'components/check-box';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useNavigate } from 'react-router-dom';
import utils from 'utils/utils';
import RadioInvestMethod from 'components/radio-invest-method';
import { InvestMethod } from 'pages/__mocks__/invest';
import { COLOR_TRANSACTION, TYPE_TRANSFER_AMOUNT } from 'commons/constants';
import Footer from 'components/footer';
import toasty from 'utils/toasty';
import { observer } from 'mobx-react';

const cx = classNames.bind(styles);

const InvestPackageVerify = observer(({ onBackDetail, onNextScreen, investPackage }: {
    onBackDetail: () => void,
    onNextScreen: () => void,
    investPackage?: PackageInvest
}) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const { userManager, apiServices } = useAppStore();

    const [isCheckbox, setCheckbox] = useState<boolean>(false);
    const [investMethod, setInvestMethod] = useState<string>('');

    useEffect(() => {
        setDataPackage(investPackage);
    }, [investPackage]);

    const onBack = useCallback(() => {
        onBackDetail();
    }, [onBackDetail]);

    const onNavigateTransferBank = useCallback(async () => {
        onNextScreen();
    }, [onNextScreen]);

    const onNavigateTransferNganLuong = useCallback(async () => {
        const resPaymentNganLuong = await apiServices.invest.requestNganLuong(`${investPackage?.id}`, 'web') as any;
        if (resPaymentNganLuong.success && resPaymentNganLuong.data) {
            // create 1 tabs view to show Ngan Luong, then instead of behind code line.
            window.open(resPaymentNganLuong?.data as string);
        }
    }, [apiServices.invest, investPackage?.id]);

    const renderKeyValue = useCallback((_key?: string, _value?: string, _redValue?: boolean, noBorder?: boolean) => {
        return (
            <div className={cx(noBorder ? 'no-border-key-value-container' : 'key-value-container')}>
                <span className={cx(isMobile ? 'text-gray h7' : 'text-gray h6')}>{_key}</span>
                <span className={_redValue ?
                    cx(isMobile ? 'text-red h7 medium' : 'text-red h6 medium') :
                    cx(isMobile ? 'text-gray h7 medium' : 'text-gray h6 medium')}>
                    {_value}
                </span>
            </div>
        );
    }, [isMobile]);

    const handleInvestNow = useCallback(() => {
        if (isCheckbox) {
            if (userManager.userInfo?.tinh_trang?.color === COLOR_TRANSACTION.RED) {
                toasty.warn(Languages.invest.unconfirmed);
            } else if (userManager.userInfo?.tinh_trang?.color === COLOR_TRANSACTION.YELLOW) {
                toasty.warn(Languages.invest.waitingConfirm);
            }
            else if (!userManager.userInfo?.tra_lai?.type_interest_receiving_account) {
                toasty.warn(Languages.invest.noAccount);
            } else if (investMethod === TYPE_TRANSFER_AMOUNT.BANK) {
                if (userManager.userInfo?.tra_lai?.name_bank_account) {
                    onNavigateTransferBank();
                } else {
                    toasty.warn(Languages.invest.bankAccountEmpty);
                }
            } else if (investMethod === TYPE_TRANSFER_AMOUNT.NGAN_LUONG) {
                onNavigateTransferNganLuong();
            } else if (!investMethod) {
                toasty.warn(Languages.invest.choosePaymentMethod);
            }
        } else {
            toasty.warn(Languages.invest.agreePolicyToInvest);
        }
    }, [investMethod, isCheckbox, onNavigateTransferBank, onNavigateTransferNganLuong, userManager.userInfo?.tinh_trang?.color, userManager.userInfo?.tra_lai]);

    const handlePopupPolicy = useCallback(() => {
        window.open(LINKS.POLICY_INVESTOR);
    }, []);

    const renderLabelCheckbox = Languages.invest.agreePolicy.split('').map((character: string, index: number) => {
        return (
            <span className={cx('agree-policy-text-wrap')} key={index}>{
                character === '$' ? <span className={cx('agree-policy-text')} onClick={handlePopupPolicy}>{Languages.invest.policy}</span> : character
            }</span>
        );
    });

    const renderInvestMethod = useCallback(() => {
        const onChooseMethod = (event: any) => {
            setInvestMethod(event.target?.value);
        };
        const changeCheckboxStatus = (event: any) => {
            setCheckbox(event.target.checked);
        };
        return (
            <div className={cx(isMobile ? 'invest-method-container-mobile' : 'invest-method-container')}>
                <span className={cx('invest-method-text')}>{Languages.invest.investMethod}</span>
                <RadioInvestMethod data={InvestMethod} defaultValue={investMethod} onChangeText={onChooseMethod} />
                <CheckBox title={renderLabelCheckbox} onChangeText={changeCheckboxStatus} groupCheckBoxContainer={cx(isMobile ? 'group-check-box-container-mobile' : 'group-check-box-container')} />
            </div>
        );
    }, [investMethod, isMobile, renderLabelCheckbox]);

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

    const renderPackage = useMemo(() => {
        return (
            <div className={cx(isMobile ? 'content-invest-container-mobile' : 'content-invest-container')}>
                <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                <span className={cx(isMobile ? 'amount-invest-mobile-text' : 'amount-invest-text')}>{dataPackage?.so_tien_dau_tu.replace(' VND', '')}</span>
                <div className={cx('invest-wrap')}>
                    <Row gutter={[24, 0]} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            {renderKeyValue(Languages.invest.contractId, dataPackage?.ma_hop_dong)}
                            {renderKeyValue(Languages.invest.investmentTerm, dataPackage?.thoi_gian_dau_tu)}
                            {renderKeyValue(Languages.invest.expectedDueDate, dataPackage?.ngay_dao_han_du_kien)}
                            {renderKeyValue(Languages.invest.amountDemandedForInvestment, utils.formatLoanMoney(dataPackage?.so_tien_dau_tu), true)}
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatLoanMoney(dataPackage?.tong_lai_nhan_duoc))}
                            {renderKeyValue(Languages.invest.monthlyInterestRate, dataPackage?.ti_le_lai_suat_hang_thang)}
                            {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(dataPackage?.lai_hang_thang))}
                            {renderKeyValue(Languages.invest.formInterest, dataPackage?.hinh_thuc_tra_lai, false, isMobile ? true : false)}
                        </Col>
                    </Row>
                </div>
                {!isMobile && renderInvestMethod()}
                {!isMobile && renderButtonInvestNow}
            </div>
        );
    }, [dataPackage?.hinh_thuc_tra_lai, dataPackage?.lai_hang_thang, dataPackage?.ma_hop_dong, dataPackage?.ngay_dao_han_du_kien, dataPackage?.so_tien_dau_tu, dataPackage?.thoi_gian_dau_tu, dataPackage?.ti_le_lai_suat_hang_thang, dataPackage?.tong_lai_nhan_duoc, isMobile, renderButtonInvestNow, renderInvestMethod, renderKeyValue]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack} className={cx(isMobile ? 'back-mobile' : 'back')}>
                    <img src={IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('text-banner-container')}>
                    <span className={cx(isMobile ? 'h3 text-white medium' : 'invest-tien-ngay-text')}>{Languages.invest.investTienNgay}</span>
                    <span className={cx(isMobile ? 'h6 text-white medium b5' : 'invest-build-future-text')}>{Languages.invest.buildFuture}</span>
                    <span className={cx(isMobile ? 'describe-mobile-text' : 'describe-text')}>{Languages.invest.describe}</span>
                    {renderPackage}

                    {isMobile && <div className={cx(isMobile ? 'invest-note-container-mobile' : 'invest-note-container')}>
                        <span className={cx('invest-note-text')}>{Languages.invest.verifyInvest}</span>
                        {renderInvestMethod()}
                        {renderButtonInvestNow}
                    </div>}
                    <div className={cx('footer')}>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default InvestPackageVerify;

