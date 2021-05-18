import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TrashIcon } from "../Icons";
import { deleteTweet } from "../../services/api";
import { removeTweet } from "../../reducers/feed";

const DeleteTweet = ({ id }) => {
  const dispatch = useDispatch()
  const loading = false;

  const handleDeleteTweet = async () => {
    deleteTweet(id).then(() => {
      toast.success("Your tweet has been deleted");
      dispatch(removeTweet(id))
    });
  };

  return <TrashIcon loading={loading} onClick={handleDeleteTweet} />;
};

export default DeleteTweet;
