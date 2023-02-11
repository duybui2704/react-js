import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PeriodInvestMobile from 'components/period-invest-mobile';
import TableInvest from 'components/table-invest';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { CommissionModel, Detail, Total } from 'models/commission';
import { arrKeyCommission, arrKeyCommissionMobile, columnNameCommission, labelArrCommission } from 'assets/static-data/invest';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './commission.module.scss';

const cx = classNames.bind(styles);

const Commission = observer(() => {
    const { apiServices, common } = useAppStore();
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0].slice(0, 7));
    const [commission, setCommission] = useState<CommissionModel>();
    const toDateRef = useRef<TextFieldActions>(null);

    useEffect(() => {
        fetchCommissionData();
    }, [filterDate]);

    const fetchCommissionData = useCallback(async () => {
        const my = filterDate?.split('-');
        if (my?.length === 2) {
            setIsLoading(true);
            const res = await apiServices.auth.getCommissionInfo(
                my?.[1] || '', my?.[0] || ''
            ) as any;
            setIsLoading(false);
            if (res.success && res.data) {
                setCommission(res.data as CommissionModel);
            }
        }
    }, [apiServices.auth, filterDate]);

    const renderTable = useMemo(() => {
        return (
            <>
                {isMobile
                    ? <PeriodInvestMobile
                        dataTableInvest={commission?.detail as Detail[]}
                        labelArr={labelArrCommission}
                        arrKey={arrKeyCommissionMobile}
                        total={commission?.total as Total}
                    />
                    : <TableInvest
                        dataTableInvest={commission?.detail as Detail[]}
                        arrKey={arrKeyCommission}
                        columnName={columnNameCommission}
                        isLoading={isLoading}
                        description={Languages.commission.describeNoData}
                        dataFooter={commission?.total as Total}
                    />
                }
            </>
        );
    }, [commission?.detail, commission?.total, isLoading, isMobile]);

    const renderDate = useCallback((_placeHolder: string, _refInput: TextFieldActions | any, _value: string) => {
        const onChangeInput = (event: string) => {
            if (event !== filterDate) {
                setFilterDate(_refInput.current?.getValue?.());
            }
        };
        return (
            <MyTextInput
                ref={_refInput}
                type={'month'}
                containerInput={cx('input-container')}
                placeHolder={_placeHolder}
                value={_value || new Date().toISOString().split('T')[0].slice(0, 7)}
                maxLength={7}
                onChangeText={onChangeInput}
                max={new Date().toISOString().split('T')[0].slice(0, 7)}
            />
        );
    }, [filterDate]);

    const renderItemDescribe = useCallback((_describe: string) => {
        return (
            <div className={cx('row g-4')}>
                <span className={cx('star')}>{Languages.commission.star}</span>
                <span className={cx('h7 text-black')}>{_describe}</span>
            </div>
        );
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('container-edit column g-4', 'shadow')}>
                <div className={cx('column g-20 pt-16 pl-16')}>
                    <div className={cx('date-container')}>
                        <span className={cx('h5 text-black medium')}>{Languages.commission.investmentCommission}</span>
                        {renderDate(Languages.history.toDate, toDateRef, filterDate || '')}
                    </div>

                    <div className={cx(isMobile ? 'describe-container-mobile' : 'describe-container')}>
                        {renderItemDescribe(Languages.commission.describe[0])}
                        {renderItemDescribe(Languages.commission.describe[1].replace('%str', `${common.appConfig?.date_commission}`))}
                    </div>
                </div>
                {renderTable}
            </div>
        </div>
    );
});

export default Commission;
