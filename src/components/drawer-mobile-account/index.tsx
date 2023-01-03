
import { Drawer, Modal } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import InfoAccount from 'pages/profile/info-account';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import { InfoUser, profile } from 'pages/__mocks__/profile';

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import styles from './drawer-mobile-account.module.scss';
import { UserInfoModel } from 'models/user-model';

interface ProfileModel {
    id: number;
    title: string;
    icon: any;
}

type PopupBaseProps = {
    onClose?: () => any;
    onChangeStep?: (tabs: number) => any;
    onBackdropPress?: () => any;
};

type PopupBaseActions = {
    showModal: (content?: any) => any;
    hideModal: (content?: string) => any;
};

const cx = classNames.bind(styles);

const DrawerMobileAccount = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onChangeStep, onClose, onBackdropPress
    }: PopupBaseProps, ref) => {
        const [visible, setVisible] = useState(false);
        const [info, setInfo] = useState<UserInfoModel>();

        const [tabs, setTabs] = useState<number>(1);

        useEffect(() => {
            setInfo(InfoUser);
        }, []);

        const hideModal = useCallback(() => {
            setVisible(false);
        }, []);

        const showModal = useCallback(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            showModal,
            hideModal
        }));

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const renderCustomModal = useCallback(() => {

            return (
                <div className={cx('container')}>
                    <div className={cx('drawer-container')}>
                        <span className={cx('title-drawer-container')}>{Languages.profile.titleDrawerAccount}</span>
                        <img src={Ic_Close} onClick={hideModal} className={cx('close')}/>
                    </div>
                    <div className={cx('avatar')}>
                        <img src={ImgPortrait} className={cx('avatar-img-container')} />
                        <span className={cx('user-name-text')}>{info?.username}</span>
                        <span className={cx('status-text')}>{info?.status}</span>
                    </div>

                    {profile.map((item: ProfileModel, index: number) => {
                        const handleChangeStep = () => {
                            onChangeStep?.(item?.id || 1);
                            setTabs(item?.id);
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
        }, [hideModal, info?.status, info?.username, onChangeStep, tabs]);

        return (
            <Drawer
                placement='left'
                closable={false}
                onClose={hideModal}
                open={visible}
                contentWrapperStyle={{ width: '80%' }}
            >
                {renderCustomModal()}
            </Drawer>
        );
    }
);

export default DrawerMobileAccount;

