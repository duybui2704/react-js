import { Column } from '@ant-design/plots';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { ReportYearModel, ReportChartModel } from 'models/report';
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
    color: ['#1D9752', '#CC8400', '#4299E1']
};

function ColumnChart({ dataChart, isMobile, chartContainer }: {
    dataChart: ReportYearModel[],
    isMobile?: boolean,
    chartContainer?: string
}) {
    let chartList = [] as ReportChartModel[];

    dataChart?.map((item: ReportYearModel) => {
        chartList.push(
            { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[0], value: Number(utils.formatRoundNumberToDecimalMillion(item?.dau_tu)) },
            { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[1], value: Number(utils.formatRoundNumberToDecimalMillion(item?.goc_tra)) },
            { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[2], value: Number(utils.formatRoundNumberToDecimalMillion(item?.lai_tra)) }
        );
    });
    return (
        <div className={cx('chart', chartContainer)}>
            <span className={cx('text-million')}>{Languages.report.million}</span>
            <Column {...configChart}
                legend={{
                    position: 'bottom-left',
                    layout: isMobile ? 'vertical' : 'horizontal',
                    padding: [0, 0, 0, 16]
                }}
                label={{ position: 'middle' }}
                data={chartList}
                xAxis={{
                    title: {
                        text: Languages.report.month,
                        position: 'end',
                        spacing: 10
                    }
                }}
                yAxis={{
                    line: {
                        style: {
                            lineDash: [0]
                        }
                    }
                }}
                scrollbar={{
                    type: 'vertical',
                    categorySize: isMobile ? 100 : 60,
                    width: 12,
                    padding: [20, 100, 50, 100],
                    style: {
                        thumbColor: '#1D9752',
                        trackColor: '#D9D9D9',
                        thumbHighlightColor: '#77C197'
                    }
                }}
                minColumnWidth={isMobile ? 25 : 30}
            />
        </div>

    );
}

export default ColumnChart;
