import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from "./demo";

/**
 * 受控动画
 */
class ControlledLottie extends Component {
  state = { isStopped: false, isPaused: false };

  render() {
    const buttonStyle = {
      display: 'inline-block',
      margin: '10px auto',
      marginRight: '10px',
      border: 'none',
      color: 'white',
      backgroundColor: '#647DFF',
      borderRadius: '2px',
      fontSize: '15px',
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <div className="controlled">
        <p>受控动画，</p>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: true })}
        >
          Stop 停止
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: false, isPaused: false })}
        >
          Play 播放
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isPaused: !this.state.isPaused })}
        >
          Pause 暂停
        </button>
      </div>
    );
  }
}

export default ControlledLottie;
