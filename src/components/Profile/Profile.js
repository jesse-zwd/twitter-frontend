import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import ProfileInfo from "./ProfileInfo";
import Tweet from "../Tweet/Tweet";
import Loader from "../Loader";
import { getProfile, clearProfile } from "../../reducers/profile";

const Wrapper = styled.div`
	padding-bottom: 5rem;

  .profile-top {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    span.tweetsCount {
      margin-top: 0.1rem;
      color: ${(props) => props.theme.secondaryColor};
      font-size: 0.9rem;
    }
  }
`;

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const { data: profile, loading } = useSelector(state => state.profile)
  
  useEffect(() => {
    dispatch(getProfile(id))
    return () => {
      dispatch(clearProfile())
    }
  }, [dispatch, id])

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <div className="profile-top">
          <span>{profile && profile.username}</span>
          <span className="tweetsCount">
            {profile && profile.tweetCount
              ? `${profile.tweetCount} Tweets`
              : "No Tweets"}
          </span>
        </div>
      </Header>
      <ProfileInfo profile={profile} />
      {profile && profile.tweets && profile.tweets.length
        ? profile.tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        : null}
    </Wrapper>
  );
};

export default Profile;
