

// 充电桩获取/审核
export interface ICharge {
    pageSize: string,
    pageNum: string,
    shopName: string,
    tel: string,
    managerName: string,
    idCard: string,
}
// 电桩修改状态
export interface IPutCharge {
    shopName: string,
    tel: string,
    address: string,
    idCard: string,
    managerName: string,
    licenceNo: string,
    licenceImg: string,
    idCardImg: string,
    status: string,
    id: string
    lat: string | number,
    lng: string | number,
}

// 商铺获取/审核
export interface IShop {
    shopName: string,
    managerName: string,
    idCard: string,
    pageSize: string,
    pageNum: string,
    status: string,
}
// 修改商铺状态
export interface IPutShop {
    id: string | number,
    shopName: string,
    tel: string,
    address: string,
    managerName: string,
    idCard: string,
    licenceNo: string,
    status: string,

}
// 获取门店（店铺,电桩）
export interface IShopCharge {
    pageSize: string,
    pageNum: string,
    shopName: string,
    status: string,
    sortField: string,
    sortOrder: string,
}
// 修改门店（店铺,电桩）
export interface IPutShopCharge{
    id: string | number,
    status: string | number
}
//商家入驻 
export interface IShopEnter {
    shopName: string,
    tel: string,
    address: string,
    idCard: string,
    managerName: string,
    licenceNo: string,
    type: string,
    licenceImg: string,
    idCardImg: string,
}




// 获取
export interface IUser {
    pageSize: string,
    pageNum: string,
    sortField: string,
    sortOrder: string,
    createTimeFrom: string,
    createTimeTo: string,
    username: string,
    deptId: string
}
// 
export interface IAddUser {
    username: string,
    password: string,
    roleId: string,
    status: string,
    ssex: string,
    email?: string,
    mobile: string,
    deptId: string,
}
// 获取
export interface IRole {
    pageSize: string,
    pageNum: string,
    sortField: string,
    sortOrder: string,
    createTimeFrom: string,
    createTimeTo: string,
    roleName: string,
}
export interface IAddRole {
    roleName: string,
    remark: string,
    menuId: string,
}
// 获取
export interface IMenu {
    menuName: string,
    createTimeFrom: string,
    createTimeTo: string,
}
export interface IAddMenu {
    menuName: string,
    path: string,
    component: string,
    parentId: string,
    icon: string,
    orderNum: string,
    perms: string,
    type: string
}


