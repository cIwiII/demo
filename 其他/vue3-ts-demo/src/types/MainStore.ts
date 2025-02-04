export interface IUser {
    id:number,
    name:string
}
export interface IRootState {
    username:string,
    users:IUser[],
    count:number
}