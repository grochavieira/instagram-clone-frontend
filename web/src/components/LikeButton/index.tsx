import React, { useContext, useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";

import "./styles.scss";

const LikeButton: React.FC<any> = ({ user, post: { likes, _id } }) => {
  const { trigger, triggerEvent } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like: any) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  async function handleLike() {
    try {
      const token = localStorage.getItem("jwtToken");
      api.post(`post/like/${_id}`, token, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLiked(!liked);
      console.log({ trigger });
      setTimeout(() => {
        triggerEvent(!trigger);
      }, 1000);
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
