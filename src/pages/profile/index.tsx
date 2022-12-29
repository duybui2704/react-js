import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import ImgPortrait from 'assets/image/img_portrait.jpg';
import { profile} from 'pages/__mocks__/profile';
import ImgEdit from 'assets/icon/ic_update_user.svg';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();

    const onPress = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <Row className={cx('container')}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8} className={cx('profile')}>
                <div className={cx('avatar')}>
                    <img src={ImgPortrait} width={'40%'} />
                    {/* <span className={cx('text-gray medium h5 y20')}>{Languages.profile.name}</span> */}
                    <label className={cx('text-red medium h6')}>{Languages.profile.notification}</label>
                </div>
               
                {profile.map((item, index) => {
                    return(
                        <div  className={'column'} key={index}>
                            <div className={cx('row p12')}>
                                <img src={item.icon}/>
                                <span className={cx('xl10 h7 text-gray regular b5')}>{item.title}</span>
                            </div>
                            <div className={cx('line')}></div>
                        </div>
                    );
                })}
                
            </Col>

            <Col xs={24} md={24} lg={12} xl={16} className={cx('information')}>
                <div>
                    <p>{Languages.header.personalInformation}</p>
                    <Button 
                        buttonStyle={'GREEN'}
                        label={Languages.profile.edit}
                        
                        
                    />
                </div>
            </Col>

            {/* <Button
                label={Languages.common.back}
                onPress={onPress}
                buttonStyle={'GREEN'}
            /> */}
        </Row>
        
    );
}

export default Profile;
