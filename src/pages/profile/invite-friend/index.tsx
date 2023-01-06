import { Col, Row } from 'antd';
import IcCopy from 'assets/image/ic_copy.svg';
import IcDownload from 'assets/image/ic_green_download.svg';
import ImgQr from 'assets/image/img_qr.jpeg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useRef, useState } from 'react';
import toasty from 'utils/toasty';
import styles from './invite-friend.module.scss';

const cx = classNames.bind(styles);
function InviteFriend() {

    const myRef = useRef(null);
    const [value, setValue] = useState<string>('123456789');

    const copyToClipboard = useCallback(() => {
        const ta = document.createElement('textarea');
        ta.innerText = value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        if (ta.textContent) {
            toasty.info(Languages.profile.copySuccess);
        }
        ta.remove();
    }, [value]);

    return (
        <div className={cx('page')}>
            <div className={cx('container-edit')}>
                <span className={cx('text-black h5 bold')}>{Languages.profile.investmentIntroduction}</span>
                <Row gutter={[24, 16]} className={cx('row y20')}>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <div className={cx('view-body-right')}>
                            <span className={cx('text-gray h7')}>{Languages.profile.codeIntroduction}</span>

                            <div className={cx('row', 'button-style')}>
                                <span className={cx('h7 text-black')} ref={myRef} >{value}</span>

                                <img
                                    src={IcCopy}
                                    className={cx('download')}
                                    onClick={copyToClipboard}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <div className={cx('view-body-right')}>
                            <span className={cx('text-gray h7')}>{Languages.profile.qrApp}</span>

                            <div className={cx('column', 'qr-style')}>
                                <div className={cx('flex-end')}>
                                    <a className={cx('download')} href={ImgQr} download={'qr-code'} >
                                        <img src={IcDownload} className={cx('icon-small')} />
                                    </a>
                                </div>
                                <div className={cx('row center')}>
                                    <img src={ImgQr} className={cx('qr-code')} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    );
}

export default InviteFriend;
