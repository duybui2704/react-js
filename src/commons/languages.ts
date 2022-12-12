const Languages = {
    common: {
        cancel: 'Hủy',
        ok: 'Chọn',
        back: 'Quay lại',
        yes: 'Có',
        no: 'Không',
        close: 'Đóng',
        search: 'Tìm kiếm',
        agree: 'Đồng ý',
        or: 'Hoặc',
        continue: 'Tiếp tục',
        currency: 'VND',
        percent: '%'
    },
    errorMsg: {
        noInternet: 'Kết nối bị gián đoạn, vui lòng thử lại!',
        sessionExpired: 'Kết nối bị gián đoạn, vui lòng thử lại!',
        positionRequired: 'Thông tin phân quyền chức vụ không được để trống',
        userNameRequired: 'Họ và tên không được để trống',
        userInfoLength: 'Thông tin không được để trống',
        imageRequired: 'Hình ảnh không được để trống',
        userInfoRegex: 'Không được chứa ký tự đặc biệt hoặc chữ',
        userNameLength: 'Họ và tên không được ít hơn 8 ký tự',
        userNameRegex: 'Không được chứa ký tự đặc biệt hoặc số',
        errIllegal: 'Mật khẩu không hợp lệ',
        nameRequired: 'Tên không được để trống',
        emailNull: 'Email không được để trống',
        emailRegex: 'Email không đúng định dạng',
        cardNull: 'Số CMND/CCCD không được để trống',
        cardRegex: 'Số CMND/CCCD phải là số',
        cardCheck: 'Số CMND/CCCD không hợp lệ',
        pwdNull: 'Mật khẩu không được để trống',
        pwdCheck: 'Mật khẩu không được ít hơn 8 ký tự',
        conFirmPwd: 'Xác nhận mật khẩu không trùng khớp với mật khẩu',
        emptyAmount: 'Bạn chưa nhập số tiền',
        minAmount: 'Số tiền nạp/rút tối thiểu là 100.000 vnđ',
        phoneIsEmpty: 'Số điện thoại không được để trống',
        phoneRegex: 'Số điện thoại không đúng định dạng',
        phoneCount: 'Số điện thoại chỉ được 10 số',
        taxIdEmpty: 'Mã số thuế không được để trống',
        taxIdSyntax: 'Mã số thuế không được ít hơn 10 ký tự',
        specialCharacters: 'Không được chứa kí tự đặc biệt',
        birthdayEmpty: 'Ngày sinh ',
        birthdayNotNumber: 'Ngày sinh không đúng định dạng ví dụ: 1970-01-01',
        birthdayAge18: 'Chưa đủ 18 tuổi',
        birthdayAge95: 'Vượt quá 95 tuổi',
        errProvince: 'Thành phố không được bỏ trống',
        errDistrict: 'Quận huyện không được bỏ trống',
        errWard: 'Xã phường không được bỏ trống',
        errFunds: 'Nguồn tiền không được bỏ trống',
        errMoveto: 'Chuyển tới không được bỏ trống',
        errKeyBook: 'Mã sổ không được bỏ trống',
        errMsgOldPwdCompare: 'Mật khẩu cũ bạn nhập không đúng',
        errMsgCurrentPwdCompare: 'Mật khẩu nhập lại không trùng khớp',
        errMsgEmpty: 'Mật khẩu nhập không được để trống',
        errMsgLength: 'Mật khẩu nhập phải từ 8 kí tự trở lên',
        errMsgSpecialChar: 'Mật khẩu nhập không được chứa kí tự đặc biệt',
        errMsgSpaceChar: 'Mật khẩu nhập không được chứa kí tự trống',
        errMsgUpperChar: 'Mật khẩu phải có 1 kí tự in hoa',
        errMsgGender: 'Giới tính không được bỏ trống',
        genderRequired: 'Giới tính không được để trống'
    },
    tabs: ['Đầu tư TienNgay', 'Đầu tư', 'Báo cáo', 'Giao dịch'],
    header: {
        textCenter: 'HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG CƠ CẤU, GIA HẠN',
        textCenter1: 'HƯỚNG DẪN SỬ DỤNG BẢO HIỂM',
        name: '',
        personalInformation: 'Thông tin cá nhân',
        setting: 'Cài đặt tài khoản',
        logout: 'Đăng xuất'
    },
    footer: {
        tienNgay: 'TienNgay',
        dotVn: '.vn',
        copyRight: 'Bản quyền © 2019 - 2022 Công ty Cổ phần Công nghệ Tài chính Việt',
        contactAccessIfErr: 'Hotline: ',
        sdtIfErrAccess: '1900 xxxx'
    },
    auth: {
        login: 'Đăng nhập',
        register: 'Đăng ký'
    },
    home: {
    }
};


export default Languages;
