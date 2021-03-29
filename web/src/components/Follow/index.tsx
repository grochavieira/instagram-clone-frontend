import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth";

import { toast } from "react-toastify";
import User from "../../interfaces/User";
import api from "../../services/api";
import "./styles.scss";

interface FollowButtonProps {
  user: User;
}

const FollowButton = ({ user }: FollowButtonProps) => {
  const { user: currentUser, updateUser }: any = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function checkUserFollow() {
      if (
        currentUser.friends.find(
          (friend: any) => friend.username === user.username
        )
      ) {
        setIsFollowing(true);
      }
    }
    checkUserFollow();
  }, []);

  async function handleFollow() {
    try {
      const { data } = await api.put("/follow", {
        friendUsername: user.username,
      });
      console.log(data);
      toast.success(
        `Agora você está ${isFollowing ? "não" : ""} seguindo ${user.username}`
      );
      setIsFollowing(!isFollowing);
      await updateUser();
    } catch (err) {
      console.log(err);
      toast.success(`Não foi possível seguir o usuário ${user.username}`);
    }
  }

  return (
    <>
      <button id="follow" onClick={handleFollow}>
        {" "}
        {isFollowing ? "Não" : ""} Seguir
      </button>
    </>
  );
};

export default FollowButton;
