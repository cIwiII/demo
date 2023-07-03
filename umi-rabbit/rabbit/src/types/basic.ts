// 登陆参数
export interface ILogin {
    username: string, password: string
}
// 添加菜单参数
export interface IAddMenu {
    menuName: string,
    path: string,
    component: string,
    parentId?: string,
    icon?: string,
    orderNum?: string,
    perms?: string,
    type: string
}

//菜单
export interface IAllMenu {
    id: string, key: string,
    title: string,
    text: string,
    type:string,
    component: string;
    createTime: string;
    hasChildren: boolean;
    hasParent: boolean;
    parentId: string;
    path: string;
    modifyTime?: string;//末级没有
    order?: number;//末级没有
    icon?: string,//末级没有
    permission?: string,//一级没有
    children?: IAllMenu[],
}

//权限菜单
export interface IUserMenu{
    path:string,
    name:string,
    comments:string,
    icon:string,
    redirect?:string,
    children?:any[],
    meta?:{
        closeable?:boolean,isShow?:boolean
    }

}

