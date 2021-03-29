import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import ReactLoading from "react-loading";

import User from "../../interfaces/User";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const SearchInput = () => {
  const { user, signOut } = useContext<any>(AuthContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  async function handleSearch() {
    setIsLoading(true);
    try {
      if (search.length > 0) {
        const { data } = await api.get(`/users/${search}`);
        setUsers(data);
        console.log(data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.errors.invalid_token) {
        signOut();
        toast.warn("sua sessão acabou!");
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="search-bar">
        <AiOutlineSearch />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Pesquisar"
        />
        <span className="search-bar__loading">
          {isLoading && (
            <ReactLoading type="spin" color="#aaa" height={15} width={25} />
          )}
        </span>
      </div>
      <div className={search !== "" ? "searches" : "searches disabled"}>
        {users.map((user: User) => (
          <div
            onClick={() => {
              history.push(`/profile/${user.username}`);
              setSearch("");
            }}
            key={user._id}
            className="searches__item"
          >
            <img src={user.profilePhoto.url} alt={user.username} />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchInput;
