import ImgHeader from 'assets/image/img_home_header.jpg';
import ImgPerson from 'assets/image/img_person.jpg';
import ImgCircle from 'assets/image/img_circle.jpg';
import ImgPhone from 'assets/image/img_phone.jpg';
import ImgAppStore from 'assets/image/img_app_store.jpg';
import ImgVideo from 'assets/image/img_video.jpg';
import BannerInvest from 'assets/image/bg_banner_invest.jpg';
import ImgGGPLay from 'assets/image/img_gg_chplay.jpg';
import ImgQRCode from 'assets/image/img_qr_code.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);

function Intro() {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [model, setModel] = useState<boolean>(false);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('view-body', 'padding')}>
                <div className={cx('view-body-right')}>
                    <span className={cx('text-green medium h3 white-space')}>{Languages.intro.advantagesTienngay}</span>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.riskReduction}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.riskReductionContent}</span>
                    </div>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.ecosystemNextTech}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.ecosystemNextTechContent}</span>
                    </div>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.appInvest}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.appInvestContent}</span>
                    </div>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.flexibleTime}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.flexibleTimeContent}</span>
                    </div>
                    <Button
                        label={Languages.intro.seeInvest}
                        containButtonStyles={cx('button-style', 'y20')}
                        labelStyles={cx('text-white medium h6')}
                        isLowerCase
                    />
                </div>
                <img src={ImgPerson} className={cx('banner')} />
            </div>
        );
    }, []);

    const renderViewInvest = useMemo(() => {
        return (
            <div style={{ height: 100, backgroundColor: 'GrayText' }}></div>
        );
    }, []);

    const steps = useCallback((index: number, content: string) => {

        const onChangeSteps = () => {
            setStep(index);
        };

        return (
            <div className={cx('column center y20')}>
                <div className={step === index ? cx('circle', 'border-green') : cx('circle', 'border-gray')} onClick={onChangeSteps}>
                    <span className={step === index ? cx('text-green h6 text-center') : cx('text-gray h6 text-center')}>{`${index}`}</span>
                </div>
                <span className={step === index ? cx('text-green h6 y10 text-center') : cx('text-gray h6 y10 text-center')}>{content}</span>
                {step === index && <div className={cx('line')} />}
            </div>
        );
    }, [step]);

    const renderViewStepsInvest = useMemo(() => {
        return (
            <div className={cx('view-body column', 'padding')}>
                <span className={cx('text-green medium h3')}>{Languages.intro.stepsInvest}</span>
                <span className={cx('text-black regular h6')}>{Languages.intro.stepContent}</span>
                <div className={cx('row y20')}>
                    <div className={cx('column', 'width')}>
                        {steps(1, Languages.intro.step1)}
                        {steps(2, Languages.intro.step2)}
                        {steps(3, Languages.intro.step3)}
                    </div>
                    <div className={cx('line-right')} />
                    <img src={ImgPhone} className={cx('img-phone y20')} />
                    <div
                        style={{
                            backgroundImage: `url(${ImgCircle})`,
                            width: '100%',
                            backgroundRepeat: 'round',
                            backgroundSize: 'cover',
                            marginLeft: 10
                        }}
                        className={cx('center column')}
                    >
                        <ul className={cx()}>
                            <li className={cx('text-black h5 regular y5')}>{Languages.intro.registerApp}</li>
                            <li className={cx('text-black h5 regular y5')}>{Languages.intro.registerApp}</li>
                            <li className={cx('text-black h5 regular y5')}>{Languages.intro.registerApp}</li>
                        </ul>
                        <div className={cx('row y20')}>
                            <div className={cx('column x50 space-between')}>
                                <img src={ImgAppStore} className={cx('img-phone ')} />
                                <img src={ImgGGPLay} className={cx('img-phone ')} />
                            </div>
                            <img src={ImgQRCode} className={cx('img-phone')} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [steps]);

    const renderViewNearBelow = useMemo(() => {
        return (
            <div className={cx('view-body', 'padding')}>
                <div className={cx('view-body-right')}>
                    <span className={cx('text-green medium h3')}>{Languages.intro.investmentReasons}</span>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.transparency}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.transparencyContent}</span>
                    </div>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.lasting}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.lastingContent}</span>
                    </div>
                    <div className={cx('y10 column')}>
                        <span className={cx('text-black medium h6')}>{Languages.intro.easy}</span>
                        <span className={cx('text-black regular h6')}>{Languages.intro.easyContent}</span>
                    </div>
                    <Button
                        label={Languages.intro.seeInvest}
                        containButtonStyles={cx('button-style', 'y20')}
                        labelStyles={cx('text-white medium h6')}
                        isLowerCase
                    />
                </div>
                <Video
                    autoPlay={model}
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'FullScreen']}
                    poster={ImgVideo}
                    style={{ width: 500, marginTop: 20, borderRadius: 10, marginLeft: 20 }}
                >
                    <source src="https://www.youtube.com/watch?v=DuhgAbHzvtY&list=PPSV" type='video/mp4' />
                </Video>
            </div >
        );
    }, [model]);

    return (
        <div className={cx('page')}>
            <img src={ImgHeader} className={cx('banner')} />
            <div className={cx('view-title')}>
                <span className={cx('text-white medium h1 y10')}>{Languages.intro.invest}</span>
                <span className={cx('text-white medium h4 y10')}>{Languages.intro.buildTheFuture}</span>
                <span className={cx('text-white medium h6 y10')}>{Languages.intro.contentResult}</span>
            </div>
            {/* need fix view */}
            <div className={cx('view-intro')}>
                <div className={cx('view-intro-center')}>
                    <span className={cx('text-green regular h6', 'line-height')}>{Languages.intro.contentStart}</span>
                    <span className={cx('text-black regular h6', 'line-height')}>{Languages.intro.contentEnd}</span>
                </div>
            </div>
            <div className={cx('body')}>
                {renderViewTop}
                {renderViewInvest}
                {renderViewStepsInvest}
                {/* fix backgroundImage */}
                <div
                    style={{
                        backgroundImage: `url("${BannerInvest}")`,
                        backgroundRepeat: 'round',
                        backgroundSize: 'cover',
                        width: '250px'
                    }}
                    className={cx('banner-invest')}
                >
                </div>
                {renderViewNearBelow}
            </div>

        </div>
    );
}

export default Intro;
