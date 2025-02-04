
/**
 * 组件全局批量注册
 */
import AllComponent from "@/components/AllComponent.vue";

export default {
  install(Vue:any) {
    //注册全局组件，依次加入
    Vue.component("AllComponent", AllComponent);
    // Vue.componet('FixedBottom ',FixedBottom )
  }
};
