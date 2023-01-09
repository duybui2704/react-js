import React,{useMemo} from 'react';
import classNames from 'classnames/bind';
import styles from './commission.module.scss';
import Languages from 'commons/languages';
import { columnNameCommission, DataCommission } from 'pages/__mocks__/invest';
import TableCommission from 'components/table-commission';

const cx = classNames.bind(styles);

const Commission = () => {
    const renderTable = useMemo(() => {
        return <TableCommission dataTableInvest={DataCommission.body}  columnName={columnNameCommission} dataFooter={DataCommission.total}/>;
    }, []);
    return (
        <div className={cx('content')}>
            <div className={cx('container-edit column g-4', 'shadow')}>
                <div className={cx('column g-20 pt-16 pl-16')}>
                    <span className={cx('h5 text-black medium')}>{Languages.commission.investmentCommission}</span>
                    <div className={cx('column g-4')}>
                        <div className={cx('row g-4')}>
                            <span className={cx('star')}>{Languages.commission.star}</span>
                            <span className={cx('h7 text-black')}>{Languages.commission.itemOne}</span>
                        </div>
                        <div className={cx('row g-4')}>
                            <span className={cx('star')}>{Languages.commission.star}</span>
                            <span className={cx('h7 text-black')}>{Languages.commission.itemTwo}</span>
                        </div>  
                    </div>
                </div>  
                <div className={cx('table-ss')}>
                    {renderTable}
                </div>
            </div>
        </div>
    );
};

export default Commission;
