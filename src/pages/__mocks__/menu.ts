import { ItemScreenModel } from "models/profile";

export const dataMenu: ItemScreenModel[] = [
    {
        id: 1,
        title: 'Giới thiệu',
        is_login: false
    },
    {
        id: 2,
        title: 'Sản phẩm',
        is_login: false
    },
    {
        id: 3,
        title: 'Quản lý của tôi',
        is_login: true
    },
    {
        id: 4,
        title: 'Truyền thông',
        is_login: false
    },
    {
        id: 5,
        title: 'Thông tin cá nhân',
        is_login: true
    },
    {
        id: 6,
        title: 'Thông báo',
        is_login: true
    }
];
