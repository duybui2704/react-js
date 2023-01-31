import classNames from 'classnames/bind';
import { ItemProps } from 'models/common';
import React, { useCallback, useState } from 'react';
import styles from './tabs-button-bar.module.scss';

const cx = classNames.bind(styles);

function TabsButtonBar({ dataTabs, defaultTabs, isMobile, onChangeText }:
    {
        dataTabs: ItemProps[] | any, defaultTabs?: string, isMobile: boolean, onChangeText?: (tabIndex: number, tabValue: string) => void
    }
) {
    const [tabsName, setTabsName] = useState<string>(defaultTabs || '0');

    const renderTabsView = useCallback(() => {
        return (
            <div className={cx(isMobile ? 'all-tabs-component-mobile' : 'all-tabs-component')}>
                <div className={cx(isMobile ? 'tabs-component-mobile' : 'tabs-component')}>
                    <div className={cx(isMobile ? 'tabs-container-mobile' : 'tabs-container')} >
                        {dataTabs?.map((item: ItemProps, index: number) => {
                            const onChange = () => {
                                setTabsName(`${index}`);
                                onChangeText?.(index, `${item?.value}`);
                            };
                            return <span key={index} className={cx(tabsName === `${index}` ? 'tabs-text-active' : 'tabs-text')} onClick={onChange}>{item?.text}</span>;
                        })}
                    </div>
                </div>
            </div>
        );
    }, [dataTabs, isMobile, onChangeText, tabsName]);

    return renderTabsView();
}

export default TabsButtonBar;
