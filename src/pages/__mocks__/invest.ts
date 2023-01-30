import Languages from "commons/languages";
import { BankInformationModel, DataTotalColumnCommissionType } from "models/invest";

export const columnNameHistory = ['STT', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Trạng thái', 'Ngày nhận'];
export const columnNameInvest = ['STT', 'Kỳ nhận', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Ngày nhận'];

export const InvestMethod = [
    {
        id: 1,
        text: 'Tài khoản Ngân lượng',
        value: 'nganluong'
    },
    {
        id: 2,
        text: 'Tài khoản ngân hàng',
        value: 'bank'
    }
]

export const BankTransferInfo: BankInformationModel = {
    key: 1,
    url: '',
    bin: '970415',
    account: '113366668888',
    bank_code: '970415',
    description: 'Tien dau tu',
    money: '100000',
    name_account: 'QUY VAC XIN PHONG CHONG COVID',
    name_bank: 'ViettinBank',
    id: '970415',
}

export const arrInvestKey = ['stt', 'ky_tra', 'tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistory = ['trang_thai', 'trang_thai', 'so_tien', 'trang_thai', 'trang_thai', 'ngay_tra_lai'];

export const arrKeyInvestMobile = ['tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistoryMobile = ['ngay_tra_lai', 'so_tien', 'so_tien', 'so_tien'];

export const labelInvestArr = {
    ngay_nhan: Languages.invest.datePayment,
    tien_goc_tra: Languages.invest.principalAmount,
    tien_lai_tra: Languages.invest.interestAmount,
    tong_goc_lai: Languages.invest.totalAmount
};

export const labelArrHistory = {
    ngay_tra_lai: Languages.invest.datePayment,
    so_tien_goc: Languages.invest.principalAmount,
    so_tien_lai: Languages.invest.interestAmount,
    tong_tien: Languages.invest.totalAmount
};


