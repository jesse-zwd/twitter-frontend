import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "./Loader";
import Tweet from "./Tweet/Tweet";
import CustomResponse from "./CustomResponse";
import { getFeed } from "../reducers/feed";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

const FeedList = () => {
  const dispatch = useDispatch()
  const { loading, data } = useSelector((state) => state.feed)
  
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch])
  
  if (loading) return <Loader />;

	// logout the user if removed from db
	if(data === undefined) {
		localStorage.clear();
	}

  return (
    <Wrapper>
      {data?.length ? (
        data?.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};

export default FeedList;
