import React, { useContext } from "react";
import { ThemeContext } from "./Context2";

export default class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = React.createContext(ThemeContext);

  render() {
    // console.log(this.contextType)
    return <p>12312{this.context}</p>
  }
}
/* export default () => {
  const contextType = useContext(ThemeContext);
  return <p>12312{contextType}</p>;
};
 */