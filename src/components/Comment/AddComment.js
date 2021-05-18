import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import useInput from "../../hooks/useInput";
import Button from "../../styles/Button";
import Avatar from "../../styles/Avatar";
import { addComment } from "../../reducers/tweet";
import http from "../../services/http";

const Wrapper = styled.div`
	display: flex;
	padding: 1rem 1rem;
	border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};

	textarea {
		width: 100%;
		background: inherit;
		border: none;
		font-size: 1.23rem;
		font-family: ${(props) => props.theme.font};
		color: ${(props) => props.theme.primaryColor};
		margin-bottom: 1.4rem;
	}

	.add-comment {
		display: flex;
		flex-direction: column;
	}

	.add-comment-action
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 530px) {
		textarea {
		  font-size: 0.9rem;
		}
	}
`;

const AddComment = ({ id }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const comment = useInput("");

  const loading = false;

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!comment.value) return toast("Reply something");

    try {
      const payload = {
        tweet_id: id,
        text: comment.value,
      };

      http.post(`api/v1/comments`, payload).then((res) => {
        dispatch(addComment(res.data.data));
        toast.success("Your reply has been added");
      });
    } catch (err) {
      return toast.error(err);
    }

    comment.setValue("");
  };

  return (
    <Wrapper>
      <Avatar src={user.avatar} alt="avatar" />

      <form onSubmit={handleAddComment}>
        <div className="add-comment">
          <TextareaAutosize
            cols="48"
            placeholder="Tweet your reply"
            type="text"
            value={comment.value}
            onChange={comment.onChange}
          />

          <div className="add-comment-action">
            <Button sm disabled={loading}>
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddComment;
