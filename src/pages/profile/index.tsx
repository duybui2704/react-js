import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import classNames from 'classnames/bind';
import { COLOR_TRANSACTION } from 'commons/constants';
import DrawerMobileAccount, { DrawerBaseActions } from 'components/drawer-mobile-account';
import Footer from 'components/footer';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { toJS } from 'mobx';
import { ItemScreenModel } from 'models/profile';
import { UpdateInfoModal, UserInfoModel } from 'models/user-model';
import { profile } from 'assets/static-data/profile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountLink from './account-link';
import InfoChangePwd from './change-pwd';
import Commission from './commission';
import Conditions from './conditions';
import InfoAccount from './info-account';
import InfoIdentity from './info-identity';
import InfoPayment from './Info-payment';
import InviteFriend from './invite-friend';
import styles from './profile.module.scss';
import AvatarHoverImage from 'components/avatar-hover-image';
import SelectPhoto, { SelectPhotoAction } from 'components/select-photo';
import toasty from 'utils/toasty';
import Languages from 'commons/languages';
import { observer } from 'mobx-react';
import Policy from 'pages/policy';
import QuestionAnswer from './question-answer';
import UserManual from './user-manual';

const cx = classNames.bind(styles);

const Profile = observer(() => {
    const navigate = useNavigate();
    const { userManager, apiServices } = useAppStore();
    const isMobile = useIsMobile();
    const [info, setInfo] = useState<UserInfoModel>();
    const [step, setStep] = useState<number>(profile[0].id);

    const refDrawer = useRef<DrawerBaseActions>(null);
    const refAvatarPhoto = useRef<SelectPhotoAction>(null);

    useEffect(() => {
        setInfo(userManager.userInfo);
        console.log('info ===', toJS(userManager.userInfo));
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
                return <Policy isInLink={true} />;
            case 7:
                return <InviteFriend />;
            case 8:
                return <UserManual />;
            case 9:
                return <QuestionAnswer />;
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
            <div className={cx('mobile-view-container')}>
                {renderViewRight}
            </div>
        );
    }, [renderViewRight]);

    const renderStatusAcc = useMemo(() => {
        switch (info?.tinh_trang?.color) {
            case COLOR_TRANSACTION.RED:
                return (
                    <div className={cx('un-verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('un-verify-text')} >{info?.tinh_trang?.status}</span>
                    </div>
                );
            case COLOR_TRANSACTION.GREEN:
                return (
                    <div className={cx('verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('verify-text')} >{info?.tinh_trang?.status}</span>
                    </div>
                );
            case COLOR_TRANSACTION.YELLOW:
                return (
                    <div className={cx('wait-verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('wait-verify-text')}>{info?.tinh_trang?.status}</span>
                    </div>
                );
            default:
                break;
        }
    }, [info, onOpenIdentity]);

    const handleAvatar = useCallback(() => {
        refAvatarPhoto.current?.show?.();
    }, []);

    const handleChangeAvatarImage = useCallback(async (event: any) => {
        const getAvatarPath = await apiServices?.common.uploadImage(event.target.files[0]);
        if (getAvatarPath.success) {
            const data = getAvatarPath?.data as string;
            const resUpdateAvatar = await apiServices.auth.updateUserInf(
                data,
                userManager.userInfo?.full_name,
                userManager.userInfo?.gender,
                userManager.userInfo?.address
            ) as any;

            if (resUpdateAvatar.success) {
                const resData = resUpdateAvatar.data as UpdateInfoModal;
                toasty.success(Languages.profile.successEditAvatar);
                userManager.updateUserInfo({
                    ...userManager.userInfo,
                    avatar_user: data
                });
                refDrawer.current?.hide?.();
            }
        } else {
            toasty.error(Languages.errorMsg.uploadingError);
        }

    }, [apiServices.auth, apiServices?.common, userManager]);

    const renderViewWeb = useMemo(() => {
        return (
            <div className={cx('web-view-container')}>
                <div className={cx('profile')}>
                    <div className={cx('avatar')}>
                        <AvatarHoverImage image={info?.avatar_user} onPress={handleAvatar} />
                        <span className={cx('text-gray medium h5 y20')}>{info?.full_name}</span>
                        {renderStatusAcc}
                    </div>
                    {profile.map((item: ItemScreenModel, index: number) => {
                        const onChangeStep = () => {
                            setStep(item?.id);
                        };
                        return (
                            <div key={index} onClick={onChangeStep}
                                className={item?.id === step
                                    ? cx(index + 1 === profile.length ? 'item-focus-last-navigate' : 'item-focus-navigate')
                                    : cx(index + 1 === profile.length ? 'item-last-navigate' : 'item-navigate')}
                            >
                                <img src={item?.icon} />
                                <span className={cx('xl10 h7 text-gray')}>{item?.title}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('information', 'wid-70')}>
                    {renderViewRight}
                </div>
            </div>
        );
    }, [handleAvatar, info?.avatar_user, info?.full_name, renderStatusAcc, renderViewRight, step]);

    return (
        <>
            {isMobile && <div className={cx('row space-between y20', 'top')}>
                <span className={cx('text-black medium h7')}>{userManager.userInfo?.full_name}</span>
                <img src={IcTwoPeople} onClick={onShowDrawer} />
            </div>}
            <div className={cx(isMobile ? 'page-container-mobile' : 'page-container')}>
                {isMobile ? renderViewMobile : renderViewWeb}
                <DrawerMobileAccount ref={refDrawer}
                    onChangeStep={onTabs}
                    data={profile}
                    onPressStatus={onOpenIdentity}
                    onPressAvatar={handleAvatar} />
                <Footer />
                <SelectPhoto ref={refAvatarPhoto} onChangeText={handleChangeAvatarImage} />
            </div>
        </>


    );
});

export default Profile;
