import React, { useContext, useState, useEffect } from "react";
import { BsGearWide, BsBookmark } from "react-icons/bs";
import { MdGridOn, MdFlashOn } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";

import FollowButton from "../../components/Follow";
import ProfileLoading from "../../components/Shimmer/ProfileLoading";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";
import { useLocation } from "react-router";
import User from "../../interfaces/User";

const Profile = () => {
  const { user: currentUser } = useContext<any>(AuthContext);

  const { pathname } = useLocation();
  const username = pathname.replace("/profile/", "");
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    profilePhoto: {
      url: "",
      publicId: "",
    },
    username: "",
    friends: [],
  });

  useEffect(() => {
    async function loadUserData() {
      setIsLoading(true);
      const { data: userData } = await api.get(`/user/${username}`);
      const { data: posts } = await api.get(`/posts/${username}`);
      setIsLoading(false);
      setUserPosts(posts);
      setUser(userData);
    }
    loadUserData();
  }, [username]);

  setInterval(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      <div className="profile">
        {isLoading ? (
          <ProfileLoading />
        ) : (
          <>
            <main className="profile__main">
              <div className="profile__main__image">
                <img src={user.profilePhoto.url} alt="user" />
              </div>
              <div className="profile__main__info">
                <div className="profile__main__info__username">
                  {user.username}
                  {user.username !== currentUser.username ? (
                    <FollowButton key={user._id} user={user} />
                  ) : (
                    <>
                      <button>Editar perfil</button> <BsGearWide />
                    </>
                  )}
                </div>
                <div className="profile__main__info__social">
                  <div className="profile__main__info__social__item">
                    <strong>{userPosts.length}</strong> publicações
                  </div>
                  <div className="profile__main__info__social__item">
                    <strong>{user.friends ? user.friends.length : 0}</strong>{" "}
                    seguindo
                  </div>
                </div>
                <div className="profile__main__info__name">
                  <strong>{user.name}</strong>
                </div>
              </div>
            </main>
            <div className="profile__bar">
              <div className="profile__bar__item active">
                <MdGridOn /> Publicações
              </div>
              {/* <div className="profile__bar__item">
                {" "}
                <MdFlashOn /> IGTV
              </div>
              <div className="profile__bar__item">
                <BsBookmark /> Salvos
              </div>
              <div className="profile__bar__item">
                <BiUserPin />
                Marcados
              </div> */}
            </div>
            <div className="profile__content">
              <div className="profile__content__publications">
                {userPosts &&
                  userPosts.map((post: any) => (
                    <div key={post._id}>
                      {post.postUrl.includes(".mp4") ? (
                        <video src={post.postUrl} />
                      ) : (
                        <img src={post.postUrl} alt="" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
