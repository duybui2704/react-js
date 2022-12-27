import { Col, Row } from 'antd';
import BannerInvest from 'assets/image/bg_banner_invest.jpg';
import ImgAppStore from 'assets/image/img_app_store.jpg';
import ImgCircle from 'assets/image/img_circle.jpg';
import ImgGGPLay from 'assets/image/img_gg_chplay.jpg';
import ImgHalf from 'assets/image/img_half_phone.jpg';
import ImgHeader from 'assets/image/img_home_header.jpg';
import ImgPerson from 'assets/image/img_person.jpg';
import ImgPhone from 'assets/image/img_phone.png';
import ImgPhone1 from 'assets/image/img_phone1.png';
import ImgPhone2 from 'assets/image/img_phone2.png';
import ImgQRCode from 'assets/image/img_qr_code.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import InvestItem from 'components/invest-item';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { ItemProps } from 'models/common';
import { ServiceModel } from 'models/intro';
import { InvestFilter, PackageInvest } from 'models/invest';
import { infoInvest, serviceList } from 'pages/__mocks__/intro';
import { amountListData, dateListData, investListData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import Count from './count';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);

function Intro() {
    const [step, setStep] = useState<number>(1);
    const isMobile = useIsMobile();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});
    const [run, setRun] = useState<boolean>(false);

    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);

    useEffect(() => {
        const scrollHandler = () => {
            const count = document.getElementById(cx('inner-center')) as HTMLElement;
            const end = count?.getBoundingClientRect();
            if (end.bottom < window.innerHeight && end.bottom > 0) {
                setRun(true);
            }
        };
        window.addEventListener('scroll', scrollHandler, true);
        return () => {
            window.removeEventListener('scroll', scrollHandler, true);
        };
    }, []);

    const renderViewTop = useMemo(() => {
        return (
            <Row className={cx('view-body', 'padding-not-bottom')} gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={11} className={cx('jus-content')}>
                    <div className={cx('view-body-right')}>
                        <span className={cx('text-green medium h3 ')}>{Languages.intro.advantagesTienngay}</span>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.riskReduction}</span>
                            <span className={cx('text-black regular h6')}>{Languages.intro.riskReductionContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.ecosystemNextTech}</span>
                            <span className={cx('text-black regular h6')}>{Languages.intro.ecosystemNextTechContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.appInvest}</span>
                            <span className={cx('text-black regular h6')}>{Languages.intro.appInvestContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.flexibleTime}</span>
                            <span className={cx('text-black regular h6')}>{Languages.intro.flexibleTimeContent}</span>
                        </div>
                        <div className={cx('center')}>
                            <Button
                                label={Languages.intro.seeInvest}
                                containButtonStyles={cx('button-style', 'y20')}
                                labelStyles={cx('text-white medium h6')}
                                isLowerCase
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={12} xl={13} >
                    <img src={ImgPerson} width={'80%'} />
                </Col>
            </Row>
        );
    }, []);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            setDataFilter({
                dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
                amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            });
        };
        return (
            <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, [dataFilter]);

    const renderItemInvest = useCallback((index: number, dataInvest: PackageInvest) => {
        const onNavigateInvestDetail = () => {
        };
        return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} className={cx('top-intro')} key={index}>
                <InvestItem onPressInvest={onNavigateInvestDetail} dataInvest={dataInvest} />
            </Col>
        );
    }, []);

    const renderViewInvest = useMemo(() => {
        return (
            <div id={cx('content-container')}>
                <span className={cx('text-green h3 medium')}>{Languages.intro.investAttractive}</span>
                <Row gutter={[24, 16]} className={cx('top-search-component')}>
                    {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, dateListData)}
                    {renderPicker(pickerDateRef, Languages.invest.dateInvest, Languages.invest.dateInvestChoose, amountListData)}
                </Row>

                <Row gutter={isMobile ? [24, 36] : [24, 44]} className={cx('invest-list-component')}>
                    {investListData?.map((itemInvest: PackageInvest, index: number) => {
                        return renderItemInvest(index, itemInvest);
                    })}
                </Row>
            </div>
        );
    }, [isMobile, renderItemInvest, renderPicker]);

    const steps = useCallback((index: number, content: string) => {

        const onChangeSteps = () => {
            setStep(index);
            document.getElementById('fade');
        };

        return (
            <div className={cx('column center y20', 'hv', 'invest-list-component')}>
                <div className={step === index ? cx('circle', 'border-green') : cx('circle', 'border-gray')} onClick={onChangeSteps}>
                    <span className={step === index ? cx('text-green h6 text-center', 'txt-white') : cx('text-gray h6 text-center', 'txt-white')}>{`${index}`}</span>
                </div>

                <span className={step === index ? cx('text-green h6 y10 text-center', 'txt-green') : cx('text-gray h6 y10 text-center', 'txt-green')}>{content}</span>
                {step === index && <div className={cx('line')} />}
            </div>
        );
    }, [step]);

    const stepsMobile = useCallback((index: number) => {

        const onChangeSteps = () => {
            setStep(index);
            document.getElementById('fade');
        };

        return (
            <div className={cx('column y20 center', 'flex')}>
                <div className={step === index ? cx('circle-small', 'border-green') : cx('circle-small', 'border-gray')} onClick={onChangeSteps}>
                    <span className={step === index ? cx('text-green h6 text-center', 'txt-white') : cx('text-gray h6 text-center', 'txt-white')}>{`${index}`}</span>
                </div>
            </div>
        );
    }, [step]);

    const renderLeftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${BannerInvest})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: isMobile ? '45vh' : '25vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
        };
    }, [isMobile]);

    const renderTopBackground = useMemo(() => {
        return {
            backgroundImage: `url(${ImgHeader})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '35vh',
            display: 'flex'
        };
    }, []);

    const stepOne = useMemo(() => {
        return (
            <div className={cx('column center')}> 
                <ul >
                    <li className={cx('text-black h5 regular y5')}>{Languages.intro.registerApp}</li>
                    <li className={cx('text-black h5 regular y5')}>{Languages.intro.registerPhone}</li>
                    <li className={cx('text-black h5 regular y5')}>{Languages.intro.register1Minute}</li>
                </ul>
                <div className={cx('row y20 center', 'width')}>
                    <div className={cx('column x30 space-between')}>
                        <img src={ImgAppStore} width={'100%'} height={'40%'} />
                        <img src={ImgGGPLay} width={'100%'} height={'40%'} className={cx('mrg-10')} />
                    </div>
                    <img src={ImgQRCode} width={'40%'} />
                </div>
            </div>
        );
    }, []);

    const stepTwo = useMemo(() => {
        return (
            <ul>
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentInvest1}</li>
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentInvest2}</li>
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentInvest3}</li>
            </ul>
        );
    }, []);

    const stepThree = useMemo(() => {
        return (
            <ul >
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentProfit1}</li>
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentProfit2}</li>
                <li className={cx('text-black h5 regular y5')}>{Languages.intro.contentProfit3}</li>
            </ul>
        );
    }, []);

    const renderContentStep = useCallback((index: number) => {
        switch (index) {
            case 1:
                return stepOne;
            case 2:
                return stepTwo;
            default:
                return stepThree;
        }
    }, [stepOne, stepThree, stepTwo]);

    const renderImagePhone = useMemo(() => {
        switch (step) {
            case 1:
                return <img src={ImgPhone} width={'90%'} />;
            case 2:
                return <img src={ImgPhone1} width={'90%'} />;
            default:
                return <img src={ImgPhone2} width={'90%'} />;

        }
    }, [step]);

    const renderGroupStepWeb = useMemo(() => {
        return (
            <Row gutter={[24, 16]} className={cx('row y20')}>
                <Col xs={24} sm={24} md={12} lg={12} xl={5} className={'row center'}>
                    <div className={cx('column', 'width-100', 'height-100')}>
                        {steps(1, Languages.intro.step1)}
                        {steps(2, Languages.intro.step2)}
                        {steps(3, Languages.intro.step3)}
                    </div>
                    <div className={cx('line-right')} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={7} className={cx('center')}>
                    {renderImagePhone}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('center')}>
                    <div
                        style={{
                            backgroundImage: `url(${ImgCircle})`,
                            width: '100%',
                            minHeight: '500px',
                            height: '100%',
                            backgroundSize: 'contain',
                            backgroundPositionX: 'center',
                            marginLeft: 10,
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={cx('column center')}
                    >
                        <div className={cx('line-up')}>
                            {renderContentStep(step)}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }, [renderContentStep, renderImagePhone, step, steps]);

    const renderGroupStepMobile = useMemo(() => {
        return (
            <div className={cx('colum y20')}>
                <div className={cx('column', 'width-100')}>
                    <div className={cx('row', 'width-100')}>
                        {stepsMobile(1)}
                        {stepsMobile(2)}
                        {stepsMobile(3)}
                    </div>
                    <span className={cx('text-green h7 regular y10')}>{step === 1 ? Languages.intro.step1 : step === 2 ? Languages.intro.step2 : Languages.intro.step3}</span>
                </div>
                <div className={cx('center row')}>
                    <div className={cx('width-50')}>
                        {renderImagePhone}
                    </div>
                    <div className={cx('width-50', 'column')}>
                        {renderContentStep(step)}
                    </div>
                </div>
            </div>
        );
    }, [renderContentStep, renderImagePhone, step, stepsMobile]);

    const renderViewStepsInvest = useMemo(() => {
        return (
            <div className={cx('view-body column')}>
                <div className={cx('column', 'padding')}>
                    <span className={cx('text-green medium h3')}>{Languages.intro.stepsInvest}</span>
                    <span className={cx('text-black regular h6')}>{Languages.intro.stepContent}</span>
                    {isMobile ? renderGroupStepMobile : renderGroupStepWeb}
                </div>
                <div style={renderLeftBackground}>
                    <div id={cx('inner-center')}>
                        <div id={cx('text-content')}>
                            {infoInvest.map((item, index) => {
                                return (
                                    <div className={cx('column center', 'flex')} key={index}>
                                        <Count item={item} visible={run} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [isMobile, renderGroupStepMobile, renderGroupStepWeb, renderLeftBackground, run]);

    const renderViewNearBelow = useMemo(() => {

        var video = document.getElementById('myVideo');

        return (
            <div className={cx('view-body row')}>
                <div className={cx('column', 'padding')}>
                    <Row gutter={[24, 16]} className={cx('row y20')}>
                        <Col xs={24} md={24} lg={12} xl={12}>
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
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12} className={cx('center')}>
                            <video
                                controls autoPlay
                                loop
                                id={cx('myVideo')}
                            >
                                <source src="https://res.cloudinary.com/codelife/video/upload/v1637805738/intro_l5ul1k.mp4" type='video/mp4' />
                            </video>
                        </Col>
                    </Row>
                </div>

            </div >
        );
    }, []);

    const renderViewService = useMemo(() => {
        return (
            <div className={cx('service-container')}>
                <span className={cx('text-green medium h3')}>{Languages.intro.serviceHot}</span>

                <div className={cx('row y20', 'service')}>
                    <Marquee pauseOnHover gradient={false}>
                        {serviceList.map((item: ServiceModel, index: number) => {
                            return (
                                <div key={index} className={cx('item-service', 'row center', 'padding-item')} onClick={() => console.log('item ===', item)}>
                                    <img src={item.image} className={cx('image')} />
                                    <div className={cx('column xl10')}>
                                        <span className={cx('text-red h7 medium')}>{item.name}</span>
                                        <span className={cx('text-black h7')}>{item.content}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </Marquee>
                </div>
            </div>
        );
    }, []);

    const renderBottom = useMemo(() => {
        return (
            <div className={cx('column', 'padding', 'container')}>
                <span className={cx('text-green medium h3')}>{Languages.intro.downloadApp}</span>
                <Row gutter={[24, 16]} className={cx('container')}>
                    <Col xs={24} md={24} lg={12} xl={12}>
                        <div className={cx('column')}>
                            <span className={cx('text-red medium h3 y10')}>{Languages.intro.appMobile}</span>
                            <span className={cx('text-black h5 y10')}>{Languages.intro.registerApp}</span>
                            <div className={cx('row y40')}>
                                <div className={cx('column x50 space-between center pt5 pb5')}>
                                    <img src={ImgAppStore} width={'100%'} />
                                    <img src={ImgGGPLay} width={'100%'} />
                                </div>
                                <img src={ImgQRCode} />
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={12} className={cx('center')}>
                        <img src={ImgHalf} className={cx('img-phone', 'center')} />
                    </Col>
                </Row>
            </div>
        );
    }, []);
    return (
        <div className={cx('page')}>
            <div className={cx('flex')}>
                <div style={renderTopBackground}>
                    <div className={cx('view-title')}>
                        <span className={cx('text-white medium h1 y10', 'animation-text')}>{Languages.intro.invest}</span>
                        <span className={cx('text-white medium h4 y10', 'animation-text')}>{Languages.intro.buildTheFuture}</span>
                        <span className={cx('text-white medium h6 y10', 'animation-text')}>{Languages.intro.contentResult}</span>
                    </div>
                </div>
            </div>
            <div className={cx('view-intro')}>
                <div className={cx('view-intro-center', 'width-intro')}>
                    <span className={cx('text-green regular h6', 'line-height')}>{Languages.intro.contentStart}</span>
                    <span className={cx('text-black regular h6', 'line-height')}>{Languages.intro.contentEnd}</span>
                </div>
            </div>
            <div className={cx('body')}>
                {renderViewTop}
                {renderViewInvest}
                {renderViewStepsInvest}
                {renderViewNearBelow}
                {renderViewService}
                {renderBottom}
            </div>
        </div>
    );
}

export default Intro;
