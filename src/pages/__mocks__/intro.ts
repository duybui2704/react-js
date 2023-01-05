import { ServiceModel } from "models/intro";
import IcLuckyloot from 'assets/image/ic_luckylott.svg';
import IcVPS from 'assets/image/ic_vps.svg';
import Languages from "commons/languages";


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
    }
] as ServiceModel[];


export const infoInvest = [
    {
        id: "001",
        label: Languages.intro.investors,
        number: 900000,
        duration: "2"
    },
    {
        id: "002",
        label: Languages.intro.investmentMoney,
        number: 5321,
        duration: "2"
    },
    {
        id: "003",
        label: Languages.intro.profit,
        number: 100,
        duration: "2"
    }
]

export const videoIntro = {
    link: 'https://res.cloudinary.com/codelife/video/upload/v1637805738/intro_l5ul1k.mp4',
    type: 'video/mp4',
    title: 'Ông Nguyễn Hoà Bình',
    content: 'Nhà sáng lập kiêm chủ tịch tập đoàn Nexttech'
} 
