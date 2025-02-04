//引入自己的axios
import axios from "../../utils/axiosUtils"
const swiper ={
    getAllSwiper(){
      return axios.get("admin/getAllSwiper")
    },
    addSwiperFile(imgSrc){
      return axios.post("admin/fileUpload",{imgSrc})
    },
    deleSwiperFile(fileName){//上传后返回的名字
      return axios.post("admin/deleteFiles",{fileName})
    },
    addSwiper(obj){//{goods_id,image_src,navigator_url,open_type}
      return axios.post("admin/addSwiper",obj)
    },
    //下架
    updateSwiperShow(_id){
      return axios.post("admin/updateSwiperShow",{_id})
    },
    deleSwiper(_id){
      console.log({_id})
      return axios.get("admin/deleteSwiper",{params:{_id}})
    },
    findSwiper(_id){
      return axios.get("admin/findByIdSwiper",{params:{_id}})
    },
    updateSwiper(obj){//{_id,goods_id,image_src}
      return axios.post("admin/updateSwiper",obj)
    },
  }
  export default swiper