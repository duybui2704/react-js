import { Col, Row, Pagination } from 'antd';
import BannerInvest from 'assets/image/bg_banner_invest.jpeg';
import ImgAppStore from 'assets/image/img_app_store.jpg';
import ImgCircle from 'assets/image/img_circle.jpeg';
import ImgGGPLay from 'assets/image/img_gg_chplay.jpg';
import ImgHalf from 'assets/image/img_half_phone.jpeg';
import ImgHeader from 'assets/image/img_home_header.jpg';
import ImgPerson from 'assets/image/img_person.jpeg';
import ImgPhone from 'assets/image/img_phone1.jpeg';
import ImgPhone1 from 'assets/image/img_phone2.jpeg';
import ImgPhone2 from 'assets/image/img_phone3.jpeg';
import ImgPosterVideo from 'assets/image/img_poster.jpeg';
import ImgQRCode from 'assets/image/img_qr_code.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import Footer from 'components/footer';
import InvestItem from 'components/invest-item';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { useWindowSize } from 'hooks/use-window-size';
import { ItemProps } from 'models/common';
import { ServiceModel } from 'models/intro';
import { InvestFilter, PackageInvest } from 'models/invest';
import { infoInvest, serviceList, videoIntro } from 'pages/__mocks__/intro';
import { amountListData, dateListData, investListData } from 'pages/__mocks__/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import type { PaginationProps } from 'antd';
import Count from './count';
import styles from './intro.module.scss';
import { useAppStore } from 'hooks';
import { Loading } from 'components/loading';
import { DashBroadModel } from 'models/dash';

const cx = classNames.bind(styles);

