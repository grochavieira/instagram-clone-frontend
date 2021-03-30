import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Post } from "../interfaces/Post";
import User from "../interfaces/User";
import api from "../services/api";

interface PostContextData {
  posts: Post[];
  getPosts(): void;
}

const PostContext = createContext<PostContextData>({} as PostContextData);

export const PostProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<Post[] | any>([]);

  async function getPosts() {
    try {
      const { data } = await api.get("/post");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PostContext.Provider value={{ posts, getPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
