import IcOnePeople from 'assets/icon/ic_onepeople.svg';
import IcCash from 'assets/icon/ic_cash.svg';
import IcRecycle from 'assets/icon/ic_recycle.svg';
import IcLink from 'assets/icon/ic_link.svg';
import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import IcFile from 'assets/icon/ic_file.svg';
import IcInviteFriends from 'assets/icon/ic_invitefriends.svg';
import IcTutorial from 'assets/icon/ic_tutorial.svg';
import IcMessage from 'assets/icon/ic_message.svg'; 
import IcGlobal from 'assets/icon/ic_global.svg';
import { BankModel, RePay, UserInfoModel } from 'models/user-model';

 export const profile = [
    {
        id: 1,
        title: 'Thông tin tài khoản',
        icon: IcOnePeople
    },
    {
        id: 2,
        title: 'Phương thức thanh toán',
        icon: IcCash
    },
    {
        id: 3,
        title: 'Đổi mật khẩu',
        icon: IcRecycle
    },
    {
        id: 4,
        title: 'Liên kết tài khoản',
        icon: IcLink
    },
    {
        id: 5,
        title: 'Hoa hồng nhà đầu tư',
        icon: IcTwoPeople
    },
    {
        id: 6,
        title: 'Điều kiện và điều khoản',
        icon: IcFile
    },
    {
        id: 7,
        title: 'Mời bạn bè',
        icon: IcInviteFriends
    },
    {
        id: 8,
        title: 'Hướng dẫn sử dụng',
        icon: IcTutorial
    },
    {
        id: 9,
        title: 'Hỏi đáp',
        icon: IcMessage
    },
    {
        id: 10,
        title: 'Tienngay.vn',
        icon: IcGlobal
    }
];

export const InfoUser = {
    username: 'Bùi Xuân Duy',
    birth_date: '27/04/1999',
    gender: 'Nam',
    phone_number: '0862319100',
    email: 'buixuanduy2704@gmail.com',
    address: 'Đình Thôn, Mỹ Đinh 1, Nam Từ Liêm, Hà Nội',
    status: 'Chưa xác thực tài khoản'
} as UserInfoModel

export const InfoBank = {
    account_name: 'Bui Xuan Duy',
    account_number: '071053275',
    name_bank: 'VPBank'
} as BankModel

    // export
