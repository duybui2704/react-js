
import { PackageInvest } from 'models/invest';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState
} from 'react';
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
};

const InvestTab = forwardRef<TabsActions, TabProps>(
    ({
        label

    }: TabProps, ref) => {

        const [tabName, setTabName] = useState<string>('1');
        const [investPackage, setInvestPackage] = useState<PackageInvest>();

        const onNavigateDetail = useCallback((data: PackageInvest) => {
            setTabName(`${Number(tabName) + 1}`);
            setInvestPackage(data);
        }, [tabName]);

        const onNextPage = useCallback(() => {
            setTabName(`${Number(tabName) + 1}`);
        }, [tabName]);

        const goBack = useCallback(() => {
            setTabName(`${Number(tabName) - 1}`);
        }, [tabName]);

        const setTab = useCallback((tab: string) => {
            setTabName(tab);
        }, []);

        useImperativeHandle(ref, () => ({
            goBack,
            setTab
        }));

        const renderCustomTab = useCallback(() => {
            switch (tabName) {
                case '1':
                    return <Investment onNextScreen={onNavigateDetail} />;
                case '2':
                    return <InvestDetail onBackScreen={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
                case '3':
                    return <InvestPackageVerify onBackDetail={goBack} onNextScreen={onNextPage} investPackage={investPackage} />;
                case '4':
                    return <TransferBank goBack={goBack} onNextScreen={onNextPage}  investPackage={investPackage}/>;
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



