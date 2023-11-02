// Responsetype of District
export interface District {
    id: number;
    district_name: string;
    district_code: string;
}
// Responsetype for Zone
export interface Zone {
    id: number;
    district_id: number;
    zone: string;
    zone_code: string;
}
// Responsetype for Area
export interface Area {
    id: number;
    zone_id: number;
    area: string;
    area_code: string;
}
// Responsetype for complaint
export interface Complaint {
    id: number;
    user_id: number;
    consumer_id: string;
    issue_details: string;
    status: string;
    complain_date: string;
    solved_date: string;
    remark: string;
    solved_by: string;
    landmark:string;

}

