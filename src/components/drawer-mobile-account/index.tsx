
import { Drawer } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { InfoUser } from 'pages/__mocks__/profile';

import { UserInfoModel } from 'models/user-model';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import styles from './drawer-mobile-account.module.scss';
import { ItemScreenModel } from 'models/profile';

type DrawerBaseProps = {
    onClose?: () => any;
    onChangeStep?: (tabs: number) => void;
    onBackdropPress?: () => void;
    onPressStatus?:()=>void;
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

        const [tabs, setTabs] = useState<number>(1);

        useEffect(() => {
            setInfo(InfoUser);
        }, []);

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

        const renderCustomView = useCallback(() => {

            return (
                <div className={cx('container')}>
                    <div className={cx('drawer-container')}>
                        <span className={cx('title-drawer-container')}>{Languages.profile.titleDrawerAccount}</span>
                        <img src={Ic_Close} onClick={hide} className={cx('close')} />
                    </div>
                    <div className={cx('avatar')}>
                        <img src={ImgPortrait} className={cx('avatar-img-container')} />
                        <span className={cx('user-name-text')}>{info?.username}</span>
                        <span className={cx('status-text')} onClick={handlePressStatus}>{info?.status}</span>
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
        }, [data, handlePressStatus, hide, info?.status, info?.username, onChangeStep, tabs]);

        return (
            <Drawer
                placement='left'
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

