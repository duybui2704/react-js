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
import { TYPE_INPUT } from 'commons/constants';
import formValidate from 'utils/form-validate';
import toasty from 'utils/toasty';

const cx = classNames.bind(styles);

type FormFeedbackModel = {
  user: string;
  phone: string;
  note: string;
};

function Footer() {
    const refName = useRef<TextFieldActions>(null);
    const refPhone = useRef<TextFieldActions>(null);
    const refNote = useRef<TextFieldActions>(null);

    const [formFeedback, setFormFeedback] = useState<FormFeedbackModel>({
        user: '',
        phone: '',
        note: ''
    });

    const onSend = useCallback(() => {
        const errMsgPhone = formValidate.passConFirmPhone(
            refPhone.current?.getValue()
        );
        const errMsgName = formValidate.userNameValidate(
            refName.current?.getValue()
        );

        if (!refName.current?.getValue()) {
            toasty.error(errMsgName);
        } else if (!refPhone.current?.getValue()) {
            toasty.error(errMsgPhone);
        }

        if (errMsgPhone.length + errMsgName.length > 0) {
            refName.current?.setValue?.('');
            refPhone.current?.setValue('');
            refNote.current?.setValue('');
            setFormFeedback({
                user: '',
                phone: '',
                note: ''
            });
        }
    }, []);

    const renderButton = useCallback(
        (_label: string) => {
            return (
                <Button
                    label={_label}
                    buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
                    width={100}
                    containButtonStyles={cx('btn-footer-style')}
                    onPress={onSend}
                />
            );
        },
        [onSend]
    );

    const renderInput = useCallback(
        (
            _ref: any,
            _value: any,
            _type: string,
            _placeholder: string,
            _maxLength: number
        ) => {
            const onChange = (e: string) => {
                switch (_placeholder) {
                    case Languages.footer.yourName:
                        setFormFeedback({ ...formFeedback, user: e });
                        break;
                    case Languages.footer.phoneNumber:
                        setFormFeedback({ ...formFeedback, phone: e });
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
                    maxLength={_maxLength}
                />
            );
        },
        [formFeedback]
    );

    const renderTextarea = useCallback(
        (_ref: any, _placeholder: string) => {
            const onChange = (e: string) => {
                setFormFeedback({ ...formFeedback, note: e });
            };
            return (
                <MyTextAreaInput
                    ref={_ref}
                    placeHolder={_placeholder}
                    inputStyle={cx('textarea-footer')}
                    containerInput={cx('textarea-container')}
                    value={formFeedback.note}
                    onChangeText={onChange}
                />
            );
        },
        [formFeedback]
    );

    const renderFooter = useMemo(() => {
        return (
            <div className={cx('text-left')}>
                <div className={cx('box-footer-top')}>
                    <Row>
                        <Col span={9} xs={24} md={24} lg={8}>
                            <div className={cx('box-footer-left pb16 ')}>
                                <div className={cx('content-footer-left', 'column g-10')}>
                                    <img src={IcLogo} className={cx('icon-tienngay')} />
                                    <div className={cx('h5 medium text-white-style')}>
                                        {Languages.footer.companyName}
                                    </div>
                                    <span className={cx('h6 text-white-style', 'company')}>
                                        {Languages.footer.companyAddress}
                                    </span>
                                    <span className={cx('h6 text-white-style')}>
                                        {Languages.footer.email}
                                    </span>
                                    <span className={cx('h6 text-white-style')}>
                                        {Languages.footer.phone}
                                    </span>
                                    <div className={cx('footer-icon', 'jus-start g-16')}>
                                        <img src={IcFB} alt="" />
                                        <img src={IcFR} alt="" />
                                        <img src={IcPublic} alt="" />
                                        <img src={IcYT} alt="" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6} xs={24} md={12} lg={8}>
                            <div
                                className={cx(
                                    'box-information',
                                    'column g-24 center-flex-left pb16'
                                )}
                            >
                                <div
                                    className={cx('information', 'column g-8 text-white-style')}
                                >
                                    <div className={cx('h5 medium text-white-style ')}>
                                        {Languages.footer.information}
                                    </div>
                                    {Languages.footer.informationChild.map((item) => (
                                        <span className={cx('h6')} key={item}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    className={cx('information', 'column g-8 text-white-style')}
                                >
                                    <div className={cx('h5 medium text-white-style')}>
                                        {Languages.footer.customerSupport}
                                    </div>
                                    {Languages.footer.customerChild.map((item) => (
                                        <span className={cx('h6 text-white-style')} key={item}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col span={9} xs={24} md={12} lg={8}>
                            <div
                                className={cx(
                                    'box-footer-right',
                                    'column g-8 text-white-style'
                                )}
                            >
                                <div className={cx('h5 medium text-white-style')}>
                                    {Languages.footer.customerFeedback}
                                </div>
                                <Row className={cx('space-between')}>
                                    <Col span={12}>
                                        {renderInput(
                                            refName,
                                            formFeedback.user,
                                            TYPE_INPUT.TEXT,
                                            Languages.footer.yourName,
                                            50
                                        )}
                                    </Col>
                                    <Col span={11}>
                                        {renderInput(
                                            refPhone,
                                            formFeedback.phone,
                                            TYPE_INPUT.PHONE,
                                            Languages.footer.phoneNumber,
                                            10
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        {renderTextarea(refNote, Languages.footer.yourComments)}
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
                    <span className={cx('h6 text-white-style')}>
                        {Languages.footer.copyRight}
                    </span>
                </div>
            </div>
        );
    }, [
        formFeedback.phone,
        formFeedback.user,
        renderButton,
        renderInput,
        renderTextarea
    ]);
    return <div className={cx('footer-container')}>{renderFooter}</div>;
}

export default memo(Footer);
