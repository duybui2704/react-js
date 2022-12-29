import { Column } from '@ant-design/plots';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { OverviewMonthOfQuarterModel, ReportChartModel } from 'models/report';
import React from 'react';
import utils from 'utils/utils';
import styles from './column-chart.module.scss';
const cx = classNames.bind(styles);

const configChart = {
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    dodgePadding: 1,
    color: ['#1D9752', '#CC8400']
};

function ColumnChart({ dataChart, isMobile }: { dataChart: OverviewMonthOfQuarterModel[], isMobile?: boolean }) {
    let chartList = [] as ReportChartModel[];

    dataChart?.map((item: OverviewMonthOfQuarterModel) => {
        chartList.push(
            { month: `${'T'}${item?.month}`, type: Languages.report.investAmount, value: Number(utils.formatRoundNumberToDecimalMillion(item?.tong_tien_dau_tu)) },
            { month: `${'T'}${item?.month}`, type: Languages.report.amountCollected, value: Number(utils.formatRoundNumberToDecimalMillion(item?.tong_tien_thu_ve)) }
        );
    });
    return (
        <div className={cx('chart')}>
            <span className={cx('text-million')}>{Languages.report.million}</span>
            <Column {...configChart}
                legend={{ position: 'bottom' }}
                label={isMobile ? undefined : { position: 'middle' }}
                data={chartList}
                xAxis={{ 'title': { 'text': Languages.report.month, 'position': 'end', 'spacing': -10 } }}
                yAxis={{
                    'line': { 'style': { 'lineDash': [0] } }
                }}
            />
        </div>

    );
}

export default ColumnChart;
