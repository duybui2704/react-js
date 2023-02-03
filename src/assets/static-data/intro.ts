import IcLuckyLott from 'assets/image/ic_luckylott.svg';
import IcVPS from 'assets/image/ic_vps.svg';
import { ServiceModel } from 'models/intro';

export const serviceList = [
    {
        id: '1',
        image: IcLuckyLott,
        name: 'Vé số Vietlott trực tuyến',
        content: 'Thuận tiện, nhanh chóng, an toàn',
        link: 'https://luckylott.vn/'
    },
    {
        id: '2',
        image: IcVPS,
        name: 'Chứng khoán VPS',
        content: 'Đăng ký mở tài khoản miễn phí',
        link: 'https://www.vps.com.vn'
    }
] as ServiceModel[];


export const videoIntro = {
    link: 'https://www.youtube.com/embed/m5QNhH5GNwc',
    type: 'video/mp4',
    title: 'Ông Nguyễn Hoà Bình',
    content: 'Nhà sáng lập kiêm chủ tịch tập đoàn Nexttech'
}; 
