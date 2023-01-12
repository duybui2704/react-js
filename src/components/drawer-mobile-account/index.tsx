
import { Drawer } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import ImgNoAvatar from 'assets/image/img_no_avatar.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';

import { UserInfoModel } from 'models/user-model';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import styles from './drawer-mobile-account.module.scss';
import { ItemScreenModel } from 'models/profile';
import { useAppStore } from 'hooks';
import { COLOR_TRANSACTION } from 'commons/constants';

type DrawerBaseProps = {
    onClose?: () => any;
    onChangeStep?: (tabs: number) => void;
    onBackdropPress?: () => void;
    onPressStatus?: () => void;
    data: ItemScreenModel[]
};

export type DrawerBaseActions = {
    show: () => void;
    hide: () => void;
};

const cx = classNames.bind(styles);

const DrawerMobileAccount = forwardRef<DrawerBaseActions, DrawerBaseProps>(
    ({ onChangeStep, onClose, onBackdropPress, onPressStatus, data
    }: DrawerBaseProps, ref) => {
        const [visible, setVisible] = useState(false);
        const [info, setInfo] = useState<UserInfoModel>();
        const { userManager } = useAppStore();
        const [tabs, setTabs] = useState<number>(1);

        useEffect(() => {
            setInfo(userManager.userInfo);
        }, [userManager.userInfo]);

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        const show = useCallback(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const handlePressStatus = useCallback(() => {
            onPressStatus?.();
            setVisible(false);
        }, [onPressStatus]);

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const renderStatusAcc = useMemo(() => {
            switch (info?.tinh_trang?.color) {
                case COLOR_TRANSACTION.RED:
                    return (
                        <div className={cx('un-verify-container', 'hover-component')}>
                            <span className={cx('un-verify-text')} onClick={handlePressStatus}>{info?.tinh_trang?.status}</span>
                        </div>
                    );
                case COLOR_TRANSACTION.GREEN:
                    return (
                        <div className={cx('verify-container', 'hover-component')}>
                            <span className={cx('verify-text')} onClick={handlePressStatus}>{info?.tinh_trang?.status}</span>
                        </div>
                    );
                case COLOR_TRANSACTION.YELLOW:
                    return (
                        <div className={cx('wait-verify-container', 'hover-component')}>
                            <span className={cx('wait-verify-text')} onClick={handlePressStatus}>{info?.tinh_trang?.status}</span>
                        </div>
                    );
                default:
                    break;
            }
        }, [info?.tinh_trang?.color, info?.tinh_trang?.status, handlePressStatus]);

        const renderCustomView = useCallback(() => {

            return (
                <div className={cx('container')}>
                    <div className={cx('drawer-container')}>
                        <span className={cx('title-drawer-container')}>{Languages.profile.titleDrawerAccount}</span>
                        <img src={Ic_Close} onClick={hide} className={cx('close')} />
                    </div>
                    <div className={cx('avatar')}>
                        <img src={info?.avatar_user || ImgNoAvatar} className={cx('avatar-img-container')} />
                        <span className={cx('user-name-text')}>{info?.full_name}</span>
                        { renderStatusAcc}
                    </div>

                    {data?.map((item: ItemScreenModel) => {
                        const handleChangeStep = () => {
                            onChangeStep?.(item?.id || 1);
                            setTabs(item?.id);
                            setVisible(false);
                        };

                        return (
                            <div className={tabs === item?.id ? cx('column-active') : cx('column')} key={item?.id} onClick={handleChangeStep}>
                                <div className={cx('button-item-container')}>
                                    <img src={item?.icon} />
                                    <span className={cx('title-item-text')}>{item?.title}</span>
                                </div>
                                <div className={cx('line')}></div>
                            </div>
                        );
                    })}
                </div>
            );
        }, [data, hide, info?.avatar_user, info?.full_name, onChangeStep, renderStatusAcc, tabs]);

        return (
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onBackDrop}
                open={visible}
                contentWrapperStyle={{ width: '80%' }}
            >
                {renderCustomView()}
            </Drawer>
        );
    }
);

export default DrawerMobileAccount;

