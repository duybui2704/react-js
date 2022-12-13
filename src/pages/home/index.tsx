import { Tabs, ConfigProvider } from 'antd';
import IcLogo from 'assets/image/img_logo.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import Intro from 'pages/intro';
import Investment from 'pages/investment';
import Report from 'pages/report';
import Transaction from 'pages/transaction';
import React, { useMemo, useState } from 'react';
import { COLORS } from 'theme/colors';
import styles from './home.module.scss';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

function Home() {
    const [position] = useState<PositionType[]>(['left', 'right']);
    const OperationsSlot: Record<PositionType, React.ReactNode> = useMemo(() => {
        return {
            left: <div className={cx('header_left')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>,
            right: <div className={cx('header_right')}>
                <Button
                    label={Languages.auth.login}
                    buttonStyle={BUTTON_STYLES.GREEN_WHITE}
                    isLowerCase
                />
                <Button
                    label={Languages.auth.register}
                    buttonStyle={BUTTON_STYLES.GREEN}
                    isLowerCase
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
                children: <Investment />
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
    }, []);

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={cx('page')}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: COLORS.GREEN,
                        lineWidth: 0
                    }
                }}>
                <Tabs
                    defaultActiveKey="0"
                    onChange={onChange}
                    items={tabs}
                    tabBarExtraContent={slot}
                    centered
                    tabBarStyle={{ marginBottom: 0 }}
                    color={COLORS.GREEN}
                />
            </ConfigProvider>
        </div>
    );
}

export default Home;
