import Languages from 'commons/languages';
import React, { memo, useCallback, useMemo } from 'react';
import styles from './footer.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import IcLogo from 'assets/image/img_logo.svg';
import { MyTextInput } from 'components/input/index';
import { MyTextAreaInput } from 'components/text-area';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';

const cx = classNames.bind(styles);
function Footer() {
    const renderButton = useCallback((_label:string) => {
        return <Button 
            label={_label}
            buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
            width={100}
            containButtonStyles={cx('btn-footer-style')}
        />;
    }, []);

    const renderInput = useCallback((_type: string, _placeholder: string) => {
        return <MyTextInput 
            type={_type} 
            placeHolder={_placeholder} 
            value="" />;
    }, []);

    const renderTextarea = useCallback((_placeholder: string) => {
        return (
            <MyTextAreaInput
                placeHolder={_placeholder}
                inputStyle={cx('textarea-footer')}
                value=""
            />
        );
    }, []);
    const renderFooter = useMemo(() => {
        return (
            <div>
                <div className={cx('box-footer-top')}>
                    <Row>
                        <Col span={8}>
                            <div className={cx('box-footer-left')}>
                                <div className={cx('content-footer-left')}>
                                    <img src={IcLogo} className={cx('icon-tienngay')} />
                                    <h3>CÔNG TY CỔ PHẦN CÔNG NGHỆ TÀI CHÍNH VIỆT</h3>
                                    <span>
                    Tầng 15, Khối B, Tòa nhà Sông Đà, Phạm Hùng,
                                        <br />
                    Mỹ Đình 1, Nam Từ Liêm, Hà Nội
                                    </span>
                                    <span>Email: contact@tienngay.vn</span>
                                    <span>Phone: contact@tienngay.vn</span>
                                    <div className={cx('footer-icon')}></div>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={cx('box-information')}>
                                <div className={cx('information')}>
                                    <h3>Thông tin</h3>
                                    <span>Truyền thông</span>
                                    <span>Tuyển dụng</span>
                                    <span>Điều kiện và điều khoản</span>
                                </div>
                                <div className={cx('information')}>
                                    <h3>Hỗ trợ khách hàng</h3>
                                    <span>Sản phẩm</span>
                                    <span>Điểm giao dịch</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={cx('box-footer-right')}>
                                <h3>Mọi góp ý của bạn là niềm hạnh phúc của chúng tôi </h3>
                                <Row className={cx('style-input-input')}>
                                    <Col span={12}>{renderInput('text', 'Tên của bạn')}</Col>
                                    <Col span={11}> {renderInput('text', 'Số điện thoại')}</Col>
                                </Row>
                                <Row>
                                    <Col span={24}> {renderTextarea('Góp ý của bạn')}</Col>
                                </Row>
                                <Row>
                                    <Col span={24}> {renderButton('Gửi phản hồi ')}</Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={cx('box-footer-center')}></div>
            </div>
        );
    }, []);
    return <div className={cx('footerContainer')}>{renderFooter}</div>;
}

export default memo(Footer);
