import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

import {
  SocketPostProps,
  SocketNotificationProps,
} from "../../interfaces/Socket";
import { Post as IPost } from "../../interfaces/Post";
import Post from "../../components/Post";
import PostModal from "../../components/PostModal";
import PostLoading from "../../components/Shimmer/PostLoading";
import OnlineFriendsLoading from "../../components/Shimmer/OnlineFriendsLoading";
import UserProfileLoading from "../../components/Shimmer/UserProfileLoading";
import { useSocket } from "../../contexts/SocketProvider";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

const Home = () => {
  const socket = useSocket();
  const { user, signOut } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPost | any>({});
  const [isModalActive, setIsModalActive] = useState(false);
  const [posts, setPosts] = useState<IPost[] | any>([]);

  async function getPosts() {
    try {
      const { data } = await api.get("/post");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (socket == null) return;

    socket.on("post-created", ({ post: updatedPost }: SocketPostProps) => {
      if (
        user.friends.find(
          (friend: any) => friend.username === updatedPost.username
        )
      )
        setPosts([...posts, updatedPost]);
    });

    socket.on("post-deleted", ({ post: updatedPost }: SocketPostProps) => {
      if (
        user.username === updatedPost.username ||
        user.friends.find(
          (friend: any) => friend.username === updatedPost.username
        )
      ) {
        const newPosts = posts.filter(
          (post: IPost) => post._id !== updatedPost._id
        );
        setPosts(newPosts);
      }
    });
  }, [posts, socket, user.friends, user.username]);

  useEffect(() => {
    async function loadPosts() {
      try {
        getPosts();
      } catch (err) {
        console.log(err);
        if (err.response.data.errors.invalid_token) {
          signOut();
          toast.warn("sua sessão acabou!");
        }
      }
    }
    loadPosts();
    return () => {
      setPosts([]);
    };
  }, [signOut]);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      {isModalActive && (
        <PostModal setIsModalActive={setIsModalActive} post={selectedPost} />
      )}
      <div className="home">
        <div className="home__main">
          {isLoading ? (
            <>
              <OnlineFriendsLoading />
              <PostLoading />
            </>
          ) : (
            <>
              <div className="home__main__online-friends"></div>
              {[...posts].reverse().map((post: IPost) => (
                <Post
                  key={post._id}
                  setSelectedPost={setSelectedPost}
                  setIsModalActive={setIsModalActive}
                  post={post}
                />
              ))}
            </>
          )}
        </div>
        <div className="home__aside">
          <div className="home__aside__profile">
            {isLoading ? (
              <UserProfileLoading />
            ) : (
              <>
                <div className="home__aside__profile__photo">
                  <img
                    src={
                      user.profilePhoto !== null ? user.profilePhoto.url : ""
                    }
                    alt={user.username}
                  />
                </div>
                <div className="home__aside__profile__info">
                  <p className="home__aside__profile__info__username">
                    {user.username}
                  </p>
                  <p className="home__aside__profile__info__name">
                    {user.name}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
