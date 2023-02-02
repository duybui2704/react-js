import ImgEdit from 'assets/icon/ic_update_user.svg';
import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';

import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './info-payment.module.scss';

import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import { useAppStore } from 'hooks';
import { ItemProps } from 'models/common';
import { DataBanksModel } from 'models/payment-link-models';
import { BankModel, UserInfoModel } from 'models/user-model';
import formValidate from 'utils/form-validate';
import utils from 'utils/utils';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function InfoPayment() {
    const { apiServices } = useAppStore();
    const [info, setInfo] = useState<BankModel>({});
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refName = useRef<TextFieldActions>(null);
    const refNumber = useRef<TextFieldActions>(null);
    const refBank = useRef<PickerAction>(null);
    const { userManager } = useAppStore();
    const [dataBanks, setDataBanks] = useState<ItemProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // setInfo(InfoBank);
        fetchBankList();
    }, []);

    const fetchBankList = useCallback(async () => {
        const res = await apiServices.paymentMethod.getBank() as any;
        if (res.success) {
            const data = res.data as DataBanksModel[];
            const temp = data?.map((item) => ({ id: item?.bank_code, value: item?.name, text: item?.short_name, icon: item?.icon })) as ItemProps[];
            setDataBanks(temp);
        }
    }, [apiServices.paymentMethod]);

    const renderItem = useCallback((title: string, value?: string, last?: boolean) => {
        return (
            <div className={cx(last ? 'item-last-container' : 'item-container')}>
                <span className={cx('h6 text-gray medium')}>{title}</span>
                <span className={cx('h6', value === '' || !value ? 'text-gray opacity-05' : 'text-gray')}>
                    {value === '' || !value ? Languages.profile.empty : value}</span>
            </div>
        );
    }, []);

    const renderInput = useCallback((_ref: any, value: string, type: string, label?: string, maxLength?: number, disabled?: boolean, key?: string) => {

        const onChange = () => {
            setInfo(
                (last) => {
                    const newObj = last;
                    if (key) {
                        newObj[key] = _ref.current?.getValue();
                    }
                    return newObj;
                }
            );
        };

        return (
            <MyTextInput
                ref={_ref}
                value={value}
                type={type}
                label={label}
                disabled={disabled}
                containerStyle={cx('y15')}
                onChangeText={onChange}
                maxLength={maxLength}
                placeHolder={label}
            />
        );
    }, []);

    const onValidate = useCallback(() => {
        const errMsgBank = formValidate.inputEmpty(info.name_bank, Languages.errorMsg.errBankEmpty);
        const errMsgAccNumber = formValidate.inputValidate(info.account_number, Languages.errorMsg.errStkEmpty, Languages.errorMsg.errStk, 16);
        const errMsgName = formValidate.inputNameEmpty(utils.formatForEachWordCase(info.account_name || ''), Languages.errorMsg.errNameEmpty, Languages.errorMsg.userNameRegex);
        refNumber.current?.setErrorMsg(errMsgAccNumber);
        refName.current?.setErrorMsg(errMsgName);
        refBank.current?.setError(errMsgBank);
        if (`${errMsgName}${errMsgAccNumber}${errMsgBank}`.length === 0) {
            return true;
        }
        return false;
    }, [info]);

    const onSave = useCallback(async () => {
        console.log('info ==', info);
        if (onValidate()) {
            setIsLoading(true);
            const res = await apiServices.paymentMethod.requestChoosePaymentReceiveInterest(
                'bank',
                info.name_bank,
                info.account_number,
                info.account_name,
                1
            ) as any;
            setIsLoading(false);
            if (res.success) {
                toast.success(Languages.msgNotify.successAccountLinkBank);
                const resUser = await apiServices.auth.getUserInfo() as any;
                if (resUser.success) {
                    const user = resUser.data as UserInfoModel;
                    userManager.updateUserInfo({
                        ...userManager.userInfo,
                        ...user
                    });
                }
            }
        }
    }, [apiServices.auth, apiServices.paymentMethod, info, onValidate, userManager]);

    const oncancel = useCallback(() => {
        setIsEdit(last => !last);
    }, []);

    const onEdit = useCallback(() => {
        setIsEdit(last => !last);
    }, []);

    const checkButtonEdit = useMemo(() => {
        if (userManager.userInfo?.tra_lai?.name_bank_account === '') return false;
        if (userManager.userInfo?.tra_lai?.interest_receiving_account === '') return false;
        if (userManager.userInfo?.tra_lai?.bank_name === '') return false;
        return userManager.userInfo?.tra_lai?.name_bank_account && userManager.userInfo?.tra_lai?.interest_receiving_account && userManager.userInfo?.tra_lai?.bank_name;
    }, [userManager.userInfo]);

    const renderPayment = useMemo(() => {
        return (
            <div className={cx('container', 'shadow')}>
                <div className={cx('row space-between b15')}>
                    <span className={cx('text-black h5 medium')}>{Languages.profile.infoPayment}</span>
                    {!checkButtonEdit &&
                        <Button
                            label={Languages.profile.edit}
                            labelStyles={cx('text-white h7 regular')}
                            rightIcon={ImgEdit}
                            containButtonStyles={cx('btn-container')}
                            onPress={onEdit}
                            isLowerCase
                        />
                    }
                </div>
                {renderItem(Languages.profile.accountName, userManager.userInfo?.tra_lai?.name_bank_account)}
                {renderItem(Languages.profile.accountNumber, userManager.userInfo?.tra_lai?.interest_receiving_account)}
                {renderItem(Languages.profile.bank, userManager.userInfo?.tra_lai?.bank_name, true)}
            </div>
        );
    }, [checkButtonEdit, onEdit, renderItem, userManager.userInfo]);

    const onChooseBank = useCallback((name: string) => {
        setInfo(last => {
            last.name_bank = name;
            return last;
        });
    }, []);

    const renderEdit = useMemo(() => {
        return (
            <div className={cx('container-edit', 'shadow')}>
                <span className={cx('text-black h4 medium')}>{Languages.profile.infoPayment}</span>
                <PickerComponent
                    ref={refBank}
                    data={dataBanks}
                    title={Languages.profile.bank}
                    defaultValue={userManager.userInfo?.tra_lai?.bank_name}
                    placeholder={Languages.profile.bank}
                    mainContainer={cx('y15', 'picker-container')}
                    titleItemPickerText={'text-gray h7 b5'}
                    onSelectItem={onChooseBank}
                    isImportant
                />
                {renderInput(refName,  userManager.userInfo?.tra_lai?.name_bank_account || '', 'text', Languages.profile.accountName, 50, false, 'account_name')}
                {renderInput(refNumber, userManager.userInfo?.tra_lai?.interest_receiving_account || '', 'tel', Languages.profile.accountNumber, 16, false, 'account_number')}
                <span className={cx('h7 text-red y10 medium')}>
                    {Languages.profile.noteBank}
                    <span className={cx('h7 text-gray y10')}>
                        {Languages.profile.contentNoteBank}
                        <span className={cx('h7 text-green y10 medium')}>
                            {Languages.profile.contentTienNgayFirst}
                            <span className={cx('h7 text-gray y10')}>{Languages.profile.contentTienngayEnd}</span>
                        </span>
                    </span>
                </span>

                <div className={cx('wid-100', 'row y20')}>
                    <Button
                        label={Languages.common.save}
                        labelStyles={cx('text-white h7 regular')}
                        rightIcon={IcSave}
                        containButtonStyles={cx('btn-container', 'padding')}
                        isLowerCase
                        isLoading={isLoading}
                        onPress={onSave}
                    />
                    <Button
                        label={Languages.common.cancel}
                        labelStyles={cx('text-red h7 medium')}
                        rightIcon={IcCancel}
                        containButtonStyles={cx('btn-cancel', 'padding')}
                        isLowerCase
                        onPress={oncancel}
                    />
                </div>
            </div>
        );
    }, [dataBanks, isLoading, onChooseBank, onSave, oncancel, renderInput, userManager.userInfo]);

    return (
        <div className={cx('colum content')}>
            <div className={cx('column', 'flex')}>
                {!isEdit ? renderPayment : renderEdit}
            </div>
        </div>

    );
}

export default InfoPayment;
