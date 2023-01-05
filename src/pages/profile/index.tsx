import ImgPortrait from 'assets/image/img_portrait.jpg';
import classNames from 'classnames/bind';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { UserInfoModel } from 'models/user-model';
import { InfoUser, profile } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoChangePwd from './change-pwd';
import Conditions from './conditions';
import InfoAccount from './info-account';
import InfoPayment from './Info-payment';
import DrawerMobileAccount, { DrawerBaseActions } from 'components/drawer-mobile-account';
import InfoIdentity from './info-identity';
import InviteFriend from './invite-friend';
import styles from './profile.module.scss';
import { useAppStore } from 'hooks';
import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import { ItemScreenModel } from 'models/profile';
import { Col, Row } from 'antd';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const { userManager } = useAppStore();
    const isMobile = useIsMobile();
    const [info, setInfo] = useState<UserInfoModel>();
    const [step, setStep] = useState<number>(profile[0].id);

    const refDrawer = useRef<DrawerBaseActions>(null);

    useEffect(() => {
        setInfo(InfoUser);
    }, []);

    const onOpenIdentity = useCallback(() => {
        setStep(0);
    }, []);

    const renderViewRight = useMemo(() => {
        switch (step) {
            case 0:
                return <InfoIdentity />;
            case 1:
                return <InfoAccount />;
            case 2:
                return <InfoPayment />;
            case 3:
                return <InfoChangePwd />;
            case 6:
                return <Conditions />;
            case 7:
                return <InviteFriend />;
            default:
                return;
        }
    }, [step]);

    const onTabs = useCallback((index: number) => {
        setStep(index);
    }, []);

    const onPressIdentity = useCallback(() => {
        setStep(0);
    }, []);

    const onShowDrawer = useCallback(() => {
        refDrawer.current?.showModal();
    }, []);

    const renderViewMobile = useMemo(() => {
        return (
            <>
                <div className={cx('row space-between y20', 'top')}>
                    <span className={cx('text-black bold h4')}>{userManager.userInfo?.username}</span>
                    <img src={IcTwoPeople} onClick={onShowDrawer} />
                </div>
                <div className={cx('content-mobile')}>
                    {renderViewRight}
                </div>
            </>
        );
    }, [onShowDrawer, renderViewRight, userManager.userInfo?.username]);

    const renderLeftWebviewItemDetail = useMemo(() => {
        return (
            <div className={cx('profile')}>
                <div className={cx('avatar')}>
                    <img src={ImgPortrait} width={'40%'} />
                    <span className={cx('text-gray medium h5 y20')}>{info?.username}</span>
                    <label className={cx('text-red medium h6')} onClick={onOpenIdentity}>{info?.status}</label>
                </div>

                {profile.map((item: ItemScreenModel) => {
                    const onChangeStep = () => {
                        setStep(item?.id);
                    };

                    return (
                        <div className={item?.id === step ? cx('focus', 'column') : cx('column')} key={item?.id} onClick={onChangeStep}>
                            <div className={cx('row p12')}>
                                <img src={item?.icon} />
                                <span className={cx('xl10 h7 text-gray regular b5')}>{item?.title}</span>
                            </div>
                            <div className={cx('line')}></div>
                        </div>
                    );
                })}
            </div>
        );
    }, [info?.status, info?.username, onOpenIdentity, step]);

    const renderViewWeb = useMemo(() => {
        return (
            <Row gutter={[24,16]}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    {renderLeftWebviewItemDetail}
                </Col>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    {renderViewRight}
                </Col>
            </Row>
        );
    }, [renderLeftWebviewItemDetail, renderViewRight]);

    return (
        <div className={isMobile ? cx('container-mobile') : cx('container-web')}>
            {isMobile ? renderViewMobile : renderViewWeb}
            <DrawerMobileAccount ref={refDrawer} onChangeStep={onTabs} onPressStatus={onPressIdentity} />
        </div>

    );
}

export default Profile;
