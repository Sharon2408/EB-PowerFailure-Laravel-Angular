// Responsetype of user registered details
export interface Registration{
name:string;
email:string;
phone_no:string;
password:string;
role_id:string;
loginType:string;
}
// Responsetype Bearer token
export interface Authorisation {
    token:string;
    user:string;
    type:string;
}
//   Response type user login credentials 
export interface Login{
    user:Registration
    authorisation:Authorisation
}

