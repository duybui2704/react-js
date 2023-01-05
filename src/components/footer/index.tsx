import { Col, Row } from 'antd';
import IcLogo from 'assets/icon/ic_logoft.svg';
import IcFB from 'assets/icon/ic_facebookft.svg';
import IcYT from 'assets/icon/ic_youtube.svg';
import IcFR from 'assets/icon/ic_frame.svg';
import IcPublic from 'assets/icon/ic_public.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input/index';
import { MyTextAreaInput } from 'components/text-area';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import styles from './footer.module.scss';
import { TextFieldActions } from 'components/input/types';

const cx = classNames.bind(styles);
type PostDataModel = {
  user: string;
  phone: string;
  note: string;
};
function Footer() {
    const refName = useRef<TextFieldActions>(null);
    const refPhone = useRef<TextFieldActions>(null);
    const refNote = useRef<TextFieldActions>(null);

    const [postData, setPostData] = useState<PostDataModel>({
        user: '',
        phone: '',
        note: ''
    });
    const send = () => {

        // api call
        
        refName.current?.setValue?.('');
        refPhone.current?.setValue(''); 
        refNote.current?.setValue(''); 
        setPostData({
            user: '',
            phone: '',
            note: ''
        });    
    };

    const renderButton = useCallback((_label: string) => {
        return (
            <Button
                label={_label}
                buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
                width={100}
                containButtonStyles={cx('btn-footer-style')}
                onPress={send}
            />
        );
    }, []);

    const renderInput = useCallback(
        (_ref: any,_value: any, _type: string, _placeholder: string) => {
            const onChange = (e: string) => {
                switch (_placeholder) {
                    case Languages.footer.yourName:
                        setPostData({...postData, user: e});
                        break;
                    case Languages.footer.PhoneNumber:
                        setPostData({...postData, phone: e});
                        break;
                    default:
                        break;
                }
            };
            return (
                <MyTextInput
                    ref={_ref}
                    value={_value}
                    type={_type}
                    placeHolder={_placeholder}
                    inputStyle={cx('style-input')}
                    containerInput={cx('ctn-style-input')}
                    onChangeText={onChange}
                />
            );
        },
        [postData]
    );

    const renderTextarea = useCallback((_ref:any,_placeholder: string) => {
        const onChange = (e: string) => {
            setPostData({...postData, note: e});
        };
        return (
            <MyTextAreaInput
                ref={_ref}
                placeHolder={_placeholder}
                inputStyle={cx('textarea-footer')}
                value={postData.note}
                onChangeText={onChange}
            />
        );
    }, [postData]);

    const renderFooter = useMemo(() => {
        return (
            <div className={cx('text-left ')}>
                <div className={cx('box-footer-top')}>
                    <Row>
                        <Col span={9} xs={24}  md={24} lg={8}>
                            <div className={cx('box-footer-left')}>
                                <div className={cx('content-footer-left', 'column')}>
                                    <img src={IcLogo} className={cx('icon-tienngay')} />
                                    <div className={cx('h5')}>{Languages.footer.CompanyName}</div>
                                    <span className={cx('h6', 'company')}>
                                        {Languages.footer.companyAddress1}
                                        <br />
                                        {Languages.footer.companyAddress2}
                                    </span>
                                    <span className={cx('h6')}>{Languages.footer.email}</span>
                                    <span className={cx('h6')}>{Languages.footer.phone}</span>
                                    <div className={cx('footer-icon', 'jus-start g-16')}>
                                        <img src={IcFB} alt="" />
                                        <img src={IcFR} alt="" />
                                        <img src={IcPublic} alt="" />
                                        <img src={IcYT} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6} xs={24} md={12} lg={8} >
                            <div
                                className={cx(
                                    'box-information',
                                    'column g-24 center-flex-left'
                                )}
                            >
                                <div className={cx('information', 'column g-8')}>
                                    <div className={cx('h5')}>
                                        {Languages.footer.information[0]}
                                    </div>
                                    <span className={cx('h6')}>
                                        {Languages.footer.information[1]}
                                    </span>
                                    <span className={cx('h6')}>
                                        {Languages.footer.information[2]}
                                    </span>
                                    <span className={cx('h6')}>
                                        {Languages.footer.information[3]}
                                    </span>
                                </div>
                                <div className={cx('information', 'column g-8')}>
                                    <div className={cx('h5')}>
                                        {Languages.footer.customerSupport[0]}
                                    </div>
                                    <span className={cx('h6')}>
                                        {Languages.footer.customerSupport[1]}
                                    </span>
                                    <span className={cx('h6')}>
                                        {Languages.footer.customerSupport[2]}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={9} xs={24} md={12} lg={8} >
                            <div className={cx('box-footer-right', 'column g-8')}>
                                <div className={cx('h5')}>
                                    {Languages.footer.customerFeedback}
                                </div>
                                <Row className={cx('space-between')}>
                                    <Col span={12}>
                                        {renderInput(refName, postData.user, 'text', Languages.footer.yourName)}
                                    </Col>
                                    <Col span={11}>
                                        {renderInput( refPhone,postData.phone, 'text', Languages.footer.PhoneNumber)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        {renderTextarea(refNote,Languages.footer.yourComments)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        {renderButton(Languages.footer.sendFeedback)}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={cx('box-footer-bottom')}>
                    <span className={cx('h6')}> {Languages.footer.copyRight}</span>
                </div>
            </div>
        );
    }, [postData.phone, postData.user, renderButton, renderInput, renderTextarea]);
    return <div className={cx('footer-container')}>{renderFooter}</div>;
}

export default memo(Footer);
