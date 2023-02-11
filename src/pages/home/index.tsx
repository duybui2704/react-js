import { Tabs } from 'antd';
import IcLogo from 'assets/image/img_logo.jpeg';
import IcMenu from 'assets/image/ic_menu.svg';
import IcLogout from 'assets/image/ic_logout.svg';
import IcTicked from 'assets/image/ic_green_round_ticked.svg';
import IcNoVerify from 'assets/image/ic_red_round_close.svg';
import IcNotification from 'assets/image/ic_notification.svg';
import ImgNoAvatar from 'assets/image/img_no_avatar.jpg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';

import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import Intro from 'pages/intro';
import InvestTab from 'pages/investment/invest-tab';
import Manage from 'pages/manage';
import News from 'pages/news';
import Profile from 'pages/profile';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { COLORS } from 'theme/colors';
import styles from './home.module.scss';
import { DrawerBaseActions } from 'components/drawer-mobile-account';
import MenuMobile from 'components/menu-mobile';
import sessionManager from 'managers/session-manager';
import { useAppStore } from 'hooks';
import { EventEmitter } from 'utils/event-emitter';
import { AUTH_STATE, COLOR_TRANSACTION, Events, TABS_PROFILE, TAB_INDEX } from 'commons/constants';
import { observer } from 'mobx-react';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'components/modal/modal';
import Notification from 'pages/notification';
import { NotificationTotalModel } from 'models/notification';
import { TabsMenuHeader } from 'assets/static-data/profile';
import { onMessageListener, requestForToken } from 'firebase-config';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

interface TabsModel {
    label: string,
    key: string,
    children: ReactNode
}

