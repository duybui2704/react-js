import { ServiceModel } from "models/intro";
import IcLuckyloot from 'assets/image/ic_luckylott.svg';
import IcVPS from 'assets/image/ic_vps.svg';


export const serviceList = [
    {
        id: `1`,
        image: IcLuckyloot,
        name: 'Vé số Vietllot trực tuyến',
        content: 'Thuận tiện, nhanh chóng, an toàn'
    },
    {
        id: `2`,
        image: IcVPS,
        name: 'Chứng khoán VPS',
        content: 'Đăng ký mở tài khoản miễn phí'
    },
    {
        id: `3`,
        image: IcVPS,
        name: 'Chứng khoán VPS',
        content: 'Đăng ký mở tài khoản miễn phí'
    },
    {
        id: `4`,
        image: IcVPS,
        name: 'Chứng khoán VPS',
        content: 'Đăng ký mở tài khoản miễn phí'
    }
] as ServiceModel[];
