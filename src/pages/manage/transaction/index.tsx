import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import HistoryTabs, { TabsItemManage } from 'components/tabs-history';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChildTabsTransaction from './child-tabs-transaction';
import styles from './transaction.module.scss';

const cx = classNames.bind(styles);

function Transaction() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();

    const TabsTransaction = [
        {
            id: '1',
            renderComponent: <ChildTabsTransaction keyTabs={'1'} />,
            title: Languages.transactionTabs?.[0]
        },
        {
            id: '2',
            renderComponent: <ChildTabsTransaction keyTabs={'2'} />,
            title: Languages.transactionTabs?.[1]
        },
        {
            id: '3',
            renderComponent: <ChildTabsTransaction keyTabs={'3'} />,
            title: Languages.transactionTabs?.[2]
        }

    ];

    return (
        <div className={cx(isMobile ? 'page-container-mobile' : 'page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                <HistoryTabs dataTabs={TabsTransaction} />
            </div>
        </div>
    );
}

export default Transaction;