const Home = observer(() => {
    const navigate = useNavigate();
    const { userManager, apiServices, common } = useAppStore();
    const isMobile = useIsMobile();
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false);
    const [numberTabs, setNumberTabs] = useState<number>(0);
    const [receptionData, setReceptionData] = useState<any>();

    const [focus, setFocus] = useState<boolean>(false);

    const refPopupLogout = useRef<PopupBaseActions>(null);
    const refDrawer = useRef<DrawerBaseActions>(null);

    const [position] = useState<PositionType[]>(['left', 'right']);

    useEffect(() => {
        requestForToken();
        onMessageListener()
            .then((payload) => {
                console.log('payload ===', payload);
            })
            .catch((err) => console.log('failed: ', err));
    }, []);

    const onLogOut = useCallback(() => {
        refPopupLogout.current?.showModal();
    }, []);

    const onHandleChangeTab = useCallback((index: number, indexTabs: number, data: any) => {
        setStepIndex(index);
        setNumberTabs(indexTabs);
        setReceptionData(data);
        setFocus(last => !last);
    }, []);

    useEffect(() => {
        EventEmitter.on(Events.CHANGE_TAB, onHandleChangeTab);
        EventEmitter.on(Events.LOGOUT, onLogOut);
        return () => {
            EventEmitter.remove();
        };
    }, [onHandleChangeTab, onLogOut]);

    useEffect(() => {
        fetchAppConfig();
        getUnreadNotify();
    }, []);

    const fetchAppConfig = useCallback(async () => {
        const config = await apiServices.common.getAppConfig();
        common.setAppConfig(config.data);
    }, [apiServices.common, common]);

    const getUnreadNotify = useCallback(async () => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getUnreadNotify() as any;
            if (res.success) {
                const data = res.data as NotificationTotalModel;
                common.setAppConfig({ ...common.appConfig, total_un_read: data?.total_unRead });
            }
        }
    }, [apiServices.notification, common, userManager.userInfo]);

    const onChangeMenu = useCallback((index: number) => {
        setStepIndex(index);
    }, []);

    const renderIconVerify = useMemo(() => {
        switch (userManager.userInfo?.tinh_trang?.color) {
            case COLOR_TRANSACTION.RED:
                return <img className={cx('ic_verify')} src={IcNoVerify} />;
            case COLOR_TRANSACTION.YELLOW:
                return <img className={cx('ic_verify')} src={IcNoVerify} />;
            case COLOR_TRANSACTION.GREEN:
                return <img className={cx('ic_verify')} src={IcTicked} />;
            default:
                return null;
        }
    }, [userManager.userInfo?.tinh_trang?.color]);

    const OperationsSlot: Record<PositionType, React.ReactNode> = useMemo(() => {

        const navigateToLogin = () => {
            navigate(Paths.auth, { state: { name: AUTH_STATE.LOGIN } });
        };

        const navigateToRegister = () => {
            navigate(Paths.auth, { state: { name: AUTH_STATE.REGISTER } });
        };

        const navigateToProfile = () => {
            setStepIndex(TAB_INDEX.PROFILE);
        };
        const navigateToNotification = () => {
            setStepIndex(TAB_INDEX.NOTIFICATION);
        };
        return {
            left: <div className={cx('header_left')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>,
            right: <div className={cx('header_right')}>
                {/* {!sessionManager.accessToken ? <> */}
                {!sessionManager.accessToken ? /*tắt đăng nhập cần pass*/
                    <>
                        <Button
                            label={Languages.auth.login}
                            buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
                            isLowerCase
                            onPress={navigateToLogin}
                            containButtonStyles={'x10'}
                        />
                        <Button
                            label={Languages.auth.register}
                            buttonStyle={BUTTON_STYLES.GREEN}
                            isLowerCase
                            onPress={navigateToRegister}
                        />
                    </>
                    :
                    <>
                        <img src={IcNotification} className={cx('icon-menu')} onClick={navigateToNotification} />
                        <div className={cx('row center')}>
                            <div className={cx('avatar-container')}>
                                <img src={userManager.userInfo?.avatar_user || ImgNoAvatar} className={cx('img-avatar')} onClick={navigateToProfile} />
                                {renderIconVerify}
                            </div>
                            <span className={cx('text-full-name')}>{userManager.userInfo?.full_name}</span>
                            <img src={IcLogout} className={cx('icon-small')} onClick={onLogOut} />
                        </div>
                    </>
                }
            </div>
        };
    }, [navigate, onLogOut, renderIconVerify, userManager.userInfo, toggle]);

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [OperationsSlot, position]);

    const getStepLayout = useCallback((index: number) => {
        switch (index) {
            case TAB_INDEX.INVESTMENT:
                return <InvestTab numberTabs={numberTabs} isFocus={focus} receptionData={receptionData} />;
            case TAB_INDEX.MANAGEMENT:
                return <Manage />;
            case TAB_INDEX.NEWS:
                return <News />;
            case TAB_INDEX.PROFILE:
                return <Profile numberTabs={numberTabs} isFocus={focus} />;
            case TAB_INDEX.NOTIFICATION:
                return <Notification keyTabs={0} />;
            case TAB_INDEX.INTRO:
            default:
                return <Intro />;
        }
    }, [numberTabs, focus, receptionData]);

    const tabs = useMemo(() => {
        return ([
            {
                label: Languages.tabs[0],
                key: `${TAB_INDEX.INTRO}`,
                children: getStepLayout(TAB_INDEX.INTRO)
            },
            {
                label: Languages.tabs[1],
                key: `${TAB_INDEX.INVESTMENT}`,
                children: getStepLayout(TAB_INDEX.INVESTMENT)
            },
            userManager.userInfo && {
                label: Languages.tabs[2],
                key: `${TAB_INDEX.MANAGEMENT}`,
                children: getStepLayout(TAB_INDEX.MANAGEMENT)
            },
            {
                label: Languages.tabs[3],
                key: `${TAB_INDEX.NEWS}`,
                children: getStepLayout(TAB_INDEX.NEWS)
            },
            userManager.userInfo && {
                label: Languages.tabs[4],
                key: `${TAB_INDEX.PROFILE}`,
                children: getStepLayout(TAB_INDEX.PROFILE)
            },
            userManager.userInfo && {
                label: Languages.tabs[5],
                key: `${TAB_INDEX.NOTIFICATION}`,
                children: getStepLayout(TAB_INDEX.NOTIFICATION)
            }
        ] as TabsModel[]);
    }, [getStepLayout, userManager.userInfo]);

    const onChangeTab = (key: string) => {
        setStepIndex(parseInt(key));
    };

    const onShowMenu = useCallback(() => {
        refDrawer.current?.show();
    }, []);

    const onClosePopup = useCallback(() => {
        refPopupLogout.current?.hideModal();
    }, []);

    const onSuccess = useCallback(() => {
        setStepIndex(0);
        userManager.updateUserInfo(undefined);
        sessionManager.logout();
        setToggle(last => !last);
        refPopupLogout.current?.hideModal();
    }, [userManager]);

    return (
        <>
            {isMobile
                ? <div className={cx('container')}>
                    <div className={cx('header')}>
                        <img src={IcLogo} className={cx('icon-tienngay')} />
                        <img src={IcMenu} className={cx('icon-menu')} onClick={onShowMenu} />
                    </div>
                    {getStepLayout(stepIndex)}
                    <MenuMobile ref={refDrawer} onChangeStep={onChangeMenu} data={TabsMenuHeader} />
                </div>
                : <Tabs
                    defaultActiveKey={'0'}
                    activeKey={`${stepIndex}`}
                    onChange={onChangeTab}
                    items={tabs}
                    tabBarExtraContent={slot}
                    centered
                    tabBarStyle={{ marginBottom: 0 }}
                    color={COLORS.GREEN}
                    className={cx('tabs-web-container')}
                />
            }
            <PopupBaseCenterScreen
                ref={refPopupLogout}
                labelSuccess={Languages.common.agree}
                labelCancel={Languages.common.cancel}
                hasTwoButton
                onClose={onClosePopup}
                onSuccessPress={onSuccess}
                icon={IcPopupAuth}
                hasCloseIc
                buttonLeftStyle={BUTTON_STYLES.GREEN}
                buttonRightStyle={BUTTON_STYLES.RED}
                title={Languages.home.logout}
            />
        </>
    );
});

export default Home;
