/**
 * 无关页面
 */

import React, { useEffect, useState } from "react";
import _ from "lodash";
// 第三放hook
import { useDispatch, useSelector } from "react-redux";
import { incrementAC, decrementAC } from "@/redux/actions";
export default function Main() {
  const dispatch = useDispatch();
  //获取仓库数据

  const { count } = useSelector(state => {
    return state.CountRD;
    // return store.getState('CountRD');
  });

  const add = () => {
    dispatch(incrementAC(20));
  };
  const reduce = () => {
    dispatch(decrementAC(10));
  };
  const dataCheck = () => {
    console.log("分层", _.chunk(["a", "b", "c", "d"], 2));
    const obj = {
      id: 1,
      name: "xiaowang",
      classes: { id: 1 }
    };
    const newobj = _.cloneDeep(obj);
    console.log(newobj, newobj, newobj.classes === obj.classes);
  };
  return (
    <div>
      <p>ReduxComp</p>
      <p>count:{count}</p>
      <button onClick={reduce}>-10</button>
      <button onClick={add}>+20</button><br/>
      <button onClick={dataCheck}>深克隆</button>
    </div>
  );
}
