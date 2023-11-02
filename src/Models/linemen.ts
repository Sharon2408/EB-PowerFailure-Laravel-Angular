// Response types for linemen Details
export interface Linemen {
    id: number;
    lineman_id: string;
    name: string;
    email: string;
    email_verified_at: string;
    password: string
    remember_token: string
    phone_no: string;
    role_id: number;
    created_at: string;
    updated_at: string
}
// Responsetype of Task
export interface Task {
    complaint_id: number;
    lineman_id: number;
}
// Responsetype of Tasks assigned to Lineman
export interface LinemanViewTask {
    id: number;
    user_id: number;
    consumer_id: string;
    issue_details: string;
    landmark: string;
    status: number;
    complained_date: string;
    solved_date: string;
    remark: string;
    solved_by: string;
    created_at: string;
    updated_at: string;
    complaint_id: number;
    lineman_id: number
}
// Response type of status
export interface status {
    id: number;
    status_name: string;
}
// Response type of Updatestatus
export interface Updatestatus {
    complaint_id: number;
    task_id: number;
    status_id: number;
}
