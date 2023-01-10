import ImgContentNews from 'assets/image/img_content_news.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useMemo } from 'react';
import styles from './conditions.module.scss';

const cx = classNames.bind(styles);

function Conditions() {

    const renderContent = useMemo(() => {
        return (
            <div className={cx('column flex y15')}>
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

    return (
        <div className={cx('page', 'padding')}>
            {renderContent}
        </div>
    );
}

export default Conditions;
