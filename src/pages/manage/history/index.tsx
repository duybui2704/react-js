import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import HistoryTabs from 'components/tabs-history';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChildTabsHistory from './child-tabs-history';
import styles from './history.module.scss';

const cx = classNames.bind(styles);

function History() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();
    const TabsHistory = [
        {
            id: '1',
            renderComponent: <ChildTabsHistory isInvesting={true} />,
            title: Languages.historyTabs?.[0]
        },
        {
            id: '2',
            renderComponent: <ChildTabsHistory isInvesting={false} />,
            title: Languages.historyTabs?.[1]
        }

    ];
    return (
        <div className={cx(isMobile ? 'page-container-mobile' : 'page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                <HistoryTabs dataTabs={TabsHistory} isMobile={isMobile}/>
            </div>
        </div>
    );
}

export default History;
