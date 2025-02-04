// --用户请求interface--
export interface IUserAdd{
    account:string,password:string,email:string,role:string
}
//--产品请求interface----
export interface IProductAdd{
    name:string,title:string,price:number,type:string,imgSrc:string,msg:string
}
export interface IProductDele{
    id:string,price:number,type:string
}
export interface IProductSearch{
    searchType:string,searchData:string
}

//---user页面state----
export interface IUserState{
    data:any[],roleData:any[],addUserObj:IUserAdd
}

export interface IProduct {
    name:string
    title:string
    price:number
    type:string
    imgSrc:string
    msg:string
}
