import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import Footer from 'components/footer';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { observer } from 'mobx-react';
import { TabNotification } from 'pages/__mocks__/manage';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './notification.module.scss';
import IcFlower from 'assets/icon/ic_red_small_flower_money.svg';
import { NotificationTotalModel } from 'models/notification';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { Notify } from 'models/invest';

const cx = classNames.bind(styles);
const IMG_TAG = 'display: block; width: 100%;';

interface KeyValueModel {
    label?: string;
    value?: any;
    id?: any;
    type?: any;
}

const Notification = observer(({ keyTabs }: { keyTabs: number }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices, userManager, common } = useAppStore();
    // const { scrollTop } = useWindowScrollPositions(cx('bottom-container'));

    const [tabName, setTabName] = useState<number>(keyTabs);

    const [dataNotificationList, setDataNotificationList] = useState<any[]>([]);

    const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(0);

    const [categories, setCategories] = useState<KeyValueModel[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<KeyValueModel>();

    useEffect(() => {
        getUnreadNotify();
        getCategories();
    }, []);

    useEffect(() => {
        getNotify();
    }, [tabName]);

    const onChangeTab = useCallback((tabIndex: number) => {
        if (tabName !== tabIndex) {
            setTabName(tabIndex);
        }
    }, [tabName]);

    const getUnreadNotify = useCallback(async () => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getUnreadNotify() as any;
            if (res.success) {
                const data = res.data as NotificationTotalModel;
                common.setAppConfig({ ...common.appConfig, total_un_read: data?.total_unRead });
            }
        }
    }, [apiServices.notification, common, userManager.userInfo]);

    const getCategories = useCallback(async () => {// get tabs name notify page
        const resCate = await apiServices.notification.getNotificationCategories() as any;

        if (resCate.success && resCate.data) {
            setCategories(Object.keys(resCate.data).map((key, index) => {
                const cate = {
                    id: key,
                    label: resCate.data[key],
                    value: index
                };
                if (index === 0) {
                    setSelectedFilter(cate);
                }
                return cate;
            }));
        }
    }, [apiServices.notification]);

    const getNotify = useCallback(async (loadmore?: boolean) => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getNotify(PAGE_SIZE_INVEST, offset || 0, tabName + 1) as any;
            if (res.success) {
                const data = res.data as Notify[];
                setDataNotificationList(data);
                // ever load more
            }
        }
    }, [apiServices.notification, offset, tabName, userManager.userInfo]);

    const renderNotificationList = useMemo(() => {
        return (
            <div className={cx('notify-container')}>
                {dataNotificationList.map((item: Notify, index: number) => {
                    const onRead = async () => {
                        if (item?.status === 1) {
                            const res = await apiServices.invest.getNotifyUpdateRead(item?.id) as any;
                            if (res.success) {
                                // setData(last => last.map(it => {
                                //     if (item.id == it.id) {
                                //         it.status = 2;
                                //     }
                                //     return it;
                                // }));
                                getUnreadNotify;
                                if (item.link) {
                                    // Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: ENUM_INVEST_STATUS.INVESTING, id: `${item?.action_id}` });
                                }
                            }
                        }
                        if (item.link) {
                            // Navigator.navigateToDeepScreen([TabsName.homeTabs], ScreenName.detailInvestment, { status: ENUM_INVEST_STATUS.INVESTING, id: `${item?.action_id}` });
                        }
                    };
                    return (
                        <div className={cx(item?.status === 1 ? 'item-notify-un-read-container' : 'item-notify-container')} key={index}>
                            <span className={cx('title-item-notify')}>{item?.title}</span>
                            <span className={cx('text-date-item-notify')}>{new Date(Number(item?.updated_at) * 1000).toLocaleString()}</span>
                            <div className={cx('item-notify-content-container')}>
                                <img src={item?.image || IcFlower} className={cx('image')} />
                                <span
                                    className={cx('text-describe-item-notify')}
                                    dangerouslySetInnerHTML={{ __html: item?.message.replace(IMG_TAG, '') || '' }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [apiServices.invest, dataNotificationList, getUnreadNotify]);

    return (
        <div className={cx('page')}>
            <div className={cx('notify-header-container')}>
                <span className={cx('notify-header-text')}>{Languages.notification.titleHeader}</span>
                <span className={cx('notify-count-un-read')}>{`${common.appConfig?.total_un_read}${Languages.notification.newNotify}`}</span>
            </div>
            <TabsButtonBar dataTabs={TabNotification} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${keyTabs}`} />
            <div className={cx('page-content', 'padding')}>
                {renderNotificationList}
                <Footer />
            </div>

        </div>
    );
});

export default Notification;
