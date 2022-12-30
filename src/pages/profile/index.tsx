import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import { InfoUser, profile } from 'pages/__mocks__/profile';
import ImgEdit from 'assets/icon/ic_update_user.svg';
import { UserInfoModel } from 'models/user-model';
import InfoAccount from './info-account';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { Paths } from 'routers/paths';
import InfoPayment from './Info-payment';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [info, setInfo] = useState<UserInfoModel>();
    const [step, setStep] = useState<number>(profile[0].id);

    useEffect(() => {
        setInfo(InfoUser);
    }, []);

    const onPress = useCallback(() => {
        navigate(-1);
    }, [navigate]);


    const renderViewRight = useMemo(() => {
        switch (step) {
            case 1:
                return <InfoAccount />;
            case 2:
                return <InfoPayment />;
            default:
                return;
        }
    }, [step]);

    return (
        <Row className={cx('container', 'padding')}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('profile')}>
                <div className={cx('avatar')}>
                    <img src={ImgPortrait} width={'40%'} />
                    <span className={cx('text-gray medium h5 y20')}>{info?.username}</span>
                    <label className={cx('text-red medium h6')}>{info?.status}</label>
                </div>
               
                {profile.map((item, index) => {

                    const onChangeStep = () => {
                        if (!isMobile) {
                            setStep(item.id);
                        } else {
                            switch (index) {
                                case 0:
                                    return navigate(Paths.infoAccount);
                                case 1:
                                    return navigate(Paths.infoPayment);
                                default:
                                    return;
                            }
                        }
                    };

                    return(
                        <div className={index === step - 1 ? cx('focus', 'column') : cx('column')} key={index} onClick={onChangeStep}>
                            <div className={cx('row p12')}>
                                <img src={item.icon}/>
                                <span className={cx('xl10 h7 text-gray regular b5')}>{item.title}</span>
                            </div>
                            <div className={cx('line')}></div>
                        </div>
                    );
                })}
            </Col>

            {!isMobile && <Col xs={24} md={24} lg={12} xl={16} className={cx('information')}>
                {renderViewRight}
            </Col>}

        </Row>
        
    );
}

export default Profile;
