export interface OverviewMonthOfQuarterModel {
    month: string;
    year: number;
    so_hop_dong_dau_tu: number;
    tong_tien_dau_tu: number;
    tien_goc_thu_ve: number;
    tong_lai_phi: number;
    tong_tien_thu_ve: number;
}

export interface TotalOfQuarterModel {
    tong_hop_dong: number;
    tong_tat_ca_tien_dau_tu: number;
    tien_goc_thu_ve: number;
    tong_lai_phi: number;
}

export interface OverviewQuarterReportModel {
    data: OverviewMonthOfQuarterModel[];
    status: number;
    total: TotalOfQuarterModel
}

export interface OverviewReportModel {
    tong_von_dau_tu: number;
    tong_von_da_nhan: number;
    tong_von_con_lai: number;
    tong_lai_da_nhan: number;
    tong_lai_con_lai: number;
    tong_lai: number;
}
export interface ReportChartModel {
    month?: string;
    type?: string;
    value?: number;
}
