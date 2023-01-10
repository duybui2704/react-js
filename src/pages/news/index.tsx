import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './news.module.scss';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import IcClock from 'assets/image/ic_clock.svg';
import IcView from 'assets/image/ic_view.svg';
import ImgContentNews from 'assets/image/img_content_news.jpg';
import ImgPPNews from 'assets/image/img_pp_news.jpeg';
import { LinkComponent } from 'components/link/link';
import { dataNews } from 'pages/__mocks__/news';
import useIsMobile from 'hooks/use-is-mobile.hook';

const cx = classNames.bind(styles);

function News() {
    const [toggle, setToggle] = useState<boolean>(false);

    const isMobile = useIsMobile();

    useEffect(() => {
        renderTimeDate();
        const interval = setInterval(() => {
            setToggle(last => !last);
        }, 1000);
        return () => clearInterval(interval);
    }, [toggle]);

    const renderTimeDate = useCallback(() => {
        var today = new Date();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        return (
            <div className={cx('column')}>
                <span className={cx('text-green medium h4')}>{Languages.news.investTienngay}</span>
                <div className={cx('row y10')}>
                    <img src={IcClock} className={cx('pr5')} />
                    <span className={cx('text-gray h7 pl5')}>{`${time}`}</span>
                    <span className={cx('text-gray h7 pl5 x30')}>{`${date}`}</span>
                    <img src={IcView} className={cx('pr5')} />
                    <span className={cx('text-gray h7 pl5')}>{`${903}`}</span>
                    <span className={cx('text-gray h7 pl5')}>{Languages.news.view}</span>
                </div>
                <div className={cx('line-bottom', 'y10')} />
            </div>
        );
    }, []);

    const renderImage = useMemo(() => {
        
        return (
            <img src={ImgPPNews} className={cx('xl10', 'img')} />
        );
    }, []);

    const renderContent = useMemo(() => {
        return (
            <div className={cx('column flex y15', 'content-view')}>
                <span className={cx('text-gray h7 bold')}>{Languages.news.loremIpsum}</span>
                <span className={cx('text-gray h7 y10')}>{Languages.news.loremIpsumContent}</span>
                <img src={ImgContentNews} className={cx('y10')} width={'100%'} />
                <span className={cx('text-gray h7 bold y10')}>{Languages.news.loremIpsum}</span>
                <span className={cx('text-gray h7 y10')}>{Languages.news.loremIpsumContent}</span>
                <span className={cx('text-gray h7 y10')}>{Languages.news.loremIpsumContent}</span>
                <span className={cx('text-gray h7 y10')}>{Languages.news.loremIpsumContent}</span>

            </div>
        );
    }, []);

    const renderLink = useMemo(() => {
        return (
            <div className={cx('column')}>
                <span className={cx('text-green medium h6')}>{Languages.news.news}</span>
                <LinkComponent
                    dataLink={dataNews}
                    styleContainer={isMobile ? cx('row', 'scroll-y') : undefined}
                    styleRow={isMobile ? cx('row x10', 'style') : undefined}
                />
            </div>
        );
    }, [isMobile]);

    return (
        <div className={cx('page', 'padding')}>
            {isMobile ?
                <div className={cx('column')}>
                    {renderLink}
                    <div className={cx('padding-top')}>{renderTimeDate()}</div>
                    {renderContent}
                </div> :
                <>
                    <div className={cx('container-left')}>
                        {renderTimeDate()}
                        {renderContent}
                    </div>
                    <div className={cx('container-right')}>
                        {renderImage}
                        {renderLink}
                    </div>
                </>}
        </div>
    );
}

export default News;