function Intro() {
    const [step, setStep] = useState<number>(1);
    const { apiServices } = useAppStore();
    const isMobile = useIsMobile();
    const [dataFilter, setDataFilter] = useState<InvestFilter>({});
    const [run, setRun] = useState<boolean>(false);
    const [topIntroHeight, setTopIntroHeight] = useState(0);
    const [numberPage, setNumberPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataArr, setDataArr] = useState<PackageInvest[]>();
    const [dataDash, setDataDash] = useState<DashBroadModel>();

    const PAGE_SIZE = 9;
    const condition = useRef({
        isLoading: true,
        offset: 0,
        canLoadMore: true,
        timeInvestment: '',
        moneyInvest: ''
    });

    const pickerAmountRef = useRef<PickerAction>(null);
    const pickerDateRef = useRef<PickerAction>(null);
    const elementRef = useRef<any>(null);

    const screenSize = useWindowSize();

    useEffect(() => {
        setTopIntroHeight(elementRef?.current?.clientHeight);
        fetchDataInvest();
        fetchContractsDash();
    }, [screenSize]);

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

    const fetchContractsDash = useCallback(async () => {
        setIsLoading(true);
        const resContractsDash = await apiServices.common.getContractsDash() as any;
        setIsLoading(false);
        if (resContractsDash.success) {
            const data = resContractsDash?.data as DashBroadModel;
            setDataDash(data);
        }
    }, [apiServices.common]);

    const fetchDataInvest = useCallback(async (number_page?: number) => {

        setIsLoading(true);
        const resInvest = await apiServices.common.getListInvest(
            PAGE_SIZE,
            condition.current.offset * (number_page || 0),
            condition.current.timeInvestment,
            condition.current.moneyInvest,
        ) as any;
        setIsLoading(false);
        if (resInvest.success) {
            const data = resInvest?.data as PackageInvest[];
            const dataSize = data.length;
            if (dataSize > 0) {
                setDataArr(data);
            }
        }
        condition.current.isLoading = false;
        setIsLoading(false);

    }, [apiServices.common]);

    const renderViewTop = useMemo(() => {
        return (
            <Row className={cx('view-body', 'padding-not-bottom')} gutter={[24, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('jus-start')}>
                    <div className={cx('view-body-right')}>
                        <span className={cx('text-green medium h3 ')}>{Languages.intro.advantagesTienngay}</span>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.riskReduction}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.riskReductionContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.ecosystemNextTech}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.ecosystemNextTechContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.appInvest}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.appInvestContent}</span>
                        </div>
                        <div className={cx('y20 column')}>
                            <span className={cx('text-black medium h6')}>{Languages.intro.flexibleTime}</span>
                            <span className={cx('text-black h6')}>{Languages.intro.flexibleTimeContent}</span>
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
                <Col xs={24} md={24} lg={12} xl={12} className={cx('jus-content')}>
                    <img src={ImgPerson} width={'100%'} />
                </Col>
            </Row>
        );
    }, []);

    const renderPicker = useCallback((_ref: any, _title: string, _placeholder: string, _data: ItemProps[]) => {
        const onSelectItem = (item: any) => {
            // setDataFilter({
            //     dateInvest: _title === Languages.invest.dateInvest ? item : dataFilter.dateInvest,
            //     amountInvest: _title === Languages.invest.investAmount ? item : dataFilter.amountInvest
            // });
            condition.current.timeInvestment = item.id;
            if (_title === Languages.invest.dateInvest) {
                condition.current.timeInvestment = item.id;
            } else {
                condition.current.moneyInvest = item.id;
            }
            fetchDataInvest(numberPage);
        };
        return (
            <Col className={cx('picker-container')} xs={24} sm={24} md={24} lg={24} xl={8} >
                <PickerComponent ref={_ref} data={_data} title={_title} placeholder={_placeholder} onSelectItem={onSelectItem} />
            </Col>
        );
    }, []);

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

        const onchange: PaginationProps['onChange'] = (page) => {
            console.log(page);
            setNumberPage(page);
            fetchDataInvest(page);
        };

        return (
            <div id={cx('content-container')}>
                <span className={cx('text-green h3 medium')}>{Languages.intro.investAttractive}</span>
                <Row gutter={[24, 16]} className={cx('top-search-component')}>
                    {renderPicker(pickerAmountRef, Languages.invest.investAmount, Languages.invest.investAmountChoose, amountListData)}
                    {renderPicker(pickerDateRef, Languages.invest.dateInvest, Languages.invest.dateInvestChoose, dateListData)}
                </Row>

                <Row gutter={isMobile ? [24, 36] : [24, 44]} className={cx('invest-list-component')}>
                    {dataArr?.map((itemInvest: PackageInvest, index: number) => {
                        return renderItemInvest(index, itemInvest);
                    })}
                </Row>
                <Pagination
                    current={numberPage}
                    total={30}
                    className={cx('pagination')}
                    onChange={onchange}
                    pageSize={9}
                />
            </div>
        );
    }, [dataArr, isMobile, numberPage, renderItemInvest, renderPicker]);

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

    const getTopHeight = useCallback(() => {
        const screenHeight = window.innerHeight;
        return isMobile ? 0.45 * screenHeight : 0.45 * screenHeight;
    }, [isMobile]);

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
            height: getTopHeight(),
            display: 'flex'
        };
    }, [getTopHeight]);

    const stepOne = useMemo(() => {
        return (
            <div className={cx('column center')}>
                <ul >
                    <li className={cx('text-black h5 y10')}>{Languages.intro.registerApp}</li>
                    <li className={cx('text-black h5 y10')}>{Languages.intro.registerPhone}</li>
                    <li className={cx('text-black h5 y10')}>{Languages.intro.register1Minute}</li>
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
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentInvest1}</li>
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentInvest2}</li>
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentInvest3}</li>
            </ul>
        );
    }, []);

    const stepThree = useMemo(() => {
        return (
            <ul >
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentProfit1}</li>
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentProfit2}</li>
                <li className={cx('text-black h5 y10')}>{Languages.intro.contentProfit3}</li>
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
                    <span className={cx('text-green h7 y10')}>{step === 1 ? Languages.intro.step1 : step === 2 ? Languages.intro.step2 : Languages.intro.step3}</span>
                </div>
                <div className={cx('center row y10')}>
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
                    <span className={cx('text-black h6')}>{Languages.intro.stepContent}</span>
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

        return (
            <div className={cx('view-body row')}>
                <div className={cx('column', 'padding')}>
                    <Row gutter={[24, 16]} className={cx('row y20')}>
                        <Col xs={24} md={24} lg={12} xl={12}>
                            <div className={cx('view-body-right')}>
                                <span className={cx('text-green medium h3')}>{Languages.intro.investmentReasons}</span>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.transparency}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.transparencyContent}</span>
                                </div>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.lasting}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.lastingContent}</span>
                                </div>
                                <div className={cx('y10 column')}>
                                    <span className={cx('text-black medium h6')}>{Languages.intro.easy}</span>
                                    <span className={cx('text-black h6')}>{Languages.intro.easyContent}</span>
                                </div>
                                <Button
                                    label={Languages.intro.seeInvest}
                                    containButtonStyles={cx('button-style', 'y20')}
                                    labelStyles={cx('text-white medium h6')}
                                    isLowerCase
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={12} className={cx('center column')}>
                            <video
                                controls autoPlay
                                loop
                                id={cx('myVideo')}
                                poster={ImgPosterVideo}
                            >
                                <source src={videoIntro.link} type={videoIntro.type} />
                            </video>
                            <div className={cx('column', 'title-vd')}>
                                <span className={cx('text-green h6 bold')}>{videoIntro.title}</span>
                                <span className={cx('text-gray h6')}>{videoIntro.content}</span>
                            </div>
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
                                <a key={index} className={cx('item-service', 'row center', 'padding-item')} href={item.link}>
                                    <img src={item.image} className={cx('image')} />
                                    <div className={cx('column xl10')}>
                                        <span className={cx('text-red h7 medium')}>{item.name}</span>
                                        <span className={cx('text-black h7')}>{item.content}</span>
                                    </div>
                                </a>
                            );
                        })}
                    </Marquee>
                </div>
            </div>
        );
    }, []);

    const renderBottom = useMemo(() => {
        return (
            <div className={cx('column', 'padding-bottom', 'container')}>
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
            <div
                className={cx('view-intro')}
                style={{ marginTop: `${-topIntroHeight/2}px` }}
                // style={{ top: `${getTopHeight() - topIntroHeight / 2}px` }}
            // style={{ top: '103' }}
            >
                <div className={cx('view-intro-center', 'width-intro')}
                    ref={elementRef}>
                    <span className={cx('text-green h6', 'line-height')}>{Languages.intro.contentStart}</span>
                    <span className={cx('text-black h6', 'line-height')}>{Languages.intro.contentEnd}</span>
                </div>
            </div>
            {renderViewTop}
            {renderViewInvest}
            {renderViewStepsInvest}
            {renderViewNearBelow}
            {renderViewService}
            {renderBottom}
            {isLoading && <Loading />}
            <Footer />
        </div>
    );
}

export default Intro;
