import React,  { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Loader from "../Loader";
import Tweet from "./Tweet";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";
import CustomResponse from "../CustomResponse";
import { getTweet, clearTweet } from "../../reducers/tweet";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

const MainTweet = () => {
  const { tweetId } = useParams();
  const dispatch = useDispatch();
  const { data: tweet, loading } =  useSelector(state => state.tweet)
  
  useEffect(() => {
    dispatch(getTweet(tweetId))
    return () => {
      dispatch(clearTweet())
    }
  }, [dispatch, tweetId])

  const comments =
    tweet && tweet.comments && tweet.comments.length
      ? tweet.comments
      : [];
  
  return (
    <Wrapper>
      <Header>
        <span>Tweet</span>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {tweet && tweet.id ? (
            <Tweet tweet={tweet} />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to be exist." />
          )}
          {tweet && tweet.id ? (
            <AddComment id={tweet.id} />
          ) : null}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default MainTweet;
