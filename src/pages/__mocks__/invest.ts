import Languages from "commons/languages";
import { BankInformationModel, DataColumnCommissionType, DataColumnHistoryType, DataColumnInvestType, DataTotalColumnCommissionType, PackageInvest } from "models/invest";

export const investListData =
    [
        {
            id: 1,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '50000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '100000',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '200000',
            tong_goc_da_tra: '',
        },
        {
            id: 2,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '30000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '20/1/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '3000000',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '200000',
            tong_goc_da_tra: '',
        },
        {
            id: 3,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '10000000',
            lai_hang_thang: '19000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '12 tháng',
            tong_lai_du_kien: '1100000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '12 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 4,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '80000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 5,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '1000000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '11/6/2022',
            ki_han_dau_tu: '8 tháng',
            tong_lai_du_kien: '1289000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '2%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '8 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 6,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '80000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 7,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '100000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '24 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '24 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        }
    ] as PackageInvest[];

export const investListMoreData =
    [
        {
            id: 8,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '50000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 9,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '30000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '20/1/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 10,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '10000000',
            lai_hang_thang: '19000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '12 tháng',
            tong_lai_du_kien: '1100000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '12 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 11,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '80000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 12,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '1000000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '11/6/2022',
            ki_han_dau_tu: '8 tháng',
            tong_lai_du_kien: '1289000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '2%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '8 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 13,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '80000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '6 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '6 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        },
        {
            id: 14,
            ma_hop_dong: 'HĐCC/ĐKOTO/TPHN79HĐ/2212/04',
            so_tien_dau_tu: '100000000',
            lai_hang_thang: '12000',
            ngay_dau_tu: '12/12/2022',
            ki_han_dau_tu: '24 tháng',
            tong_lai_du_kien: '3984000',
            tong_lai_da_nhan: '',
            tong_lai_da_tra: '',
            ngay_dao_han: '',
            hinh_thuc_tra_lai: 'Lãi hàng tháng, gốc cuối kỳ',
            ti_le_lai_suat_hang_thang: '1%',
            ti_le_lai_suat_hang_nam: '12%',
            trang_thai_hop_dong: '',
            ngay_dao_han_du_kien: '01/01/2023',
            tong_lai_nhan_duoc: '1000000',
            thoi_gian_dau_tu: '24 tháng',
            tong_goc_con_lai: '',
            tong_goc_da_tra: '',
        }
    ] as PackageInvest[];

export const dateListData = [
    {
        id: '1',
        text: '1 tháng',
        value: '1 tháng',
    },
    {
        id: '2',
        text: '3 tháng',
        value: '3 tháng',
    },
    {
        id: '3',
        text: '6 tháng',
        value: '6 tháng',
    },
    {
        id: '4',
        text: '12 tháng',
        value: '12 tháng',
    },
    {
        id: '5',
        text: '18 tháng',
        value: '18 tháng',
    },
    {
        id: '6',
        text: '24 tháng',
        value: '24 tháng',
    }
]

export const dataColumnInvest: DataColumnInvestType[] = [
    {
        id: '1',
        receivingPeriod: 'Kỳ 1',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000,000',
        total: '1,000,000',
        receivedDate: '12/05/2023'
    },
    {
        id: '2',
        receivingPeriod: 'Kỳ 2',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/06/2023'
    },
    {
        id: '3',
        receivingPeriod: 'Kỳ 3',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/07/2023'
    },
    {
        id: '4',
        receivingPeriod: 'Kỳ 4',
        principalAmount: '1,000,000,000',
        profitAmount: '1,000,000',
        total: '1,000,000',
        receivedDate: '12/08/2023'
    }
];

export const dataColumnCommission: DataColumnCommissionType[] = [
    {
        id: '1',
        phoneNumber: '0123456789',
        totalInvest: '1,000,000,000',
        commissionAmount: '1,000,000',
    },
    {
        id: '2',
        phoneNumber: '0123456789',
        totalInvest: '1,000,000,000',
        commissionAmount: '1,000,000',
    },
    {
        id: '3',
        phoneNumber: '0123456789',
        totalInvest: '1,000,000,000',
        commissionAmount: '1,000,000',
    }
];

const totalCommission: DataTotalColumnCommissionType = {
    totalInvest: '3,000,000',
    totalCommission: '2,000,000'
}

export const DataCommission = {
    body: dataColumnCommission,
    total: totalCommission
}

export const columnNameHistory = ['STT', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Trạng thái', 'Ngày nhận'];
export const columnNameInvest = ['STT', 'Kỳ nhận', 'Số tiền gốc', 'Số tiền lãi', 'Tổng tiền', 'Ngày nhận'];
export const columnNameCommission = ['STT', 'Số điện thoại', 'Tổng tiền đầu tư', 'Hoa hồng'];

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

export const arrKey = ['stt', 'ky_tra', 'tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistory = ['stt', 'tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'status', 'ngay_nhan'];

export const arrKeyMobile = ['tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];
export const arrKeyHistoryMobile = ['tien_goc_tra', 'tien_lai_tra', 'tong_goc_lai', 'ngay_nhan'];

export const labelInvestArr = {
    ngay_nhan: Languages.invest.datePayment,
    tien_goc_tra: Languages.invest.principalAmount,
    tien_lai_tra: Languages.invest.interestAmount,
    tong_goc_lai: Languages.invest.totalAmount
};

export const labelArrHistory = {
    receivedDate: Languages.invest.datePayment,
    principalAmount: Languages.invest.principalAmount,
    profitAmount: Languages.invest.interestAmount,
    total: Languages.invest.totalAmount
};


