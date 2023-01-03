import classNames from 'classnames/bind';
import React, { useCallback, useState } from 'react';
import styles from './tabs-button-bar.module.scss';

const cx = classNames.bind(styles);

function TabsButtonBar({ dataTabs, defaultTabs, isMobile, onChangeText }:
    {
        dataTabs?: string[], defaultTabs?: string, isMobile: boolean, onChangeText?: (text: number) => void
    }
) {
    const [tabsName, setTabsName] = useState<string>(defaultTabs || '0');

    const renderTabsView = useCallback(() => {
        return (
            <div className={cx(isMobile ? 'all-tabs-component-mobile' : 'all-tabs-component')}>
                <div className={cx(isMobile ? 'tabs-component-mobile' : 'tabs-component')}>
                    <div className={cx(isMobile ? 'tabs-container-mobile' : 'tabs-container')} >
                        {dataTabs?.map((item: string, index: number) => {
                            const onChange = () => {
                                setTabsName(`${index}`);
                                onChangeText?.(index);
                            };
                            return <span key={index} className={cx(tabsName === `${index}` ? 'tabs-text-active' : 'tabs-text')} onClick={onChange}>{item}</span>;
                        })}
                    </div>
                </div>
            </div>
        );
    }, [dataTabs, isMobile, onChangeText, tabsName]);

    return renderTabsView();
}

export default TabsButtonBar;
