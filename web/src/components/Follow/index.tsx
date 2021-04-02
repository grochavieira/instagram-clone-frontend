import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthProvider";

import { toast } from "react-toastify";
import IUser from "../../interfaces/IUser";
import api from "../../services/api";
import "./styles.scss";

interface FollowButtonProps {
  user: IUser;
}

const FollowButton = ({ user }: FollowButtonProps) => {
  const { user: currentUser, updateUser, signOut }: any = useContext(
    AuthContext
  );
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
  }, [currentUser.friends, user.username]);

  async function handleFollow() {
    try {
      const { data } = await api.put("/follow", {
        friendUsername: user.username,
      });
      console.log(data);
      setIsFollowing(!isFollowing);
      await updateUser();
    } catch (err) {
      console.log(err);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      }
    }
  }

  return (
    <>
      <button id="follow" onClick={handleFollow}>
        {isFollowing ? "Não" : ""} Seguir
      </button>
    </>
  );
};

export default FollowButton;
