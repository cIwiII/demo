import fecthData from "../index";

// 获取轮播图
export const bannerRequest = (data,method)=>fecthData("/home/swiperdata",data,method)

// 获取ICON楼层数据
export const iconRequest = (data,method)=>fecthData("/home/catitems")

// 热门数据
export const recommendRequest = ()=> fecthData("/home/floordata")