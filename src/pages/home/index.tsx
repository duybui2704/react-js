import { Tabs } from 'antd';
import IcLogo from 'assets/image/img_logo.jpeg';
import IcMenu from 'assets/image/ic_menu.svg';
import IcDown from 'assets/image/ic_down.svg';
import IcNotification from 'assets/image/ic_notification.svg';
import ImgNoAvatar from 'assets/image/img_no_avatar.jpg';

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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { COLORS } from 'theme/colors';
import styles from './home.module.scss';
import { DrawerBaseActions } from 'components/drawer-mobile-account';
import { dataMenu } from 'pages/__mocks__/menu';
import MenuMobile from 'components/menu-mobile';
import sessionManager from 'managers/session-manager';
import { useAppStore } from 'hooks';
import { toJS } from 'mobx';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

function Home() {
    const navigate = useNavigate();
    const { userManager } = useAppStore();
    const isMobile = useIsMobile();
    const [steps, setSteps] = useState<number>(1);
    const [toggle, setToggle] = useState<boolean>(false);

    const refDrawer = useRef<DrawerBaseActions>(null);

    const [position] = useState<PositionType[]>(['left', 'right']);

    const onTabs = useCallback((index: number) => {
        setSteps(index);
        setToggle(last => !last);
    }, []);

    const OperationsSlot: Record<PositionType, React.ReactNode> = useMemo(() => {

        const navigateToLogin = () => {
            navigate(Paths.auth, { state: { name: Languages.auth.login } });
        };

        const navigateToRegister = () => {
            navigate(Paths.auth, { state: { name: Languages.auth.register } });
        };

        const navigateToProfile = () => {
            navigate(Paths.profile);
        };

        return {
            left: <div className={cx('header_left')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>,
            right: <div className={cx('header_right')}>
                {!sessionManager.accessToken ? <>
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
                        <img src={IcNotification} className={cx('icon-menu')} />
                        <div className={cx('row p12 center')} onClick={navigateToProfile}>
                            <img src={userManager.userInfo?.avatar || ImgNoAvatar} className={cx('img-avatar')} />
                            <span className={cx('text-black h6 medium x10')}>{userManager.userInfo?.full_name}</span>
                            <img src={IcDown} className={cx('icon-small')} />
                        </div>
                    </>
                }
            </div>
        };
    }, [navigate, userManager.userInfo?.avatar, userManager.userInfo?.full_name]);

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [OperationsSlot, position]);

    const tabs = useMemo(() => {
        if (sessionManager.accessToken) {
            return [
                {
                    label: Languages.tabs[0],
                    key: '0',
                    children: <Intro />
                },
                {
                    label: Languages.tabs[1],
                    key: '1',
                    children: <InvestTab />
                },
                {
                    label: Languages.tabs[2],
                    key: '2',
                    children: <Manage />
                },
                {
                    label: Languages.tabs[3],
                    key: '3',
                    children: <News />
                }
            ];
        } else {
            return [
                {
                    label: Languages.tabs[0],
                    key: '0',
                    children: <Intro />
                },
                {
                    label: Languages.tabs[1],
                    key: '1',
                    children: <InvestTab />
                },
                {
                    label: Languages.tabs[3],
                    key: '3',
                    children: <News />
                }
            ];
        }
    }, []);

    const onChange = (key: string) => {
        console.log(key);
    };

    const renderBody = useMemo(() => {
        switch (steps) {
            case 1:
                return <Intro />;
            case 2:
                return <InvestTab />;
            case 3:
                return <Manage />;
            case 4:
                return <News />;
            default:
                return <Profile />;
        }
    }, [steps]);

    const onShowMenu = useCallback(() => {
        refDrawer.current?.show();
    }, []);

    return (
        <>
            {isMobile
                ? <div className={cx('container')}>
                    <div className={cx('header')}>
                        <img src={IcLogo} className={cx('icon-tienngay')} />
                        <img src={IcMenu} className={cx('icon-menu')} onClick={onShowMenu} />
                    </div>
                    {renderBody}
                    <MenuMobile ref={refDrawer} onChangeStep={onTabs} data={dataMenu} />
                </div>
                : <Tabs
                    defaultActiveKey={'0'}
                    onChange={onChange}
                    items={tabs}
                    tabBarExtraContent={slot}
                    centered
                    tabBarStyle={{ marginBottom: 0 }}
                    color={COLORS.GREEN}

                />
            }
        </>
    );
}

export default Home;
