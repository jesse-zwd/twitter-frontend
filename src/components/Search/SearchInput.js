import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import SearchResult from "./SearchResult";
import http from "../../services/http";

const Wrapper = styled.div`
  margin: 1rem 0;
  margin-left: 1rem;

  input {
    height: 40px;
    width: 70%;
    border-radius: 30px;
    background: ${(props) => props.theme.tertiaryColor2};
    border: ${(props) => props.theme.tertiaryColor2};
    color: ${(props) => props.theme.secondaryColor};
    font-family: ${(props) => props.theme.font};
    font-size: 1rem;
    padding-left: 1.2rem;
  }

  @media screen and (max-width: 530px) {
    input {
      font-size: 0.9rem;
    }
  }
`;

const SearchInput = () => {
  const term = useInput("");

  const [searchTagData, setSearchTagData] = useState([]);
  const [searchTagLoading, setSearchTagLoading] = useState(false);
  const [searchTweetData, setSearchTweetData] = useState([]);
  const [searchTweetLoading, setSearchTweetLoading] = useState(false);
  const [searchUserData, setSearchUserData] = useState([]);
  const [searchUserLoading, setSearchUserLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!term.value) {
      return toast.error("Enter something to search");
    }

    try {
      // search
      const searchItem = term.value;
      setSearchTagLoading(true);
      setSearchUserLoading(true);
      setSearchTweetLoading(true);
      http.get(`api/v1/searchUser/${searchItem}`).then((res) => {
        setSearchUserData(res.data.data);
        setSearchUserLoading(false);
      });
      http.get(`api/v1/searchTweetByTags/${searchItem}`).then((res) => {
        setSearchTagData(res.data.data);
        setSearchTagLoading(false);
      });
      http.get(`api/v1/searchTweetByText/${searchItem}`).then((res) => {
        setSearchTweetData(res.data.data);
        setSearchTweetLoading(false);
      });
    } catch (err) {
      toast.error(err);
    }
    term.setValue("");
  };

  return (
    <>
      <Wrapper>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            placeholder="Search by tags, tweets, people"
            type="text"
            value={term.value}
            onChange={term.onChange}
          />
        </form>
      </Wrapper>
      <SearchResult
        searchTagLoading={searchTagLoading}
        searchTweetLoading={searchTweetLoading}
        searchUserLoading={searchUserLoading}
        tags={searchTagData}
        users={searchUserData}
        tweets={searchTweetData}
      />
    </>
  );
};

export default SearchInput;
