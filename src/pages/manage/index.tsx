import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import useIsMobile from 'hooks/use-is-mobile.hook';
import InvestDetail from 'pages/investment/invest-detail';
import Report from 'pages/manage/report';
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
            },
            {
                label: '',
                key: '3',
                children: <InvestDetail onBackScreen={() => { }} onNextScreen={() => { }} investPackage={undefined} />
            }
        ];
    }, []);

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className={cx('page-wrap-container')}>
            <Tabs
                defaultActiveKey='0'
                onChange={onChange}
                items={manageTabs}
                tabBarStyle={{ marginBottom: 0, width: isMobile ? '100%' : '80%', alignSelf: 'center', paddingInline: 16 }}
                color={COLORS.GREEN}
            />
        </div>
    );
}

export default Manage;
