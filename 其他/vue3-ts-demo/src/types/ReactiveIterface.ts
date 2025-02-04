export interface IUser {
    id: number,
    name: string,
    address: string
}
export interface IState {
    users:IUser[],
    array:number[]
}


// -------product接口编写-------
export interface IType {
    _id: string;
    name: string;
    parentId: string;
    type: string;
    updateDate: null;
}
export interface IProduct {
    _id: string;
    name: string;
    title: string;
    price: number;
    type: IType | null;
    imgSrc: string;
    msg: string;
    delstate: number;
    state: number
}
export interface IUserPro {
    users: IProduct[]
}

// ----demo1中奖----------
export interface IList {
    id: number;
    name: string;
    tel: string;
    check:boolean
}
export interface Isuij {
    list: IList[];
    status: boolean;
    listing:number[];
    timer:any
}

// ------Fivestar.vue----
export interface IStar {
    id: number;
    title: string;
    check:boolean
}
export interface IStarTatol {
    list: IStar[];

}
export interface Iapp {
    appra: any,
    AppraLIst: IStar[],
    value: string
}