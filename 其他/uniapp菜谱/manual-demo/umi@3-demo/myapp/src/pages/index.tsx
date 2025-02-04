// // import styles from './index.less';
import "./index.less"
import {Button} from "antd"
import {Link,history} from "umi"


export default function IndexPage() {
  const check = ()=>{
    console.log(123);
    history.push("/home")
  }
  return (
    <div>
      <h1 className="title">Page index</h1>
      <Button type="default">提交</Button>
      <Link to="/home">主页</Link>
    </div>
  );
}