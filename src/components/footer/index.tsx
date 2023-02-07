import { Col, Row } from 'antd';
import IcLogo from 'assets/icon/ic_logoft.svg';
import IcFB from 'assets/icon/ic_facebookft.svg';
import IcGG from 'assets/icon/ic_frame.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input/index';
import { MyTextAreaInput } from 'components/text-area';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import styles from './footer.module.scss';
import { TextFieldActions } from 'components/input/types';
import { Events, TABS_PROFILE, TAB_INDEX, TYPE_INPUT } from 'commons/constants';
import formValidate from 'utils/form-validate';
import toasty from 'utils/toasty';
import { LINKS } from 'api/constants';
import { ItemProps } from 'models/common';
import { useAppStore } from 'hooks';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { EventEmitter } from 'utils/event-emitter';

const cx = classNames.bind(styles);

type FormFeedbackModel = {
    user: string;
    phone: string;
    note: string;
};

const IconLinks: ItemProps[] = [
    {
        icon: IcFB,
        link: LINKS.FB_FAN_PAGE
    },
    {
        icon: IcGG,
        link: LINKS.TIEN_NGAY
    }
];

function Footer() {
    const { apiServices, userManager } = useAppStore();
    const navigate = useNavigate();

    const refName = useRef<TextFieldActions>(null);
    const refPhone = useRef<TextFieldActions>(null);
    const refNote = useRef<TextFieldActions>(null);

    const [formFeedback, setFormFeedback] = useState<FormFeedbackModel>({
        user: userManager.userInfo?.full_name || '',
        phone: userManager.userInfo?.phone_number || '',
        note: ''
    });

    const onValidate = useCallback(() => {
        const errMsgName = formValidate.userNameValidate(refName.current?.getValue());
        const errMsgPhone = formValidate.passConFirmPhone(refPhone.current?.getValue());
        const errMsgNote = formValidate.inputEmpty(
            refNote.current?.getValue(),
            Languages.errorMsg.errDescribeRatingEmpty);

        if (errMsgName) {
            toasty.error(errMsgName);
        } else if (!errMsgName && errMsgPhone) {
            toasty.error(errMsgPhone);
        } else if (!errMsgName && !errMsgPhone && errMsgNote) {
            toasty.error(errMsgNote);
        }

        if (errMsgPhone.length + errMsgName.length + errMsgNote.length === 0) {
            return true;
        } return false;
    }, []);

    const onSend = useCallback(async () => {
        if (!userManager.userInfo) {
            navigate(Paths.auth, { state: { name: Languages.auth.login } });
        } else {
            if (onValidate()) {
                const res = await apiServices.common.ratingApp(5, refNote.current?.getValue()) as any;
                if (res.success) {
                    refNote.current?.setValue('');
                    setFormFeedback({
                        ...formFeedback,
                        note: ''
                    });
                }
            }
        }
    }, [apiServices.common, formFeedback, navigate, onValidate, userManager.userInfo]);

    const renderButton = useCallback((_label: string) => {
        return (
            <Button
                label={_label}
                buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
                width={100}
                labelStyles={cx('label-button-rating')}
                onPress={onSend}
                isLowerCase
            />
        );
    }, [onSend]);

    const renderInput = useCallback((
        _ref: any,
        _value: any,
        _type: string,
        _placeholder: string,
        _maxLength: number
    ) => {
        const onChange = (text: string) => {
            switch (_placeholder) {
                case Languages.footer.yourName:
                    setFormFeedback({ ...formFeedback, user: text });
                    break;
                case Languages.footer.phoneNumber:
                    setFormFeedback({ ...formFeedback, phone: text });
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
    }, [formFeedback]);

    const renderTextarea = useCallback((_ref: any, _placeholder: string) => {
        const onChange = (text: string) => {
            setFormFeedback({ ...formFeedback, note: text });
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
    }, [formFeedback]);

    const renderIcon = useCallback((key: number, icon: any, link: string) => {
        const openLink = () => {
            window.open(link);
        };
        return <img key={key} src={icon} alt='' className={cx('item-icon-link')} onClick={openLink} />;
    }, []);

    const renderIconLinks = useMemo(() => {
        return (
            <div className={cx('footer-icon', 'jus-start g-16')}>
                {IconLinks.map((item: ItemProps[] | any, index: number) => {
                    return renderIcon(index, item?.icon, item?.link);
                })}
            </div>
        );
    }, [renderIcon]);

    const renderInfoCompany = useMemo(() => {
        return (
            <div className={cx('content-footer-left', 'column g-10')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
                <span className={cx('h5 medium text-white-style')}>{Languages.footer.companyName}</span>
                <span className={cx('h6 text-white-style', 'company')}>{Languages.footer.companyAddress}</span>
                <a className={cx('h6 text-white-style')} href={Languages.footer.emailHref}>{Languages.footer.email}</a>
                <a className={cx('h6 text-white-style')} href={Languages.footer.phoneHref}>{Languages.footer.phone}</a>
                {renderIconLinks}
            </div>
        );
    }, [renderIconLinks]);

    const renderTabLink = useCallback((label: string) => {
        const onOpenLink = () => {
            switch (label) {
                case Languages.footer.informationChild[0]:
                    EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.NEWS);
                    break;
                case Languages.footer.informationChild[1]:
                    navigate(Paths.recruit);
                    break;
                case Languages.footer.informationChild[2]:
                    EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.PROFILE, TABS_PROFILE.POLICY);
                    break;
                default:
                    break;
            }
        };
        return <span className={cx('item-link')} onClick={onOpenLink}>{label}</span>;
    }, []);

    const renderInfoSupport = useMemo(() => {
        return (
            <div className={cx('info-link-container')}>
                <span className={cx('title-info-link')}>{Languages.footer.information}</span>
                {renderTabLink(Languages.footer.informationChild[0])}
                {/* {renderTabLink(Languages.footer.informationChild[1])} */}
                {renderTabLink(Languages.footer.informationChild[2])}
            </div>
        );
    }, [renderTabLink]);

    const renderRating = useMemo(() => {
        return (
            <Col xs={24} sm={12} md={16} lg={16} xl={16}>
                <span className={cx('h5 medium text-white')}>{Languages.footer.customerFeedback}</span>
                <Row gutter={[16, 8]} className={cx('y15')}>
                    <Col span={12}>
                        {renderInput(refName, formFeedback.user, TYPE_INPUT.TEXT, Languages.footer.yourName, 50)}
                    </Col>
                    <Col span={12}>
                        {renderInput(refPhone, formFeedback.phone, TYPE_INPUT.NUMBER, Languages.footer.phoneNumber, 10)}
                    </Col>
                    <Col span={24}>
                        {renderTextarea(refNote, Languages.footer.yourComments)}
                    </Col>
                    <Col span={24}>
                        {renderButton(Languages.footer.sendFeedback)}
                    </Col>
                </Row>
            </Col>
        );
    }, [formFeedback.phone, formFeedback.user, renderButton, renderInput, renderTextarea]);

    const renderFooter = useMemo(() => {
        return (
            <div className={cx('text-left')}>
                <Row gutter={[32, 24]} className={cx('box-footer-top')}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        {renderInfoCompany}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Row gutter={[12, 24]}>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                {renderInfoSupport}
                            </Col>
                            {renderRating}
                        </Row>
                    </Col>
                </Row>
                <div className={cx('box-footer-bottom')}>
                    <span className={cx('h6 text-white-style')}>{Languages.footer.copyRight}</span>
                </div>
            </div>
        );
    }, [renderInfoCompany, renderInfoSupport, renderRating]);

    return <div className={cx('footer-container')}>{renderFooter}</div>;
}

export default memo(Footer);
