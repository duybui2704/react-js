import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);
function Count(props) {
    const { label, number, duration } = props.item;
    const [toggle, setToggle] = useState<boolean>(false);
    const [count, setCount] = useState('0');

    const runCount = useCallback(() => {
        let start = 0;
        const end = parseInt(`${number}`.substring(0, 3));
        if (start === end) return;
        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 10000;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + `${number}`.substring(3));
            if (start === end) {
                clearInterval(timer);
                // setTimeout(() => {
                //     setToggle(last => !last);
                // }, 8000);
            }
        }, incrementTime);
    }, [duration, number]);


    useEffect(() => {
        runCount();
    }, [runCount, toggle]);

    return (
        <>
            <span className={cx('text-white regular h1')}>{count}</span>
            <span className={cx('text-white regular h3 y5')}>{label}</span>
        </>
    );
}

export default Count;
