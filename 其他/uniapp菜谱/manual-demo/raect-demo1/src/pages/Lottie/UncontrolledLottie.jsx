import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "./demo";

/**
 * 不受控制的 动画
 */
class UncontrolledLottie extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        <p>不受外部操纵的基础动画，默认点击动画暂停或播放</p>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
}

export default UncontrolledLottie;
