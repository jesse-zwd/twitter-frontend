import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RetweetIcon, RtFillIcon } from "../Icons";
import { getFeed } from "../../reducers/feed";
import { newRetweet, deleteRetweet } from "../../services/api";

const Retweet = ({ id, isRetweet, retweetCount }) => {
  const [retweet, setRetweet] = useState(isRetweet);
  const [retweetsCountState, setRetweetsCount] = useState(retweetCount);
  const dispatch = useDispatch();

  const handleRetweet = async () => {
    try {
      setRetweet(!retweet);
      if (retweet) {
        deleteRetweet(id).then(() => {
          setRetweetsCount(retweetsCountState - 1);
          toast.success("Retweet removed");
          dispatch(getFeed());
        });
      } else {
        newRetweet(id).then(() => {
          setRetweetsCount(retweetsCountState + 1);
          toast.success("Retweet done");
          dispatch(getFeed());
        });
      }
    } catch (err) {
      return toast.error(err);
    }
  };

  return (
    <span>
      {retweet ? (
        <RtFillIcon color="#17BF63" onClick={handleRetweet} />
      ) : (
        <RetweetIcon onClick={handleRetweet} />
      )}
      {retweetsCountState ? retweetsCountState : null}
    </span>
  );
};

export default Retweet;
