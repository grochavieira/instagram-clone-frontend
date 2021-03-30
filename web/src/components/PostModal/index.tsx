import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Post } from "../../interfaces/Post";
import PostContext from "../../contexts/PostProvider";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

interface PostModalProps {
  post?: Post;
  setIsModalActive(value: boolean): void;
}

const PostModal = ({ post, setIsModalActive }: PostModalProps) => {
  const { user } = useContext<any>(AuthContext);
  const { getPosts } = useContext(PostContext);
  const history = useHistory();

  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);

  useEffect(() => {
    if (user.username === post?.username) {
      setIsCurrentUserPost(true);
    }
  }, [post, user.username]);

  async function handleDelete() {
    try {
      console.log(post?._id);
      const { data } = await api.delete(`/post/${post?._id}`);
      setIsModalActive(false);
      getPosts();
      toast.success("post deletado com sucesso!");
      history.push("/");
    } catch (err) {
      console.log(err.response.data.errors);
      toast.error("não foi possível deletar o post");
    }
  }

  return (
    <>
      <div className="post-modal">
        <div className="post-modal__container">
          <div
            onClick={() => {
              history.push(`/post/${post?._id}`);
              setIsModalActive(false);
            }}
            className="post-modal__container__item"
          >
            Ir até a Postagem
          </div>
          {isCurrentUserPost && (
            <div
              onClick={handleDelete}
              className="post-modal__container__item delete"
            >
              Deletar Postagem
            </div>
          )}
          <div
            onClick={() => setIsModalActive(false)}
            className="post-modal__container__item"
          >
            Cancelar
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
