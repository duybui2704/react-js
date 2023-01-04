import IcPortrait from 'assets/image/ic_gray_portrait.svg';
import IcFront from 'assets/image/ic_gray_front.svg';
import IcBehind from 'assets/image/ic_gray_behind.svg';
import IcRefresh from 'assets/image/ic_black_refresh.svg';
import IcTicked from 'assets/image/ic_white_ticked.svg';

import IcWarning from 'assets/image/ic_yellow_warning.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { InfoUser } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info-identity.module.scss';

import { UserInfoModel } from 'models/user-model';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { MyTextInput } from 'components/input';
import { Col, Row } from 'antd';
import { DescribePhoto } from 'commons/constants';
import SelectPhoto, { SelectPhotoAction } from 'components/select-photo';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';

const cx = classNames.bind(styles);

type PostData = {
    identity: string;
    frontCard: string;
    behindCard: string;
    portrait: string;
}

function InfoIdentity() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [info, setInfo] = useState<UserInfoModel>({});
    const [postData, setPostData] = useState<PostData>({
        identity: '',
        frontCard: '',
        behindCard: '',
        portrait: ''
    });

    const refIdentity = useRef<TextFieldActions>(null);
    const refFrontCard = useRef<SelectPhotoAction>(null);
    const refBehindCard = useRef<SelectPhotoAction>(null);
    const refPortrait = useRef<SelectPhotoAction>(null);

    useEffect(() => {
        setInfo(InfoUser);
    }, []);

    const renderDescribePhoto = useCallback((title: string, describeArray?: string[]) => {
        return (
            <div className={cx('describe-photo-container')}>
                <span className={cx('describe-photo-title')}>{title}</span>
                {describeArray?.map((item: string, index: number) => {
                    return (
                        <span className={cx('describe-photo-text')} key={index}>{item}</span>
                    );
                })}
            </div>
        );
    }, []);

    const renderInput = useCallback((_ref: any, value: string) => {
        const onChange = (text: string) => {
            setPostData({ ...postData, identity: text });
        };
        return (
            <MyTextInput
                ref={_ref}
                value={value}
                type={'number'}
                label={Languages.identity.identity}
                containerStyle={cx('input')}
                onChangeText={onChange}
                maxLength={12}
                placeHolder={Languages.identity.inputIdentity}
            />
        );
    }, [postData]);

    const renderPhoto = useCallback((_title: string, img: any, imgCache: string) => {
        const openDialogFiles = () => {
            switch (_title) {
                case Languages.identity.frontKyc:
                    refFrontCard.current?.show?.();
                    break;
                case Languages.identity.behindKyc:
                    refBehindCard.current?.show?.();
                    break;
                case Languages.identity.portrait:
                    refPortrait.current?.show?.();
                    break;
                default:
                    break;
            }
        };
        return (
            <div className={cx('photo-container')}>
                <span className={cx('photo-title')}>{_title}</span>
                <img src={imgCache || img} className={cx(imgCache ? (_title === Languages.identity.portrait ? 'photo-portrait' : 'photo') : '')} onClick={openDialogFiles} />
            </div>
        );
    }, []);

    const renderSelectPhoto = useCallback((_ref: any) => {
        const onChange = (e: any) => {
            let image = '';
            if (e.target.files.length !== 0) {
                image = URL.createObjectURL(e.target.files[0]);
            }
            switch (_ref) {
                case refFrontCard:
                    setPostData?.({ ...postData, frontCard: image });
                    break;
                case refBehindCard:
                    setPostData?.({ ...postData, behindCard: image });
                    break;
                case refPortrait:
                    setPostData?.({ ...postData, portrait: image });
                    break;
                default:
                    break;
            }
        };
        return (
            <SelectPhoto ref={_ref} onChangeText={onChange} />
        );
    }, [postData]);

    const onReChoose = useCallback(() => {
        setPostData({ ...postData, frontCard: '', behindCard: '', portrait: '' });
    }, [postData]);

    const onEKyc = useCallback(() => {
        // post data in postData
    }, []);

    const renderButton = useCallback((_title: string, _buttonStyle: any, _rightIcon: any, _onPress: () => void) => {
        return (
            <Button label={_title} width={isMobile ? 35 : 30} buttonStyle={_buttonStyle} isLowerCase rightIcon={_rightIcon} onPress={_onPress} />
        );
    }, [isMobile]);

    return (
        <div className={cx('all-container')}>
            <span className={cx('title-page')}>{Languages.identity.title}</span>
            <img src={IcWarning} className={cx('warning')} />
            <span className={cx('describe-identity-text')}>{Languages.identity.describeIdentity}</span>
            {renderInput(refIdentity, info?.identity || postData?.identity)}
            <Row gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    {renderDescribePhoto(Languages.identity.photoKyc, DescribePhoto.noteKYC)}
                    <div className={cx('kyc-container')}>
                        {renderPhoto(Languages.identity.frontKyc, IcFront, postData.frontCard)}
                        {renderPhoto(Languages.identity.behindKyc, IcBehind, postData.behindCard)}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    {renderDescribePhoto(Languages.identity.photoPortrait, DescribePhoto.notePortrait)}
                    {renderPhoto(Languages.identity.portrait, IcPortrait, postData.portrait)}
                </Col>
            </Row>
            <div className={cx('button-container')}>
                {renderButton(Languages.identity.reChoose, BUTTON_STYLES.GRAY, IcRefresh, onReChoose)}
                {renderButton(Languages.identity.verify, BUTTON_STYLES.GREEN, IcTicked, onEKyc)}
            </div>
            {renderSelectPhoto(refFrontCard)}
            {renderSelectPhoto(refBehindCard)}
            {renderSelectPhoto(refPortrait)}
        </div>
    );
}

export default InfoIdentity;
