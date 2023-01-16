import { Col, QRCode, Row } from 'antd';
import { LINKS } from 'api/constants';
import IcCopy from 'assets/image/ic_copy.svg';
import IcDownload from 'assets/image/ic_green_download.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { useAppStore } from 'hooks';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import toasty from 'utils/toasty';
import styles from './invite-friend.module.scss';

const cx = classNames.bind(styles);
const InviteFriend = observer(() => {
    const { userManager } = useAppStore();
    const [value] = useState<string>(`${userManager?.userInfo?.phone_number}`);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(value);
        toasty.info(Languages.profile.copySuccess);
    }, [value]);

    const downloadQRCode = useCallback(() => {
        const canvas = document.getElementById('my-qr-code')?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }, []);

    return (
        <div className={cx('container-edit')}>
            <span className={cx('text-black h5 medium')}>{Languages.profile.investmentIntroduction}</span>
            <Row gutter={[24, 16]} className={cx('row y20')}>
                <Col xs={24} md={24} lg={12} xl={12}>
                    <span className={cx('text-intro')}>{Languages.profile.codeIntroduction}</span>
                    <div className={cx('row', 'button-style')}>
                        <span className={cx('h7 text-black')} >{value}</span>
                        <img src={IcCopy} className={cx('download')} onClick={copyToClipboard} />
                    </div>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12}>
                    <span className={cx('text-intro')}>{Languages.profile.qrApp}</span>
                    <div className={cx('qr-container')} id={'my-qr-code'}>
                        <div className={cx('download')} onClick={downloadQRCode} >
                            <img src={IcDownload} className={cx('icon-small')} />
                        </div>
                        <QRCode
                            size={256}
                            value={LINKS.ONE_LINK}
                            className={cx('qr-code')}
                            bordered={false}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
});

export default InviteFriend;
