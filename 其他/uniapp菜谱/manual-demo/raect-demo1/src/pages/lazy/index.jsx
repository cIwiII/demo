import React from "react";

function Index() {
  const click = () => {
    // 使用才加载
    import("./math").then(math => {
      console.log(math.add(16, 26));
    });
  };
  return <div onClick={click}>math</div>;
}

export default Index;
