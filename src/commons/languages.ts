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
        percent: '%',
        mustChoose: '*',
        input: 'Nhập',
        add: 'Thêm',
        filter: 'Bộ lọc'
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
        genderRequired: 'Giới tính không được để trống',
        emptyList:'Không có dữ liệu'
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
        register: 'Đăng ký',
        intro: ['CHÀO MỪNG ĐẾN VỚI ĐẦU TƯ TIỆN NGAY', 'Xây dựng tương lai', 'Tiếp cận nhanh chóng các khoản đầu tư có chất lượng cao', 'Tải miễn phí trên AppStore/ Google Play'],
        notAccountYet: 'Bạn chưa có tài khoản?',
        registerNow: 'Đăng ký ngay',
        savePwd: 'Lưu mật khẩu',
        forgotPwd: 'Quên mật khẩu',
        phone: 'Số điện thoại',
        pwd: 'Mật khẩu',
        or: 'Hoặc',
        facebook: 'facebook',
        google: 'Google'
    },
    home: {
    },
    invest: {
        investAmountChoose: 'Chọn số tiền đầu tư',
        dateInvestChoose: 'Chọn thời gian đầu tư',
        investAmount: 'Số tiền đầu tư',
        dateInvest: 'Thời gian đầu tư',
        yourChance: 'Có $count cơ hội cho bạn',
        yourChanceSearch: 'Tìm kiếm cơ hội đầu tư',
        interestYear: 'Lãi suất năm',
        expectedProfit: 'Lãi dự kiến',
        interestPayForm: 'Hình thức trả lãi: ',
        investNow: 'Đầu tư ngay',
        investPackage: 'Gói đầu tư nổi bật',
        superInvestPackage: 'Gói đầu tư siêu lợi nhuận',
        investTienNgay: 'Đầu tư Tiện Ngay',
        buildFuture: 'Xây dựng tương lai',
        describe: 'Tiếp cận nhanh chóng các khoản đầu tư có chất lượng cao',
        contractId: 'Mã số hợp đồng',
        investmentTerm: 'Kỳ hạn đầu tư',
        expectedDueDate: 'Ngày đáo hạn dự kiến',
        totalProfitReceived: 'Tổng lãi nhận được',
        monthlyInterestRate: 'Lãi suất hàng tháng',
        monthlyInterest: 'Lãi hàng tháng',
        formInterest: 'Hình thức trả lãi',
        investNote: 'Lưu ý khi đầu tư',
        infoContract: 'Thông tin hợp đồng',
        noteAuth: 'Đăng nhập hoặc đăng ký ngay',
        noteVerify: 'Bạn chưa đăng nhập tài khoản',
        describeAuth: 'Đăng nhập hoặc đăng ký để tiến hành đầu tư ngay hôm nay ',
        describeVerify: 'Xác thực tài khoản để tăng độ an toàn khi đầu tư và sử dụng ứng dụng',
        next: 'Để sau',
        verifyNow: 'Xác thực ngay',
        searchInvestPackage: 'Tìm kiếm gói đầu tư',
        cancel: 'Huỷ bỏ',
        seeMore: 'Xem thêm các gói đầu tư khác',
        estimatedPaymentSchedule: 'Lịch thanh toán dự kiến',
        investNoteDescribe: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    intro: {
        invest: 'ĐẦU TƯ TIỆN NGAY',
        buildTheFuture: 'Xây dựng tương lai',
        contentResult: 'Tiếp cận nhanh chóng các khoản đầu tư có chất lượng cao',
        contentStart: 'Đầu tư Tiện Ngay ',
        contentEnd: 'là sản phẩm đầu tư tài chính an toàn và hiệu quả dành cho người Việt, được phát triển bởi TienNgay.vn (Công ty cổ phần Tài Chính Việt) - Một công ty thuộc hệ sinh thái tập đoàn NextTech. Với các sản phẩm đầu tư tài chính 4.0 cá nhân đa dạng cùng sự minh bạch về tài chính và nền tảng công nghệ mạnh, Đầu tư Tiện Ngay giúp bạn đầu tư và tích lũy từ nguồn vốn nhỏ để tạo ra giá trị và bảo vệ tương lai.',
        advantagesTienngay: 'Ưu điểm khi đầu tư tại Tiện Ngay',
        riskReduction: 'Giảm thiểu rủi ro',
        riskReductionContent: 'Minh bạch về số tiền đầu tư và lãi suất thu được. Thông tin giao dịch được bảo mật tuyệt đối.',
        ecosystemNextTech: 'Sản phẩm thuộc hệ sinh thái tập đoàn NextTech.',
        ecosystemNextTechContent: 'Tài sản của bạn được quản lý và bảo vệ bởi công ty thuộc tập đoàn công nghệ hàng đầu NextTech',
        appInvest: 'App đầu tư tài chính 4.0 dành cho người Việt',
        appInvestContent: 'Tiện ích vượt trội giúp Nhà Đầu Tư dễ dàng quản lý dòng tiền và các giao dịch tài chính.',
        flexibleTime: 'Linh hoạt thời hạn',
        flexibleTimeContent: 'Vòng đầu tư với lãi suất linh hoạt từ 3 tháng - 24 tháng.',
        seeInvest: 'Xem các khoản đầu tư',
        stepsInvest: 'Đầu tư với 3 bước đơn giản',
        step1: 'Tải xuống và tạo tài khoản chỉ trong vài giây',
        step2: 'Chọn gói đầu tư phù hợp',
        step3: 'Theo dõi lợi nhuận trả về hàng tháng',
        stepContent: 'Chỉ với ba bước đơn giản bạn đã có thể tối ưu dòng tiền của mình.',
        registerApp: 'Tải miễn phí trên AppStore/ Google Play',
        registerPhone: 'Đăng ký bằng SĐT',
        register1Minute: 'Đăng ký nhanh chóng chỉ với 1 phút',
        investmentReasons: 'Shark "tri kỷ" Nguyễn Hòa Bình chia sẻ 3 lý do nên lựa chọn đầu tư với TienNgay.vn',
        transparency: 'Minh bạch',
        transparencyContent: 'Giấy tờ kinh doanh, pháp lý theo đúng quy định của Nhà nước.',
        lasting: 'Bền vững',
        lastingContent: 'Linh hoạt, sinh lời dài hạn và an toàn.',
        easy: 'Dễ dàng',
        easyContent: 'Người không chuyên cũng có thể tham gia đầu tư với khởi điểm từ 3 triệu đồng.',
        investAttractive: 'Các gói đầu tư hấp dẫn tại Tiện Ngay',
        investors: 'Nhà đầu tư',
        investmentMoney: 'Tiền đầu tư',
        profit: 'Lợi nhuận',
        contentInvest1: 'Gói đầu tư đa dạng với từng khách hàng',
        contentInvest2: 'Lãi xuất lên đến 18%',
        contentInvest3: 'Đầu tư linh động chỉ từ 3 tháng',
        contentProfit1: 'Chi tiết các khoản đầu tư minh bạch',
        contentProfit2: 'Lịch sử trả lãi rõ ràng',
        contentProfit3: 'Lãi luôn về đúng hạn',
        serviceHot: 'Dịch vụ siêu tiện ích',
        downloadApp: 'Tải App ngay hôm nay',
        appMobile: '- App Mobile'
    }
};


export default Languages;
