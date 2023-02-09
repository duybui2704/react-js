// import { Column } from '@ant-design/plots';
// import classNames from 'classnames/bind';
// import Languages from 'commons/languages';
// import { ReportYearModel, ReportChartModel } from 'models/report';
// import React from 'react';
// import utils from 'utils/utils';
// import styles from './column-chart.module.scss';
// const cx = classNames.bind(styles);

// const configChart = {
//     isGroup: true,
//     xField: 'month',
//     yField: 'value',
//     seriesField: 'type',
//     dodgePadding: 1,
//     color: ['#1D9752', '#CC8400', '#4299E1']
// };

// function ColumnChart({ dataChart, isMobile, chartContainer }: {
//     dataChart: ReportYearModel[],
//     isMobile?: boolean,
//     chartContainer?: string
// }) {
//     let chartList = [] as ReportChartModel[];

//     dataChart?.map((item: ReportYearModel) => {
//         chartList.push(
//             { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[0], value: Number(utils.formatRoundNumberToDecimalMillion(item?.dau_tu)) },
//             { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[1], value: Number(utils.formatRoundNumberToDecimalMillion(item?.goc_tra)) },
//             { month: `${'T'}${item?.thang}`, type: Languages.report.reportColumnValue[2], value: Number(utils.formatRoundNumberToDecimalMillion(item?.lai_tra)) }
//         );
//     });
//     return (
//         <div className={cx('chart', chartContainer)}>
//             <span className={cx('text-million')}>{Languages.report.million}</span>
//             <Column {...configChart}
//                 legend={{
//                     position: 'bottom-left',
//                     layout: isMobile ? 'vertical' : 'horizontal',
//                     padding: [0, 0, 0, 16]
//                 }}
//                 label={{ position: 'middle' }}
//                 data={chartList}
//                 xAxis={{
//                     title: {
//                         text: Languages.report.month,
//                         position: 'end',
//                         spacing: 10
//                     }
//                 }}
//                 yAxis={{
//                     line: {
//                         style: {
//                             lineDash: [0]
//                         }
//                     }
//                 }}
//                 scrollbar={{
//                     type: 'vertical',
//                     categorySize: isMobile ? 100 : 60,
//                     width: 12,
//                     padding: [20, 100, 50, 100],
//                     style: {
//                         thumbColor: '#1D9752',
//                         trackColor: '#D9D9D9',
//                         thumbHighlightColor: '#77C197'
//                     }
//                 }}
//                 minColumnWidth={isMobile ? 25 : 30}
//             />
//         </div>

//     );
// }

// export default ColumnChart;


import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import NoData from 'components/no-data';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { COLORS } from 'theme/colors';
import styles from './column-chart.module.scss';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
    // ChartDataLabels
);
const cx = classNames.bind(styles);

const options = {
    responsive: true,
    // scales: {
    //     x: {
    //         title: {
    //             display: true,
    //             text: Languages.report.month,
    //             color: COLORS.BLACK,
    //             font: {
    //                 size: 16,
    //                 family: 'medium'
    //             }
    //         },
    //         ticks: {
    //             font: {
    //                 size: 14
    //             }
    //         }
    //     },
    //     y: {
    //         title: {
    //             display: true,
    //             text: Languages.report.million,
    //             color: COLORS.BLACK,
    //             font: {
    //                 size: 16,
    //                 family: 'medium'
    //             },
    //             ticks: {
    //                 position: {
    //                     x: 200
    //                 }
    //             }
    //         },
    //         ticks: {
    //             font: {
    //                 size: 14
    //             }
    //         }
    //     }
    // },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'x'
            },
            zoom: {
                pinch: {
                    enabled: true // Enable pinch zooming
                },
                wheel: {
                    enabled: true // Enable wheel zooming
                },
                mode: 'x'
            }
        },
        legend: {
            display: true,
            labels: {
                color: COLORS.BLACK,
                usePointStyle: true
            },
            position: 'bottom'
        }

        // SHOW VALUE LABEL
        // datalabels: {
        //     display: true,
        //     color: COLORS.WHITE,
        //     fontSize: 8
        // }
    }
} as any;


function ColumnChart({ dataChart, isMobile, chartContainer, hideBarChart }: {
    dataChart: any,
    isMobile?: boolean,
    chartContainer?: string,
    hideBarChart?: boolean
}) {

    const labels = dataChart.label as any;

    const data = {
        labels,
        datasets: [
            {
                label: Languages.report.reportColumnValue[0],
                data: dataChart?.label.map((label, index) => dataChart.moneyInvestMent[index]),
                backgroundColor: COLORS.GREEN,
                pointStyle: 'rect'
            },
            {
                label: Languages.report.reportColumnValue[1],
                data: dataChart.label.map((label, index) => dataChart.initialMoney[index]),
                backgroundColor: COLORS.YELLOW_2,
                pointStyle: 'rect'
            },
            {
                label: Languages.report.reportColumnValue[2],
                data: dataChart.label.map((label, index) => dataChart.interestMoney[index]),
                backgroundColor: COLORS.BLUE,
                pointStyle: 'rect'
            }
        ]
    };

    return (
        <div className={cx('chart', chartContainer)}>
            {hideBarChart ? <>
                <div className={cx('container')}>
                    <span className={cx('text-gray h7')}>{Languages.report.million}</span>
                    <Bar
                        options={options}
                        data={data}
                        height={isMobile ? 350 : 150}
                    />
                </div>
                <div className={cx('text-end')}>
                    <span className={cx('text-gray h7')}>{Languages.report.month}</span>
                </div>
            </> : <NoData description={Languages.invest.noDataInvest} />}
        </div>

    );
}

export default ColumnChart;

