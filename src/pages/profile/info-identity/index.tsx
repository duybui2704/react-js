import IcPortrait from 'assets/icon/ic_gray_portrait.svg';
import IcFront from 'assets/image/ic_gray_front.svg';
import IcBehind from 'assets/icon/ic_gray_behind.svg';

import IcWarning from 'assets/image/ic_yellow_warning.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { InfoUser } from 'pages/__mocks__/profile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info-identity.module.scss';

import { UserInfoModel } from 'models/user-model';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { MyTextInput } from 'components/input';

const cx = classNames.bind(styles);

function InfoIdentity() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [info, setInfo] = useState<UserInfoModel>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refIdentity = useRef<TextFieldActions>(null);


    useEffect(() => {
        setInfo(InfoUser);
    }, []);

    const renderItem = useCallback((title: string, value?: string) => {
        return (
            <div className={cx('row space-between')}>
                <span className={cx('h6 text-gray bold')}>{title}</span>
                <span className={cx('h6 text-gray regular')}>{value}</span>
            </div>
        );
    }, []);

    const renderInput = useCallback((_ref: any, value: string, key?: string) => {

        const onChange = () => {
            setInfo(
                (last) => {
                    const newObj = last;
                    if (key) {
                        newObj[key] = _ref.current?.getValue();
                    }
                    return newObj;
                }
            );
        };

        return (
            <MyTextInput
                ref={_ref}
                value={value}
                type={'number'}
                label={Languages.identity.identity}
                containerStyle={cx('input')}
                onChangeText={onChange}
                maxLength={12}
                placeHolder={Languages.identity.inputIdentity}
            />
        );
    }, []);


    return (
        <div className={cx('all-container')}>
            <span className={cx('title-page')}>{Languages.identity.title}</span>
            <img src={IcWarning} className={cx('warning')} />
            <span className={cx('describe-identity-text')}>{Languages.identity.describeIdentity}</span>
            {renderInput(refIdentity, info?.identity || '', 'identity')}
        </div>

    );
}

export default InfoIdentity;
