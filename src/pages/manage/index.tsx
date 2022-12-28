import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import useIsMobile from 'hooks/use-is-mobile.hook';
import Report from 'pages/report';
import React, { useMemo } from 'react';
import { COLORS } from 'theme/colors';
import History from './history';
import styles from './manage.module.scss';
import Transaction from './transaction';

const cx = classNames.bind(styles);

function Manage() {
    const isMobile = useIsMobile();
    const manageTabs = useMemo(() => {
        return [
            {
                label: Languages.manageTabs[0],
                key: '0',
                children: <History />
            },
            {
                label: Languages.manageTabs[1],
                key: '1',
                children: <Report />
            },
            {
                label: Languages.manageTabs[2],
                key: '2',
                children: <Transaction />
            }
        ];
    }, []);

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={cx('page-container')}>
            <Tabs
                defaultActiveKey='0'
                onChange={onChange}
                items={manageTabs}
                tabBarStyle={{ marginBottom: 0, width: isMobile ? '100%' : '80%', alignSelf: 'center', paddingInline: 16, borderBottom: 'none' }}
                color={COLORS.GREEN}
            />
        </div>
    );
}

export default Manage;
