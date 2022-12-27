import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './news.module.scss';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';

const cx = classNames.bind(styles);


function News() {
    var today = new Date();
    const [time, setTime] = useState<string>(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


    useEffect(() => {
        renderTimeDate();
    }, [today, time]);

    const renderTimeDate = useCallback(() => {
        console.log('date ==', date, '--', 'time ==', time);

        console.log();
        return (
            <>
                <span></span>
            </>
        );
    }, [date, time, today]);

    return (
        <div className={cx('page')}>
            <div className={cx('container-left')}>
                <span className={cx('text-green medium h3 ')}>{Languages.news.investTienngay}</span>
                {renderTimeDate()}
            </div>

            <div className={cx('container-right')}>

            </div>
        </div>
    );
}

export default News;
