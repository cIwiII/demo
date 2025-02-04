export interface IState {
    users:IUser[]
}
export interface IUser {
    id:number,
    name:string,
    phone:string,
    check:boolean
}