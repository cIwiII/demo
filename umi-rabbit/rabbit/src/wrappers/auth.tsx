import { Redirect } from 'umi'

export default (props: any) => {
    // useAuth属于用户自定义hook。
    //   const { isLogin } = useAuth();
    const isLogin = false
    if (isLogin) {
        // props.children渲染你访问组件
        return <div>{props.children}</div>;
    } else {
        // 跳转到登录页面
        return <Redirect to="/login" />;
    }
}