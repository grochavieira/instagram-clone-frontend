import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import ReactLoading from "react-loading";

import IUser from "../../interfaces/IUser";
import AuthContext from "../../contexts/AuthProvider";
import api from "../../services/api";
import "./styles.scss";
import { useHistory } from "react-router-dom";

const SearchInput = () => {
  const { signOut } = useContext<any>(AuthContext);
  const history = useHistory();
  const searchRef: any = useRef(null);
  const searchBoxRef: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [showUsers, setShowUsers] = useState(false);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: Event) => {
    if (
      searchRef.current.contains(e.target) ||
      searchBoxRef.current.contains(e.target)
    ) {
      setShowUsers(true);
      return;
    }

    setShowUsers(false);
    setSearch("");
    setUsers([]);
  };

  return (
    <>
      <div ref={searchRef} className="search-bar">
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
      <div
        ref={searchBoxRef}
        className={
          showUsers && search !== "" ? "searches" : "searches disabled"
        }
      >
        {users.map((user: IUser) => (
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
