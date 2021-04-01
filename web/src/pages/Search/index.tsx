import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import ReactLoading from "react-loading";

import User from "../../interfaces/User";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";

const Search = () => {
  const { signOut } = useContext<any>(AuthContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function handleSearch() {
      setIsLoading(true);
      try {
        if (search.length > 0) {
          const { data } = await api.get(`/users/${search}`);
          setUsers(data);
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

    handleSearch();
  }, [search, signOut]);
  return (
    <>
      <div className="search-page">
        <div className="search-page__input">
          <AiOutlineSearch />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Pesquisar usuários..."
          />
          <span className="search-page__input__loading">
            {isLoading && (
              <ReactLoading type="spin" color="#aaa" height={15} width={25} />
            )}
          </span>
        </div>
        {users.length > 0 ? (
          <div className="search-page__searches">
            {users.map((user: User) => (
              <div
                onClick={() => {
                  history.push(`/profile/${user.username}`);
                  setSearch("");
                }}
                key={user._id}
                className="search-page__searches__item"
              >
                <img src={user.profilePhoto.url} alt={user.username} />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Search;
