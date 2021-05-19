import React from "react";
import styled from "styled-components";
import CustomResponse from "../CustomResponse";
import Tweet from "../Tweet/Tweet";
import Loader from "../Loader";

const Wrapper = styled.div`
	position: relative;
`;

const SearchResultTweets = ({ tweets, loading }) => {
	if (loading) return <Loader />;

	if (tweets === undefined)
		return (
			<CustomResponse text="Use the search bar to find tags, people and tweets" />
		);

	return (
		<Wrapper>
			{tweets?.length ? (
				tweets.map(tweet => (
					<Tweet key={tweet.id} tweet={tweet} />
				))
			) : (
				<CustomResponse text="No tweets found, try a different search" />
			)}
		</Wrapper>
	);
};

export default SearchResultTweets;
