import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";
import Avatar from "../styles/Avatar";
import Follow from "./Profile/Follow";
import Button from "../styles/Button";
import default_avatar from "../assets/avatar.jpg";
import { getUsers, clearWhoToFollow } from "../reducers/whotofollow";

const Wrapper = styled.div`
	margin-left: 0.4rem;
	width: 350px;
	background: ${props => props.theme.tertiaryColor2};
	border-radius: 10px;

	div:last-child {
		border-bottom: none;
	}
`;

const UserWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem 1rem;
	border-bottom: 1px solid ${props => props.theme.tertiaryColor};
	font-size: 0.9rem;

	button {
		align-self: flex-start;
	}

	.avatar-handle {
		display: flex;

		img {
			margin-right: 1rem;
		}
	}

	.handle-fullname {
		display: flex;
		flex-direction: column;

		span:first-child {
			font-weight: 500;
		}

		span.secondary {
			color: ${props => props.theme.secondaryColor};
		}
	}
`;

export const User = ({ user }) => (
		
	<UserWrapper>
		<div className="avatar-handle">
			<Link to={`/${user && user.id}`}>
				<Avatar src={user && user.avatar ? user.avatar : default_avatar} alt="avatar" />
			</Link>

			<div className="handle-fullname">
				<Link to={`/${user && user.id}`}>
					<span>{user && user.username}</span>
				</Link>
				<span className="secondary">@{user && user.nickname}</span>
			</div>
		</div>

		{user && !user.isMe ? (
			<Follow sm id={user && user.id} isFollowing={user && user.isFollowing} />
		) : (
			<Link to="/settings/profile">
				<Button sm outline className="action-btn">
					Edit Profile
				</Button>
			</Link>
		)}
	</UserWrapper>
);

const WhoToFollow = () => {
	const dispatch = useDispatch()
	const { loading, users } = useSelector(state => state.whotofollow)

	useEffect(() => {
		dispatch(getUsers())
		return () => {
			dispatch(clearWhoToFollow())
		}
	}, [dispatch])

	if (loading) return <Loader />;  
	
	return (
		<Wrapper>
			<Header>Who to follow</Header>
			{users.map(user => (
				<User key={user.id} user={user} />
			))}
		</Wrapper>
	);
};

export default WhoToFollow;
