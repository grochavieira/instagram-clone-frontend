import React from "react";
import Lottie from "react-lottie";

import animationData from "../../assets/camera-animation.json";
import "./styles.scss";

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
    </div>
  );
}
