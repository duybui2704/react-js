
import { Events, TABS_INVEST, TAB_INDEX } from 'commons/constants';
import { PackageInvest } from 'models/invest';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import { EventEmitter } from 'utils/event-emitter';
import Investment from '.';
import InvestDetail from './invest-detail';
import InvestPackageVerify from './invest-package-verify';
import TransferBank from './tranfer-bank';

export type TabsActions = {
    goBack: () => void;
    setTab: (tab?: any) => void;
};

export type TabProps = {
    label?: string;
    numberTabs?: number;
    isFocus?: boolean;
    receptionData?: any;
};

const InvestTab = forwardRef<TabsActions, TabProps>(
    ({
        numberTabs,
        isFocus,
        receptionData

    }: TabProps, ref) => {

        const [tabName, setTabName] = useState<string>(TABS_INVEST.INVESTMENT);
        const [investPackage, setInvestPackage] = useState<PackageInvest>();
        const nextNumber = useRef<number>(0);

        useEffect(() => {
            if (numberTabs || isFocus) {
                setTabName(`${numberTabs}`);
                setInvestPackage(receptionData);
            } else {
                setTabName(TABS_INVEST.INVESTMENT);
            }
            nextNumber.current = 0;
        }, [isFocus, numberTabs, receptionData]);

        const onNavigateDetail = useCallback((data: PackageInvest) => {
            setTabName(`${Number(tabName) + 1}`);
            setInvestPackage(data);
            nextNumber.current += 1;
        }, [tabName]);

        const onNextPage = useCallback(() => {
            setTabName(`${Number(tabName) + 1}`);
            nextNumber.current += 1;
        }, [tabName]);

        const goBack = useCallback(() => {
            if (isFocus && nextNumber.current === 0) { // go back intro 
                EventEmitter.emit(Events.CHANGE_TAB, TAB_INDEX.INTRO);
                console.log('navigate intro');
            } else {
                setTabName(`${Number(tabName) - 1}`);
                nextNumber.current -= 1;
            }
        }, [isFocus, tabName]);

        const setTab = useCallback((tab: string) => {
            setTabName(tab);
        }, []);

        useImperativeHandle(ref, () => ({
            goBack,
            setTab
        }));

        // CHANGE TABS SCREEN INVEST
        const renderCustomTab = useCallback(() => {
            switch (tabName) {
                case TABS_INVEST.INVESTMENT:
                    return <Investment onNextScreen={onNavigateDetail} />;
                case TABS_INVEST.INVEST_DETAIL:
                    return <InvestDetail onBackScreen={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
                case TABS_INVEST.INVEST_PACKAGE_VERIFY:
                    return <InvestPackageVerify onBackDetail={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
                case TABS_INVEST.TRANSFER_BANK:
                    return <TransferBank goBack={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
                default:
                    break;
            }
        }, [goBack, investPackage, onNavigateDetail, onNextPage, tabName]);

        return (
            <>
                {renderCustomTab()}
            </>
        );
    }
);

export default InvestTab;



