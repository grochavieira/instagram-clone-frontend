import React from "react";

import Header from "../../components/Header";
import Post from "../../components/Post";

import "./styles.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="main-container">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="side-container"></div>
      </div>
    </>
  );
};

export default Home;
