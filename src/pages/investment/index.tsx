import { Grid } from '@mui/material';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import InvestItem from 'components/invest-item';
import PickerComponent from 'components/picker-component/picker-component';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './investment.module.scss';

const cx = classNames.bind(styles);

function Investment() {
    const navigate = useNavigate();
    // const { apiServices } = useAppStore();

    const onLogin = useCallback(async () => {
        // const response = await apiServices.common.checkAppState();
        // console.log(response);
        // userManager.updateDemo(response.data);
    }, [navigate]);

    const renderPicker = useCallback((_title: string, _placeholder: string) => {
        return (
            <Grid item xs={12} md={4} className={cx('top-intro')}>
                <PickerComponent data={[]} title={_title} placeholder={_placeholder} />
            </Grid>
        );
    }, []);

    const renderItemInvest = useCallback((investAmount?: string, interestPayForm?: string, interestYear?: string, dateInvest?: string, expectedProfit?: string) => {
        return (
            <Grid item xs={12} md={4} className={cx('top-intro')}>
                <InvestItem investAmount={investAmount} interestPayForm={interestPayForm} interestYear={interestYear} dateInvest={dateInvest} expectedProfit={expectedProfit} />
            </Grid>
        );
    }, []);

    return (
        <div className={cx('page-container')}>
            <div className={cx('content-container')}>
                <Grid container className={cx('top-search-component')}>
                    <Grid container item spacing={2} >
                        <Grid item xs={12} md={4} className={cx('top-intro')}>
                            <span className={cx('text-your-chance')}>{Languages.invest.yourChance}</span>
                            <span className={cx('text-your-chance-search')}>{Languages.invest.yourChanceSearch}</span>
                        </Grid>
                        {renderPicker(Languages.invest.investAmount, Languages.invest.investAmountChoose)}
                        {renderPicker(Languages.invest.dateInvest, Languages.invest.dateInvestChoose)}
                    </Grid>
                </Grid>
                <div className={cx('invest-package-container')}>
                    <span className={cx('invest-package-text')}>Gói đầu tư nổi bật</span>
                    <div className={cx('invest-package-bar')} />
                </div>

                <Grid container className={cx('grid-content-component')}>
                    <Grid container item spacing={2} >
                        {renderItemInvest()}
                        {renderItemInvest()}
                        {renderItemInvest()}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Investment;
