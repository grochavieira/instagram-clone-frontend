import React, { useContext, useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { toast } from "react-toastify";

import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

const LikeButton: React.FC<any> = ({ post: { likes, _id } }) => {
  const { user, signOut }: any = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like: any) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  async function handleLike() {
    try {
      await api.post(`post/like/${_id}`);
      setLiked(!liked);
    } catch (err) {
      console.log(err.response.data.errors);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      } else {
        toast.error("não foi possível dar like!");
      }
    }
  }

  return (
    <button
      onClick={handleLike}
      className={liked ? "like unliked" : "like liked"}
    >
      {liked ? <BsHeartFill /> : <BsHeart />}
    </button>
  );
};

export default LikeButton;
