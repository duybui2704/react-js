import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { TabsItemManage } from 'components/tabs-history';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { PackageInvest } from 'models/invest';
import InvestDetail from 'pages/investment/invest-detail';
import Report from 'pages/manage/report';
import React, { useCallback, useMemo, useState } from 'react';
import ChildTabsHistory from './child-tabs-history';
import styles from './manage.module.scss';
import Transaction from './transaction';

const cx = classNames.bind(styles);

function Manage({ defaultTabs }:
    {
        defaultTabs?: string
    }
) {
    const [tabsName, setTabsName] = useState<string>(defaultTabs || '0');
    const isMobile = useIsMobile();

    const [tabNameHistory, setTabNameHistory] = useState<string>('1');
    const [investPackage, setInvestPackage] = useState<PackageInvest>();

    const onNavigateDetail = useCallback((data: PackageInvest) => {
        setTabNameHistory(`${Number(tabNameHistory) + 1}`);
        setInvestPackage(data);
    }, [tabNameHistory]);

    const onNextPage = useCallback(() => {
        setTabNameHistory(`${Number(tabNameHistory) + 1}`);
    }, [tabNameHistory]);

    const goBack = useCallback(() => {
        setTabNameHistory(`${Number(tabNameHistory) - 1}`);
    }, [tabNameHistory]);

    const renderView = useCallback((_tab?: any) => {
        return (
            <>
                {_tab?.map((item: TabsItemManage, index: number) => {
                    return <div key={index}>
                        {
                            tabsName === `${index}` && item?.renderComponent
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
                renderComponent: <ChildTabsHistory onNextScreen={onNavigateDetail} />,
                title: Languages.manageTabs?.[0]
            },
            {
                id: '2',
                renderComponent: <Report />,
                title: Languages.manageTabs?.[1]
            },
            {
                id: '3',
                renderComponent: <Transaction />,
                title: Languages.manageTabs?.[2]
            }
        ];
        return (
            <div className={cx('all-tabs-component')}>
                <div className={cx(isMobile ? 'tabs-component-mobile' : 'tabs-component')}>
                    <div className={cx(isMobile ? 'tabs-container-mobile' : 'tabs-container')} >
                        {TabsManage?.map((item: TabsItemManage, index: number) => {
                            const onChange = () => {
                                setTabsName(`${index}`);
                            };
                            return <span key={index} className={cx(tabsName === `${index}` ? 'tabs-text-active' : 'tabs-text')} onClick={onChange}>{item?.title}</span>;
                        })}
                    </div>
                </div>
                {renderView(TabsManage)}
            </div>
        );
    }, [isMobile, onNavigateDetail, renderView, tabsName]);

    const renderCustomTab = useMemo(() => {
        switch (tabNameHistory) {
            case '1':
                return renderTabsView();
            case '2':
                return <InvestDetail onBackScreen={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
            default:
                break;
        }
    }, [goBack, investPackage, onNextPage, renderTabsView, tabNameHistory]);

    return <>{renderCustomTab}</>;
}

export default Manage;
