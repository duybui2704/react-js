import { Tabs } from 'antd';
import IcLogo from 'assets/image/img_logo.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Intro from 'pages/intro';
import InvestTab from 'pages/investment/invest-tab';
import News from 'pages/news';
import Report from 'pages/report';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { COLORS } from 'theme/colors';
import styles from './home.module.scss';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

function Home() {
    const navigate = useNavigate();

    const [position] = useState<PositionType[]>(['left', 'right']);
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
    }, [navigate]);

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [OperationsSlot, position]);

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
                children: <InvestTab />
            },
            {
                label: Languages.tabs[2],
                key: '2',
                children: <Report />
            },
            {
                label: Languages.tabs[3],
                key: '3',
                children: <News />
            }
        ];
    }, []);

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
