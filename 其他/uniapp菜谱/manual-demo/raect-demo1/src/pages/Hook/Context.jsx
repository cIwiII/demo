import React, { useContext, useState, createContext,useId } from "react";

const a=1111
export const CountContext = createContext(a); //一个对象，值是undefined


const TestContext = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>父组件点击次数：{count}</p>
      <button type={"primary"} onClick={() => setCount(count + 1)}>
        点击+1
      </button>
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
{React.version}
    </div>
  );
};

const Counter = () => {
  const count = useContext(CountContext);
  console.log(count)
  return (
    <div>
      <p>子组件获得的点击数量：{count}</p>
    </div>
  );
};

export default TestContext;
