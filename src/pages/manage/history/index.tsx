import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import HistoryTabs from 'components/tabs-history';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { PackageInvest } from 'models/invest';
import InvestDetail from 'pages/investment/invest-detail';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChildTabsHistory from './child-tabs-history';
import styles from './history.module.scss';

const cx = classNames.bind(styles);


function History() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    // const { apiServices } = useAppStore();

    const [tabName, setTabName] = useState<string>('1');
    const [investPackage, setInvestPackage] = useState<PackageInvest>();

    const onNavigateDetail = useCallback((data: PackageInvest) => {
        setTabName(`${Number(tabName) + 1}`);
        setInvestPackage(data);
    }, [tabName]);

    const onNextPage = useCallback(() => {
        setTabName(`${Number(tabName) + 1}`);
    }, [tabName]);

    const goBack = useCallback(() => {
        setTabName(`${Number(tabName) - 1}`);
    }, [tabName]);

    const TabsHistory = [
        {
            id: '1',
            renderComponent: <ChildTabsHistory isInvesting={true} onNextScreen={onNavigateDetail}/>,
            title: Languages.historyTabs?.[0]
        },
        {
            id: '2',
            renderComponent: <ChildTabsHistory isInvesting={false} onNextScreen={onNavigateDetail}/>,
            title: Languages.historyTabs?.[1]
        }
    ];

    const renderCustomTab = useCallback(() => {
        switch (tabName) {
            case '1':
                return <HistoryTabs dataTabs={TabsHistory} isMobile={isMobile}/>;
            case '2':
                return <InvestDetail onBackScreen={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
            default:
                break;
        }
    }, [goBack, investPackage, isMobile, onNextPage, tabName]);

    return (
        <div className={cx(isMobile ? 'page-container-mobile' : 'page-container')}>
            <div className={cx(isMobile ? 'all-content-container-mobile' : 'all-content-container')}>
                {/* <HistoryTabs dataTabs={TabsHistory} isMobile={isMobile} /> */}
                {renderCustomTab()}
            </div>
        </div>
    );
}

export default History;
