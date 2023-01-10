import React from 'react';
import classNames from 'classnames/bind';
import styles from './link.module.scss';
import { Col, Row } from 'antd';
import { NewsModel } from 'models/news';


const cx = classNames.bind(styles);

export type linkProps = {
    dataLink: NewsModel[]
    styleContainer?: string;
    styleContent?: string;
    styleImg?: string;
    styleDate?: string;
    styleRow?: string;
}

export const LinkComponent = ({ dataLink, styleContainer, styleContent, styleImg, styleDate, styleRow }: linkProps) => {
    return (
        <div className={styleContainer ? styleContainer : cx('column', 'container')}>
            {dataLink?.map((item: NewsModel, index: number) => {
                return (
                    <a key={index} rel={item.link} type="text/css" href={item.link} className={styleRow}>
                        <Row gutter={[24, 16]} className={styleRow ? styleRow : cx('row y15')} >
                            <Col xs={24} md={24} lg={12} xl={12} className={cx('center')}>
                                <img src={item.image} className={styleImg ? styleImg : cx('img', 'center')} />
                            </Col>
                            <Col xs={24} md={24} lg={12} xl={12} className={cx('column')}>
                                <span className={styleContent ? styleContent : cx('h6 text-black')}>{item.content_vi}</span>
                                <span className={styleDate ? styleDate : cx('h7 text-gray y5')}>{item.date}</span>
                            </Col>
                        </Row>
                    </a>
                );
            })}
        </div>
    );
};
