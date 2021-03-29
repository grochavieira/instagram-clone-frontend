import React, { useState, useEffect, useContext } from "react";
import { FiCamera } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";

const PostContent = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [caption, setCaption] = useState("");
  const [isFileImage, setIsFileImage] = useState(true);
  const [previewFile, setPreviewFile] = useState<any>();

  const history = useHistory();

  async function handlePost() {
    setIsLoading(true);
    const data = new FormData();

    console.log(selectedFile);

    if (caption) {
      data.append("caption", caption);
    }

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      if (user) {
        const { data: response } = await api.post(`/post`, data);
        if (response.post) {
          setIsLoading(false);
          toast.success("Post criado com sucesso!");
          history.push("/");
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.response.data);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      } else {
        toast.error("Não foi possível criar o post!");
      }
    }
  }

  const getFile = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    if (e.target.files[0].type.includes("image")) {
      setIsFileImage(true);
    } else {
      setIsFileImage(false);
    }

    console.log(e.target.files[0].type);

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="post-content">
        <div className="post-content__post">
          <div className="post-content__post__image">
            {isFileImage ? (
              <img src={previewFile} />
            ) : (
              <video controls preload="auto" width="100%" src={previewFile} />
              // <video src={previewFile} autoPlay />
            )}
          </div>
          <div className="post-content__post__caption">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              type="text"
            />
          </div>
          <div className="post-content__post__publish">
            <button onClick={handlePost}>Postar</button>
          </div>
        </div>
        <div className="post-content__button">
          <label htmlFor="media">
            <FiCamera />
          </label>
          <input id="media" onChange={getFile} type="file" name="media" />
        </div>
      </div>
    </>
  );
};

export default PostContent;
