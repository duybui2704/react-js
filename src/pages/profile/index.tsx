import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import classNames from 'classnames/bind';
import { COLOR_TRANSACTION } from 'commons/constants';
import DrawerMobileAccount, { DrawerBaseActions } from 'components/drawer-mobile-account';
import Footer from 'components/footer';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { ItemScreenModel } from 'models/profile';
import { UserInfoModel } from 'models/user-model';
import { InfoUser, profile } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventEmitter } from 'utils/event-emitter';
import AccountLink from './account-link';
import InfoChangePwd from './change-pwd';
import Commission from './commission';
import Conditions from './conditions';
import InfoAccount from './info-account';
import InfoIdentity from './info-identity';
import InfoPayment from './Info-payment';
import InviteFriend from './invite-friend';
import styles from './profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const { userManager } = useAppStore();
    const isMobile = useIsMobile();
    const [info, setInfo] = useState<UserInfoModel>();
    const [step, setStep] = useState<number>(profile[0].id);

    const refDrawer = useRef<DrawerBaseActions>(null);

    useEffect(() => {
        setInfo(userManager.userInfo);
    }, [userManager.userInfo]);

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
            case 4:
                return <AccountLink />;
            case 5:
                return <Commission />;
            case 6:
                return <Conditions />;
            case 7:
                return <InviteFriend />;
            default:
                return;
        }
    }, [step]);

    const onTabs = useCallback((indexTabs: number) => {
        setStep(indexTabs);
    }, []);

    const onShowDrawer = useCallback(() => {
        refDrawer.current?.show();
    }, []);

    const renderViewMobile = useMemo(() => {
        return (
            <div className={cx('column', 'wid-100')}>
                <div className={cx('row space-between y20', 'top')}>
                    <span className={cx('text-black bold h4')}>{userManager.userInfo?.full_name}</span>
                    <img src={IcTwoPeople} onClick={onShowDrawer} />
                </div>
                <div className={cx('information', 'padding')}>
                    {renderViewRight}
                </div>
            </div>
        );
    }, [onShowDrawer, renderViewRight, userManager.userInfo?.full_name]);

    const renderStatusAcc = useMemo(() => {
        switch (info?.tinh_trang?.color) {
            case COLOR_TRANSACTION.RED:
                return (
                    <div className={cx('un-verify-container')}>
                        <span className={cx('un-verify-text')} onClick={onOpenIdentity}>{info?.tinh_trang?.status}</span>
                    </div>
                );
            case COLOR_TRANSACTION.GREEN:
                return (
                    <div className={cx('verify-container')}>
                        <span className={cx('verify-text')} onClick={onOpenIdentity}>{info?.tinh_trang?.status}</span>
                    </div>
                );
            case COLOR_TRANSACTION.YELLOW:
                return (
                    <div className={cx('wait-verify-container')}>
                        <span className={cx('wait-verify-text')} onClick={onOpenIdentity}>{info?.tinh_trang?.status}</span>
                    </div>
                );
            default:
                break;
        }
    }, [info?.tinh_trang?.color, info?.tinh_trang?.status, onOpenIdentity]);

    const renderViewWeb = useMemo(() => {
        return (
            <>
                <div className={cx('profile')}>
                    <div className={cx('avatar')}>
                        <img src={info?.avatar_user || ImgPortrait} width={'40%'} />
                        <span className={cx('text-gray medium h5 y20')} >{info?.full_name}</span>
                        {renderStatusAcc}

                    </div>
                    {profile.map((item: ItemScreenModel, index: number) => {
                        const onChangeStep = () => {
                            setStep(item.id);
                        };
                        return (
                            <div className={item?.id === step ? cx('focus', 'column', 'hover') : cx('column', 'hover')} key={index} onClick={onChangeStep}>
                                <div className={cx('row p12', 'item')}>
                                    <img src={item.icon} />
                                    <span className={cx('xl10 h7 text-gray regular b5')}>{item.title}</span>
                                </div>
                                <div className={cx('line')} />
                            </div>
                        );
                    })}
                </div>
                <div className={cx('information', 'wid-70')}>
                    {renderViewRight}
                </div>
            </>
        );
    }, [info?.avatar_user, info?.full_name, info?.tinh_trang?.status, onOpenIdentity, renderViewRight, step]);

    return (
        <div className={cx('column', 'container')}>
            <div className={isMobile ? cx('row') : cx('row', 'padding')}>
                {isMobile ? renderViewMobile : renderViewWeb}
                <DrawerMobileAccount ref={refDrawer} onChangeStep={onTabs} data={profile} onPressStatus={onOpenIdentity} />
            </div>
            <Footer />
        </div>

    );
}

export default Profile;
