
export interface IUser {
    permissions: string[],
    roles: string[],
    exipreTime: string,
    config: {
        userId: number;
        theme: string;
        layout: string;
        multiPage: string;
        fixSiderbar: string;
        fixHeader: string;
        color: string;
    }
}
// 修改服务类别-请求泛型
export interface IPutServe {
    name: string,
    parentId: string|number,
    id: string|number,
}
// 获取参数 商品参数
export interface IGetShopping {
    pageSize: string,
    pageNum: string,
    name: string,
    sortField: string,
    sortOrder: string,
    status: string,
    goodstypeId: string,
}