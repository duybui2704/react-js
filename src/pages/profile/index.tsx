import { Col, Row } from 'antd';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import classNames from 'classnames/bind';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { UserInfoModel } from 'models/user-model';
import { InfoUser, profile } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
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

    const onPress = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const onOpenDrawer = useCallback(() => {
        refDrawer.current?.showModal();
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

    const onShowDrawer = useCallback(() => {
        refDrawer.current?.showModal();
    }, []);

    return (
        <div className={isMobile ? cx('container', 'column') : cx('container', 'padding')}>
            {isMobile ?
                <>
                    <div className={cx('row space-between y20', 'top')}>
                        <span className={cx('text-black bold h4')}>{userManager.userInfo?.username}</span>
                        <img src={IcTwoPeople} onClick={onShowDrawer} />
                    </div>
                    <div className={cx('information', 'padding')}>
                        {renderViewRight}
                    </div>
                </> : <>
                    <div className={cx('profile')}>
                        <div className={cx('avatar')}>
                            <img src={ImgPortrait} width={'40%'} />
                            <span className={cx('text-gray medium h5 y20')} >{info?.username}</span>
                            <label className={cx('text-red medium h6')} onClick={onOpenIdentity}>{info?.status}</label>
                        </div>

                        {profile.map((item, index) => {

                            const onChangeStep = () => {
                                setStep(item.id);
                            };

                            return (
                                <div className={index === step - 1 ? cx('focus', 'column') : cx('column')} key={index} onClick={onChangeStep}>
                                    <div className={cx('row p12')}>
                                        <img src={item.icon} />
                                        <span className={cx('xl10 h7 text-gray regular b5')}>{item.title}</span>
                                    </div>
                                    <div className={cx('line')}></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cx('information', 'wid-70')}>
                        {renderViewRight}
                    </div>
                </>}

            <DrawerMobileAccount ref={refDrawer} onChangeStep={onTabs} />
        </div>

    );
}

export default Profile;
