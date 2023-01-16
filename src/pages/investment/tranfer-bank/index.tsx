import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { BankInformationModel, PackageInvest } from 'models/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './transfer-bank.module.scss';
import IcWarning from 'assets/image/ic_red_small_warning.svg';
import IcDownload from 'assets/image/ic_green_download.svg';
import { observer } from 'mobx-react';
import IcLeftArrow from 'assets/image/ic_gray_small_arrow_left.svg';

import utils from 'utils/utils';
import Footer from 'components/footer';
import toasty from 'utils/toasty';
import dateUtils from 'utils/date-utils';
import { Loading } from 'components/loading';

const cx = classNames.bind(styles);

interface QrTransferData {
    qrCode: string;
    qrDataURL: string;
}
const RESEND_TIME = 5;

const TransferBank = observer(({ goBack, onNextScreen, investPackage }: {
    goBack: () => void,
    onNextScreen: (data: PackageInvest) => void,
    investPackage?: PackageInvest,
}) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices } = useAppStore();

    const [qrUrl, setQrUrl] = useState<string>('');
    const [transferField, setTransferField] = useState<string>('');
    const [dataPackage, setDataPackage] = useState<PackageInvest>();
    const [bankInfo, setBankInfo] = useState<BankInformationModel>();

    const [timer, setTimer] = useState<number>(RESEND_TIME);

    const mounted = useRef<boolean>(false);
    const intervalRef = useRef<any>();

    useEffect(() => {
        mounted.current = true;
        checkBill();
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((t: any) => t - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            checkBill();
        }
    }, [timer]);

    useEffect(() => {
        fetchQRCode();
        setDataPackage(investPackage);
    }, [investPackage]);

    const checkBill = useCallback(async () => {
        const res = await apiServices.invest.checkBill(`${investPackage?.id}`) as any;

        if (res?.success && res.data === true) {
            toasty.success(Languages.invest.topUpSuccess);
        } else if (mounted.current) {
            setTimer(RESEND_TIME);
        }
    }, [apiServices.invest, investPackage?.id]);

    const fetchQRCode = useCallback(async () => {
        const resPayment = await apiServices.invest.getInvestBankInfo(`${investPackage?.id}`, 'web') as any;
        const bankInfoInvest = resPayment?.data?.bill as BankInformationModel;

        setBankInfo(bankInfoInvest);
        if (bankInfoInvest) {
            const fetchQRImg = await apiServices.invest.createQRTransferBank(
                Number(bankInfoInvest?.account),
                `${bankInfoInvest?.name_account}`,
                Number(bankInfoInvest?.bin),
                Number(utils.formatTextToNumber(bankInfoInvest?.money)),
                `${bankInfoInvest?.description}`
            );
            const dataFetch = fetchQRImg?.data as QrTransferData;
            setQrUrl(dataFetch?.qrDataURL);
        }

    }, [apiServices.invest, investPackage?.id]);

    const renderBankInfoCell = useCallback((_title?: string, _value?: string, haveCopy?: boolean) => {
        const onCopy = () => {
            navigator.clipboard.writeText(_value || '');
            toasty.success(Languages.transferBank.copySuccess);
        };
        return (
            <>
                <span className={cx('receiver-transfer-amount-text')}>{_title}</span>
                <div className={cx('bank-info-cell')}>
                    {_value
                        ? <span className={cx('bank-info-cell-text')}>{_value || ''}</span>
                        : <span className={cx('bank-info-cell-text-no-value')}>{_title}</span>
                    }
                    {!haveCopy && <div className={cx('copy-text')} onClick={onCopy}>{Languages.transferBank.copy}</div>}
                </div>
            </>
        );
    }, []);

    const renderItemRightBankInfo = useCallback((_title: string, _value?: string) => {
        return (
            <div className={cx('bank-field-container')}>
                <span className={cx('bank-field-label')}>{_title}</span>
                {_value
                    ? <span className={cx('bank-field-value')}>{_value}</span>
                    : <span className={cx('bank-field-value-no-value')}>{_title}</span>}
            </div>
        );
    }, []);

    const renderLeftView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('content-container')}>
                    <span className={cx('receiver-describe-transfer-text')}>{Languages.transferBank.describeTransfer}</span>
                    <div className={cx('receiver-bank-name-container')}>
                        {renderBankInfoCell(Languages.transferBank.receiverBankName, bankInfo?.name_bank, true)}
                    </div>
                    <span className={cx('receiver-bank-owner-text')}>{Languages.transferBank.receiverBankOwner}</span>
                    <span className={cx('receiver-bank-owner-text-value')}>{bankInfo?.name_account}</span>
                    {renderBankInfoCell(Languages.transferBank.receiverBankNumber, bankInfo?.account)}
                    <span className={cx('receiver-transfer-amount-text')}>{Languages.transferBank.transferAmount}</span>
                    <span className={cx('receiver-transfer-amount-text-value')}>{utils.formatLoanMoney(bankInfo?.money)}</span>
                    {renderBankInfoCell(Languages.transferBank.transferContent, bankInfo?.description)}
                    <div className={cx('transfer-note-container')}>
                        <img src={IcWarning} />
                        <span className={cx('transfer-note-text')}>{Languages.transferBank.noteTransfer}</span>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo?.account, bankInfo?.description, bankInfo?.money, bankInfo?.name_account, bankInfo?.name_bank, renderBankInfoCell]);

    const renderRightView = useMemo(() => {
        return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} >
                <div className={cx('qr-code-container')}>
                    <span className={cx('qr-action-text')}>{Languages.transferBank.qrAction}</span>
                    <div className={cx('qr-code-img-container')}>
                        {qrUrl
                            ? <img src={qrUrl} className={cx('img-qr')} />
                            : <Loading />
                        }
                        <span className={cx('bank-owner')}>{bankInfo?.name_account}</span>
                        {renderItemRightBankInfo(Languages.transferBank.bank, bankInfo?.name_bank)}
                        {renderItemRightBankInfo(Languages.transferBank.bankNumber, bankInfo?.account)}
                        <a className={cx('download')} href={qrUrl} download={`tienngay-qr-code-transfer-${dateUtils.getCurrentTime()}`}>
                            <img src={IcDownload} />
                        </a>
                    </div>
                </div>
            </Col>
        );
    }, [bankInfo?.account, bankInfo?.name_account, bankInfo?.name_bank, qrUrl, renderItemRightBankInfo]);

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
                    <Footer />
                </div>
            </div>
        </div>
    );
});

export default TransferBank;
