import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImgHeader from 'assets/image/img_home_header.jpg';
import styles from './invest-detail.module.scss';
import classNames from 'classnames/bind';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';
import Languages from 'commons/languages';
import { Col, Row } from 'antd';
import { PackageInvest } from 'models/invest';
import IcRightArrow from 'assets/image/ic_white_small_right_arrow.svg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';
import IcPopupVerify from 'assets/image/ic_popup_verify.svg';

import utils from 'utils/utils';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import { useAppStore } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';

const cx = classNames.bind(styles);

// const dataFake = {
//     id: 1,
//     ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
//     so_tien_dau_tu: '80000000',
//     lai_hang_thang: '1000000',
//     ngay_dau_tu: '12/12/2022',
//     ki_han_dau_tu: '6 tháng',
//     tong_lai_du_kien: '3984000',
//     tong_lai_da_nhan: '24.000.000',
//     tong_lai_da_tra: '',
//     ngay_dao_han: '',
//     hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
//     ti_le_lai_suat_hang_thang: '1%',
//     ti_le_lai_suat_hang_nam: '12%',
//     trang_thai_hop_dong: '',
//     ngay_dao_han_du_kien: '01/01/2023',
//     tong_lai_nhan_duoc: '1000000',
//     thoi_gian_dau_tu: '6 tháng',
//     tong_goc_con_lai: '',
//     tong_goc_da_tra: ''
// };

function InvestDetail({ onNavigateInvest, investPackage }: { onNavigateInvest: () => void, investPackage?: PackageInvest }) {

    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const { userManager } = useAppStore();

    const popupAuthRef = useRef<PopupBaseActions>(null);
    const popupAccVerifyRef = useRef<PopupBaseActions>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setDataPackage(investPackage);
    }, [investPackage]);

    const onBack = useCallback(() => {
        onNavigateInvest();
    }, [onNavigateInvest]);

    const renderKeyValue = useCallback((_key?: string, _value?: string) => {
        return (
            <div className={cx('key-value-container')}>
                <span className={cx('key-text h6 regular')}>{_key}</span>
                <span className={cx('value-text h6 medium')}>{_value}</span>
            </div>
        );
    }, []);

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
            <PopupBaseCenterScreen ref={_ref} labelCancel={_labelRight} labelSuccess={_labelLeft}
                hasTwoButton onSuccessPress={handleLeftButton} onClose={handleRightButton}
                icon={_icon} hasCloseIc title={_title} description={_describe} />
        );
    }, [navigate]);

    return (
        <div className={cx('page')}>
            <div className={cx('banner-container')}>
                <img src={ImgHeader} className={cx('banner')} />
                <div onClick={onBack} className={cx('back')}>
                    <img src={IcLeftArrow} className={cx('ic-back')} />
                </div>
                <div className={cx('content-container')}>
                    <div className={cx('text-banner-container')}>
                        <span className={cx('h10 text-white medium')}>{Languages.invest.investTienNgay}</span>
                        <span className={cx('h4 text-white medium')}>{Languages.invest.buildFuture}</span>
                        <span className={cx('describe-text')}>{Languages.invest.describe}</span>
                        <div className={cx('content-invest-container')}>
                            <span className={cx('info-contract-text')}>{Languages.invest.infoContract}</span>
                            <span className={cx('amount-invest-text')}>{utils.formatLoanMoney(dataPackage?.so_tien_dau_tu || '0').replace(' vnđ', '')}</span>
                            <Row gutter={[24, 0]} className={cx('invest-wrap')}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                                    {renderKeyValue(Languages.invest.contractId, dataPackage?.ma_hop_dong)}
                                    {renderKeyValue(Languages.invest.investmentTerm, dataPackage?.ki_han_dau_tu)}
                                    {renderKeyValue(Languages.invest.expectedDueDate, dataPackage?.ngay_dao_han_du_kien)}
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column-wrap')}>
                                    {renderKeyValue(Languages.invest.totalProfitReceived, utils.formatMoneyNotSuffixes(dataPackage?.tong_lai_nhan_duoc))}
                                    {renderKeyValue(Languages.invest.monthlyInterestRate, dataPackage?.ti_le_lai_suat_hang_thang)}
                                    {renderKeyValue(Languages.invest.monthlyInterest, utils.formatLoanMoney(dataPackage?.lai_hang_thang || '0').replaceAll(',', '.'))}
                                    {renderKeyValue(Languages.invest.formInterest, dataPackage?.hinh_thuc_tra_lai)}
                                </Col>
                            </Row>
                            <div className={cx('invest-now-wrap')}>
                                <div className={cx('invest-now-container')} onClick={handleInvestNow} >
                                    <span className={cx('invest-now-text')}>{Languages.invest.investNow}</span>
                                    <img src={IcRightArrow} className={cx('ic_arrow')} />
                                </div>
                            </div>

                        </div>
                        <div className={cx('invest-note-container')}>
                            <span className={cx('invest-note-text')}>{Languages.invest.investNote}</span>
                            <span className={cx('invest-note-describe-text')}>{Languages.invest.investNoteDescribe}</span>
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
