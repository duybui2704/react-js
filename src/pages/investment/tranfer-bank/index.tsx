import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { BankInformationModel, PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './transfer-bank.module.scss';
import IcWarning from 'assets/image/ic_red_small_warning.svg';
import IcDownload from 'assets/image/ic_green_download.svg';
import { observer } from 'mobx-react';
import { BankTransferInfo } from 'pages/__mocks__/invest';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';

import utils from 'utils/utils';
import Footer from 'components/footer';
import toasty from 'utils/toasty';

const cx = classNames.bind(styles);

interface QrTransferData {
    qrCode: string;
    qrDataURL: string;
}

const TransferBank = observer(({ goBack, onNextScreen, investPackage }: { goBack: () => void, onNextScreen: (data: PackageInvest) => void, investPackage?: PackageInvest }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [qrUrl, setQrUrl] = useState<string>('');
    const [transferField, setTransferField] = useState<string>('');
    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const [bankInfo, setBankInfo] = useState<BankInformationModel>(BankTransferInfo);

    useEffect(() => {
        fetchQRCode();
        setDataPackage(investPackage);
    }, [investPackage]);

    const fetchQRCode = useCallback(async () => {
        const fetchQRImg = await apiServices.invest.createQRTransferBank(
            Number(bankInfo?.account),
            bankInfo.name_account,
            Number(bankInfo?.bin),
            Number(bankInfo?.money),
            bankInfo.description
        );
        const dataFetch = fetchQRImg?.data as QrTransferData;
        setQrUrl(dataFetch?.qrDataURL);

    }, [apiServices.invest, bankInfo?.account, bankInfo?.bin, bankInfo.description, bankInfo?.money, bankInfo.name_account]);

    const renderBankInfoCell = useCallback((_value: string, haveCopy?: boolean) => {
        const onCopy = () => {
            navigator.clipboard.writeText(_value);
            toasty.success(Languages.transferBank.copySuccess);
        };
        return (
            <div className={cx('bank-info-cell')}>
                <span className={cx('bank-info-cell-text')}>{_value}</span>
                {!haveCopy && <div className={cx('copy-text')} onClick={onCopy}>{Languages.transferBank.copy}</div>}
            </div>
        );
    }, []);

    const renderLeftView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('content-container')}>
                    <span className={cx('receiver-describe-transfer-text')}>{Languages.transferBank.describeTransfer}</span>
                    <div className={cx('receiver-bank-name-container')}>
                        <span className={cx('receiver-bank-name-text')}>{Languages.transferBank.receiverBankName}</span>
                        {renderBankInfoCell(bankInfo?.name_bank, true)}
                    </div>
                    <span className={cx('receiver-bank-owner-text')}>{Languages.transferBank.receiverBankOwner}</span>
                    <span className={cx('receiver-bank-owner-text-value')}>{bankInfo.name_account}</span>
                    <span className={cx('receiver-bank-number-text')}>{Languages.transferBank.receiverBankNumber}</span>
                    {renderBankInfoCell(bankInfo?.account)}
                    <span className={cx('receiver-transfer-amount-text')}>{Languages.transferBank.transferAmount}</span>
                    <span className={cx('receiver-transfer-amount-text-value')}>{utils.formatLoanMoney(bankInfo.money)}</span>
                    <span className={cx('transfer-content-text')}>{Languages.transferBank.transferContent}</span>
                    {renderBankInfoCell(bankInfo?.description)}
                    <div className={cx('transfer-note-container')}>
                        <img src={IcWarning} />
                        <span className={cx('transfer-note-text')}>{Languages.transferBank.noteTransfer}</span>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo?.account, bankInfo?.description, bankInfo.money, bankInfo.name_account, bankInfo?.name_bank, renderBankInfoCell]);

    const renderRightView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('qr-code-container')}>
                    <span className={cx('qr-action-text')}>{Languages.transferBank.qrAction}</span>
                    <div className={cx('qr-code-img-container')}>
                        <img src={qrUrl} className={cx('img-qr')} />
                        <span className={cx('bank-owner')}>{bankInfo.name_account}</span>
                        <div className={cx('bank-field-container')}>
                            <span className={cx('bank-field-label')}>{Languages.transferBank.bank}</span>
                            <span className={cx('bank-field-value')}>{bankInfo.name_bank}</span>
                        </div>
                        <div className={cx('bank-field-container')}>
                            <span className={cx('bank-field-label')}>{Languages.transferBank.bankNumber}</span>
                            <span className={cx('bank-field-value')}>{bankInfo.account}</span>
                        </div>
                        <a className={cx('download')} href={qrUrl} download={'qr-transfer'}>
                            <img src={IcDownload} />
                        </a>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo.account, bankInfo.name_account, bankInfo.name_bank, qrUrl]);

    return (
        <div className={cx('page-container')}>
            <div className={cx('all-content')}>
                <Row gutter={[24, 24]} className={cx(isMobile ? 'row-content-mobile' : 'row-content')}>
                    {renderLeftView}
                    {renderRightView}
                </Row>
                <div className={cx(isMobile ? 'ic-back-mobile' : 'ic-back')} onClick={goBack}>
                    <img src={IcLeftArrow} />
                </div>
                <div className={cx('footer')}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
});

export default TransferBank;
