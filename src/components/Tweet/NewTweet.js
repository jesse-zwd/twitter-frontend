import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../hooks/useInput";
import Button from "../../styles/Button";
import TweetFile from "../../styles/TweetFile";
import { UploadFileIcon } from "../Icons";
import Avatar from "../../styles/Avatar";
import { uploadImage } from "../../utils";
import { addTweet } from "../../reducers/feed";
import http from "../../services/http";

const Wrapper = styled.div`
  display: flex;
  padding: 1rem 1rem;
  border-bottom: 7px solid ${(props) => props.theme.tertiaryColor};

  textarea {
    width: 100%;
    background: inherit;
    border: none;
    font-size: 1.23rem;
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 1.4rem;
  }

  .new-tweet {
    display: flex;
    flex-direction: column;
  }

  .new-tweet-action {
    display: flex;
    align-items: center;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.accentColor};
    margin-right: 2rem;
    cursor: pointer;
  }

  button {
    position: relative;
  }
`;

const NewTweet = () => {
  const dispatch = useDispatch();

  const [tweetFiles, setTweetFiles] = useState([]);
  const tweet = useInput("");
  const { avatar } = useSelector((state) => state.user.data);

  const loading = false;
  const handleNewTweet = async (e) => {
    e.preventDefault();

    if (!tweet.value) return toast("Write something");

    const tags = tweet.value
      .split(" ")
      .filter((str) => str.startsWith("#"))
      .join(" ");
    const text = tweet.value
      .split(" ")
      .filter((str) => !str.startsWith("#"))
      .join(" ");

    try {
      const payload = {
        text,
        files: [{ url: "http://localhost:3000/images/05.jpg" }],
        tags,
      };
      
      http.post(`api/v1/tweets`, payload).then((res) => {
        dispatch(addTweet(res.data.data));
        toast.success("Your tweet has been posted");
      });
    } catch (err) {
      return toast.error(err);
    }

    tweet.setValue("");
    setTweetFiles([]);
  };

  const handleTweetFiles = async (e) => {
    const url = await uploadImage(e.target.files[0]);
    setTweetFiles([...tweetFiles, { url: url }]);
    console.log(tweetFiles);
  };

  return (
    <Wrapper>
      <Avatar src={avatar} alt="avatar" />
      <form onSubmit={handleNewTweet}>
        <div className="new-tweet">
          <TextareaAutosize
            cols="48"
            placeholder="What's happening?"
            type="text"
            value={tweet.value}
            onChange={tweet.onChange}
          />

          {tweetFiles[0] && (
            <TweetFile newtweet src={tweetFiles[0]} alt="preview" />
          )}

          <div className="new-tweet-action">
            <div className="svg-input">
              <label htmlFor="file-input">
                <UploadFileIcon />
              </label>
              <input
                id="file-input"
                accept="image/*"
                type="file"
                onChange={handleTweetFiles}
              />
            </div>
            <Button sm disabled={loading}>
              Tweet
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default NewTweet;
