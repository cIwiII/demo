import fecthData from "./http"
//首页轮播图
const swiperData=()=>{
	return fecthData('home/swiperdata')
}
//首页分类
const catitems=()=>{
	return fecthData('home/catitems')
}
//首页楼层
const floorsData=()=>{
	return fecthData('home/floorsdata')
}
//首页推荐商品
const recommend=()=>{
	return fecthData('home/recommend')
}
export default {
	swiperData,catitems,floorsData,recommend
}

