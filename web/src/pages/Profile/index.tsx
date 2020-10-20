import React, { useContext, useState, useEffect } from "react";
import { BsGearWide, BsBookmark } from "react-icons/bs";
import { MdGridOn, MdFlashOn } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";
import Header from "../../components/Header";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import "./styles.scss";
import Footer from "../../components/Footer";
import ProfileLoading from "../../components/Shimmer/ProfileLoading";

const Profile = () => {
  const { user: userData } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [userPosts, setUserPosts] = useState<any>([]);

  useEffect(() => {
    async function loadUserData() {
      const token = localStorage.getItem("jwtToken");
      const { data } = await api.get(`/user/${userData.id}`);
      const { data: posts } = await api.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setUserPosts(posts);
      console.log(posts);
    }
    loadUserData();
  }, [userData.id]);

  setInterval(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      <Header currentPage="profile" />
      <div className="profile">
        {isLoading ? (
          <ProfileLoading />
        ) : (
          <>
            <main className="profile__main">
              <div className="profile__main__image">
                <img src={user.profilePhotoUrl} alt="user" />
              </div>
              <div className="profile__main__info">
                <div className="profile__main__info__username">
                  {user.username}
                  <button>Editar perfil</button>
                  <BsGearWide />
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
              <div className="profile__bar__item">
                {" "}
                <MdFlashOn /> IGTV
              </div>
              <div className="profile__bar__item">
                <BsBookmark /> Salvos
              </div>
              <div className="profile__bar__item">
                <BiUserPin />
                Marcados
              </div>
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

      {/* <Footer /> */}
    </>
  );
};

export default Profile;
