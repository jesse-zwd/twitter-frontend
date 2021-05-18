import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TrashIcon } from "../Icons";

import { deleteComment } from "../../services/api";
import { removeComment } from "../../reducers/tweet";

const DeleteComment = ({ id }) => {
  const dispatch = useDispatch();
  const loading = false;

  const handleDeleteComment = async () => {
    deleteComment(id);
    dispatch(removeComment(id));
    toast.success("Your comment has been deleted");
  };

  return <TrashIcon loading={loading} onClick={handleDeleteComment} />;
};

export default DeleteComment;
