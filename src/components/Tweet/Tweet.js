import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import DeleteTweet from "./DeleteTweet";
import LikeTweet from "./LikeTweet";
import Retweet from "./Retweet";
import { CommentIcon } from "../Icons";
import Avatar from "../../styles/Avatar";
import default_avatar from "../../assets/avatar.jpg";
import TweetFile from "../../styles/TweetFile";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 1.5rem 1rem 1rem 1rem;

  .tweet-info-user {
    display: flex;
  }

  .tweet-info-user span.username {
    font-weight: 500;
  }

  .tweet-info-user span.secondary {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.secondaryColor};
  }

  .tags {
    display: flex;
  }

  span.tag {
    color: ${(props) => props.theme.accentColor};
    margin-right: 0.4rem;
  }

  div.tweet-stats {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;

    div {
      margin-right: 4rem;
      color: ${(props) => props.theme.secondaryColor};
    }

    svg {
      margin-right: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
    }

    span.comment {
      svg {
        position: relative;
        top: 4px;
      }
    }
  }

  @media screen and (max-width: 470px) {
    div.tweet-stats {
      div {
        margin-right: 2.5rem;
      }
    }
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;

    .username {
      display: none;
    }

    .avatar {
      display: none;
    }

    .tweet-info-user span.secondary {
      padding-left: 0;
      padding-right: 0.7rem;
    }
  }
`;

const Tweet = ({ tweet }) => {
  const {
    id,
    text,
    tags,
    user,
    files,
    isTweetMine,
    isLiked,
    likeCount,
    isRetweet,
    retweetCount,
    commentCount,
    created_at,
  } = tweet;

  const strList = text.split(" ");
  const processedText = strList.filter((str) => !str.startsWith("#")).join(" ");
  const tweetTags = tags.split(" ").filter((str) => str.startsWith("#"));

  return (
    <Wrapper>
      <Link to={`/${id}`}>
        <Avatar className="avatar" src={user && user.avatar ? user.avatar : default_avatar} alt="avatar" />
      </Link>

      <div className="tweet-info">
        <div className="tweet-info-user">
          <Link to={`/${id}`}>
            <span className="username">{user && user.username}</span>
            <span className="secondary">{`@${user.nickname}`}</span>
            <span className="secondary">{moment(created_at).fromNow()}</span>
          </Link>
        </div>

        <Link to={`/status/${id}`}>
          <p>{processedText}</p>
        </Link>

        <div className="tags">
          {tweetTags.length
            ? tweetTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))
            : null}
        </div>

        <Link to={`/status/${id}`}>
          {files && files.length && files[0] ? (
            <TweetFile src={files[0].url} alt="tweet-file" />
          ) : null}
        </Link>

        <div className="tweet-stats">
          <div>
            <span className="comment">
              <Link to={`/status/${id}`}>
                <CommentIcon />
                {commentCount ? commentCount : null}
              </Link>
            </span>
          </div>

          <div>
            <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetCount={retweetCount}
            />
          </div>

          <div>
            <LikeTweet id={id} isLiked={isLiked} likesCount={likeCount} />
          </div>

          <div>
            <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Tweet;
