import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Post } from "../../interfaces/Post";
import AuthContext from "../../contexts/auth";
import "./styles.scss";

interface PostModalProps {
  post?: Post;
  setIsModalActive(value: boolean): void;
}

const PostModal = ({ post, setIsModalActive }: PostModalProps) => {
  const { user } = useContext<any>(AuthContext);
  const history = useHistory();

  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);

  useEffect(() => {
    if (user.username === post?.username) {
      setIsCurrentUserPost(true);
    }
  }, []);

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
            <div className="post-modal__container__item delete">
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
