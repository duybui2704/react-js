import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import Footer from 'components/footer';
import TabsButtonBar from 'components/tabs-button-bar';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './notification.module.scss';
import IcFlower from 'assets/icon/ic_red_small_flower_money.svg';
import { NotificationTotalModel } from 'models/notification';
import { PAGE_SIZE_INVEST } from 'commons/configs';
import { Notify } from 'models/invest';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import ScrollTopComponent from 'components/scroll-top';
import { NOTIFY_STATE } from 'commons/constants';
import dateUtils from 'utils/date-utils';

const cx = classNames.bind(styles);
const IMG_TAG = 'display: block; width: 100%;';

interface KeyValueModel {
    text?: string;
    value?: number;
    id?: string;
}

const Notification = observer(({ keyTabs }: { keyTabs: number }) => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { apiServices, userManager, common } = useAppStore();
    const { scrollTop } = useWindowScrollPositions(cx('page-content'));

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

    const handleScrollToTop = () => {
        document.getElementsByClassName(cx('page-content'))[0].scrollTo({ behavior: 'smooth', top: 0 });
    };

    const onChangeTab = useCallback((tabIndex: number) => {
        if (tabName !== tabIndex) {
            setTabName(tabIndex);
            handleScrollToTop();
            setOffset(0);
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

    const getCategories = useCallback(async () => {
        const resCate = await apiServices.notification.getNotificationCategories() as any;
        if (resCate.success && resCate.data) {
            setCategories(Object.keys(resCate.data).map((key: string, index: number) => {
                const cate = {
                    id: key,
                    text: resCate.data[key],
                    value: index
                };
                if (index === 0) {
                    setSelectedFilter(cate);
                }
                return cate;
            }));
        }
    }, [apiServices.notification]);

    const getNotify = useCallback(async (loadMore?: boolean) => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getNotify(
                PAGE_SIZE_INVEST,
                loadMore ? offset : 0,
                tabName + 1
            ) as any;
            if (res.success) {
                const data = res.data as Notify[];
                setCanLoadMore(res?.data?.length === PAGE_SIZE_INVEST);
                setOffset(last => loadMore ? (last + PAGE_SIZE_INVEST) : PAGE_SIZE_INVEST);
                if (loadMore) {
                    setDataNotificationList(last => [...last, ...data]);
                } else {
                    setDataNotificationList(data);
                }
            }
        }
    }, [apiServices.notification, offset, tabName, userManager.userInfo]);

    const loadMoreNotify = useCallback(() => {
        getNotify(true);
    }, [getNotify]);

    const renderNotificationList = useCallback((dataNotifyList?: Notify[]) => {
        return (
            <div className={cx('notify-container')}>
                {dataNotifyList?.map((item: Notify, index: number) => {
                    const onMarkRead = async () => {
                        if (item?.status === NOTIFY_STATE.UN_READ) {
                            const res = await apiServices.invest.getNotifyUpdateRead(item?.id) as any;
                            if (res.success) {
                                setDataNotificationList(last => last.map((itemChild: Notify) => {
                                    if (item.id === itemChild.id) {
                                        itemChild.status = NOTIFY_STATE.READ;
                                    }
                                    return itemChild;
                                }));
                                getUnreadNotify();
                                if (item.link) {
                                    // navigate page of link 
                                }
                            }
                        }
                        if (item.link) {
                            // navigate page of link 
                        }
                    };
                    return (
                        <div
                            className={cx(item?.status === NOTIFY_STATE.UN_READ ? 'item-notify-un-container' : 'item-notify-read-container')}
                            key={`${item?.id}${index}`}
                            onClick={onMarkRead}
                        >
                            <span className={cx('title-item-notify')}>{item?.title}</span>
                            <span className={cx('text-date-item-notify')}>{dateUtils.formatDatePicker(item?.updated_at)}</span>
                            <div className={cx('item-notify-content-container')}>
                                <img src={item?.image || IcFlower} className={cx('image')} />
                                <span
                                    className={cx('text-describe-item-notify')}
                                    dangerouslySetInnerHTML={{ __html: item?.message.replace(IMG_TAG, '') || '' }} />
                            </div>
                        </div>
                    );
                })}
                {canLoadMore &&
                    <Button
                        buttonStyle={BUTTON_STYLES.GREEN}
                        fontSize={20}
                        width={isMobile ? 100 : 40}
                        labelStyles={cx('label-button-see-more')}
                        containButtonStyles={cx('button-see-more-container')}
                        label={Languages.notification.seeMore}
                        onPress={loadMoreNotify}
                        isLowerCase />
                }
            </div>
        );
    }, [apiServices.invest, canLoadMore, getUnreadNotify, isMobile, loadMoreNotify]);

    return (
        <div className={cx('page')}>
            <div className={cx('header-container')}>
                <div className={cx('notify-header-container')}>
                    <span className={cx('notify-header-text')}>{Languages.notification.titleHeader}</span>
                    <span className={cx('notify-count-un-read')}>{`${common.appConfig?.total_un_read}${Languages.notification.newNotify}`}</span>
                </div>
                <TabsButtonBar dataTabs={categories} isMobile={isMobile} onChangeText={onChangeTab} defaultTabs={`${keyTabs}`} />
            </div>
            <div className={cx('page-content')}>
                {renderNotificationList(dataNotificationList)}
                <Footer />
            </div>
            <ScrollTopComponent scrollTopHeight={scrollTop} isMobile={isMobile} onScrollTop={handleScrollToTop} />
        </div>
    );
});

export default Notification;
