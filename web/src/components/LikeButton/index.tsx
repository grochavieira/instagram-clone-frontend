import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";

import api from "../../services/api";

import "./styles.scss";

const LikeButton: React.FC<any> = ({ user, post: { likes, _id } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like: any) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  async function handleLike() {
    try {
      const token = localStorage.getItem("jwtToken");
      api.post(`post/like/${_id}`, token);
      setLiked(!liked);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  }

  return (
    <button
      onClick={handleLike}
      className={liked ? "like unliked" : "like liked"}
    >
      <BsHeartFill />
    </button>
  );
};

export default LikeButton;
