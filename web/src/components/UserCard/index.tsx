import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import "./styles.scss";

const UserCard = ({ user }: any) => {
  const { user: mainUser } = useContext<any>(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    async function setFollowers() {
      const { data } = await api.get(`/user/${mainUser.id}`);
      if (
        data &&
        data.friends.find((friend: any) => friend.username === user.username)
      ) {
        setFollowed(true);
      } else setFollowed(false);
    }
    setFollowers();
  }, [mainUser, user]);

  async function handleFollow() {
    try {
      const token = localStorage.getItem("jwtToken");
      await api.post(
        `/follow`,
        { friendUsername: user.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
        setFollowed(!followed);
      }, 500);
    } catch (err) {
      console.log(err.response.data.errors);
    }
  }

  return (
    <div className="user">
      <div className="user__section">
        <div className="user__section__photo">
          <img src={user.profilePhotoUrl} />
        </div>
        <div className="user__section__info">
          <p>
            <strong>{user.username}</strong>
          </p>
          <p>{user.name}</p>
        </div>
      </div>
      <div className="user__follow">
        <button onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
