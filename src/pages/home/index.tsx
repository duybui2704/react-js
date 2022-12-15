import { Tabs } from 'antd';
import IcLogo from 'assets/image/img_logo.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { PackageInvest } from 'models/invest';
import Intro from 'pages/intro';
import Investment from 'pages/investment';
import InvestDetail from 'pages/investment/invest-detail';
import Report from 'pages/report';
import Transaction from 'pages/transaction';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { COLORS } from 'theme/colors';
import styles from './home.module.scss';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

function Home() {
    const navigate = useNavigate();

    const [position] = useState<PositionType[]>(['left', 'right']);
    const [showInvestScreen, setShowInvestScreen] = useState<boolean>(true);
    const OperationsSlot: Record<PositionType, React.ReactNode> = useMemo(() => {

        const navigateToLogin = () => {
            navigate(Paths.login);
        };

        const navigateToRegister = () => {
            navigate(Paths.register);
        };

        return {
            left: <div className={cx('header_left')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>,
            right: <div className={cx('header_right')}>
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
            </div>
        };
    }, []);

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [OperationsSlot, position]);

    const onNavigateDetail = useCallback((data: PackageInvest) => {
        setShowInvestScreen(false);
    }, []);

    const onNavigateInvest = useCallback(() => {
        setShowInvestScreen(true);
    }, []);

    const tabs = useMemo(() => {
        return [
            {
                label: Languages.tabs[0],
                key: '0',
                children: <Intro />
            },
            {
                label: Languages.tabs[1],
                key: '1',
                children: showInvestScreen ? <Investment onNavigateDetail={onNavigateDetail} /> : <InvestDetail onNavigateInvest={onNavigateInvest}/>
            },
            {
                label: Languages.tabs[2],
                key: '2',
                children: <Report />
            },
            {
                label: Languages.tabs[3],
                key: '3',
                children: <Transaction />
            }
        ];
    }, [onNavigateDetail, onNavigateInvest, showInvestScreen]);

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={cx('page')}>
            <Tabs
                defaultActiveKey="0"
                onChange={onChange}
                items={tabs}
                tabBarExtraContent={slot}
                centered
                tabBarStyle={{ marginBottom: 0 }}
                color={COLORS.GREEN}
            />
        </div>
    );
}

export default Home;
