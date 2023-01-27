import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { TabsItemManage } from 'components/tabs-history';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { PackageInvest } from 'models/invest';
import InvestDetail from 'pages/investment/invest-detail';
import Report from 'pages/manage/report';
import React, { useCallback, useMemo, useState } from 'react';
import ChildTabsHistory from './child-tabs-history';
import ChildTabsTransaction from './child-tabs-transaction';
import styles from './manage.module.scss';

const cx = classNames.bind(styles);

const Manage = observer(({ defaultTabs }:
    {
        defaultTabs?: number
    }
) => {
    const [tabsName, setTabsName] = useState<number>(defaultTabs || 0);
    const isMobile = useIsMobile();

    const [tabNameHistory, setTabNameHistory] = useState<number>(0);
    const [tabNameBackHistory, setTabNameBackHistory] = useState<number>(0);
    const [investPackage, setInvestPackage] = useState<PackageInvest>();

    const onNavigateDetail = useCallback((data: PackageInvest, tabs: number) => {
        setTabNameHistory(last => last + 1);
        setInvestPackage(data);
        setTabNameBackHistory(tabs);
    }, []);

    const goBack = useCallback(() => {
        setTabNameHistory(0);
    }, []);

    const renderView = useCallback((_tab?: any) => {
        return (
            <>
                {_tab?.map((item: TabsItemManage, index: number) => {
                    return <div key={index}>
                        {
                            tabsName === index && item?.renderComponent
                        }
                    </div>;
                })}
            </>
        );
    }, [tabsName]);

    const renderTabsView = useCallback(() => {
        const TabsManage = [
            {
                id: '1',
                renderComponent: <ChildTabsHistory onNextScreen={onNavigateDetail} tabsNumber={tabNameBackHistory} />,
                title: Languages.manageTabs?.[0]
            },
            {
                id: '2',
                renderComponent: <Report />,
                title: Languages.manageTabs?.[1]
            },
            {
                id: '3',
                renderComponent: <ChildTabsTransaction keyTabs={0} />,
                title: Languages.manageTabs?.[2]
            }
        ];
        return (
            <div className={cx('all-tabs-component')}>
                <div className={cx(isMobile ? 'tabs-component-mobile' : 'tabs-component')}>
                    <div className={cx(isMobile ? 'tabs-container-mobile' : 'tabs-container')} >
                        {TabsManage?.map((item: TabsItemManage, index: number) => {
                            const onChange = () => {
                                setTabsName(index);
                            };
                            return <span key={index} className={cx(tabsName === index ? 'tabs-text-active' : 'tabs-text')} onClick={onChange}>{item?.title}</span>;
                        })}
                    </div>
                </div>
                {renderView(TabsManage)}
            </div>
        );
    }, [isMobile, onNavigateDetail, renderView, tabNameBackHistory, tabsName]);

    const renderCustomTab = useMemo(() => {
        switch (tabNameHistory) {
            case 0:
                return renderTabsView();
            case 1:
                return <InvestDetail onBackScreen={goBack} investPackage={investPackage} isDetailHistory tabDetailHistory={tabNameBackHistory} />;
            default:
                break;
        }
    }, [goBack, investPackage, renderTabsView, tabNameBackHistory, tabNameHistory]);

    return <>{renderCustomTab}</>;
});

export default Manage;
