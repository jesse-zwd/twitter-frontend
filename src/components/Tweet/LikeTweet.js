import React, { useState } from "react";
import { HeartIcon, HeartFillIcon } from "../Icons";
import { deleteLike, newLike } from "../../services/api";

const LikeTweet = ({ id, isLiked, likesCount }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCountState, setLikesCount] = useState(likesCount);

  const handleToggleLike = () => {
    setLiked(!liked);
    if (liked) {
      deleteLike(id).then(() => {
        setLikesCount(likesCountState - 1);
      });
    } else {
      newLike(id).then(() => {
        setLikesCount(likesCountState + 1);
      });
    }
  };

  return (
    <span>
      {liked ? (
        <HeartFillIcon color="#E0245E" onClick={handleToggleLike} />
      ) : (
        <HeartIcon onClick={handleToggleLike} />
      )}
      {likesCountState ? likesCountState : null}
    </span>
  );
};

export default LikeTweet;
