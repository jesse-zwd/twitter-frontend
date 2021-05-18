import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../styles/Button";
import {newFollow, deleteFollow} from "../../services/api";

const Follow = ({ isFollowing, id, sm = false, relative = false }) => {
  const [followState, setFollowState] = useState(isFollowing);

  const handleFollow = async () => {
    if (followState) {
      setFollowState(false);
      try {
        deleteFollow(id)
      } catch (err) {
        toast.error(err);
      }
    } else {
      setFollowState(true);
      try {
        newFollow(id)
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <Button outline sm={sm} relative={relative} onClick={handleFollow}>
      {followState ? "Following" : "Follow"}
    </Button>
  );
};

export default Follow;
