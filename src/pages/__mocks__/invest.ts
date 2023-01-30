import { BankInformationModel } from "models/invest";

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

export const columnNameHistory = ['STT', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Trạng thái', 'Ngày nhận'];
export const columnNameInvest = ['STT', 'Kỳ nhận', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Ngày nhận'];
export const columnNameCommission = ['STT', 'Số điện thoại', 'Tổng tiền đầu tư', 'Hoa hồng']

export const arrInvestKey = ['ky_tra', 'tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistory = ['so_tien', 'so_tien', 'so_tien', 'trang_thai', 'ngay_tra_lai'];
export const arrKeyCommission = ['name', 'total_money', 'money_commission'];

export const arrKeyInvestMobile = ['tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistoryMobile = ['ngay_tra_lai', 'so_tien', 'so_tien', 'so_tien'];
export const arrKeyCommissionMobile = ['total_money', 'money_commission'];

export const labelInvestArr = {
    ngay_nhan: 'Ngày thanh toán',
    tien_goc_tra: 'Số tiền gốc',
    tien_lai_tra: 'Số tiền lãi',
    tong_goc_lai: 'Tổng tiền'
};

export const labelArrHistory = {
    ngay_tra_lai: 'Ngày thanh toán',
    so_tien_goc: 'Số tiền gốc',
    so_tien_lai: 'Số tiền lãi',
    tong_tien: 'Tổng tiền'
};

export const labelArrCommission = {
    name: 'Họ và tên',
    total_money: 'Tiền đầu tư',
    money_commission: 'Hoa hồng',
};


