import http from "./http";

export const deleteTweet = async (id) => {
  http.delete(`api/v1/tweet/${id}`);
};

export const newRetweet = async (id) => {
  http.post(`api/v1/retweet`, { tweet_id: id });
};

export const deleteRetweet = async (id) => {
  http.delete(`api/v1/retweet/${id}`);
};

export const deleteLike = async (id) => {
  http.delete(`api/v1/like/${id}`);
};

export const newLike = async (id) => {
  http.post(`api/v1/like`, { tweet_id: id });
};

export const deleteComment = async (id) => {
  http.delete(`api/v1/comment/${id}`);
};

export const newFollow = async (id) => {
  http.post(`api/v1/follow`, { following: id });
};

export const deleteFollow = async (id) => {
  http.delete(`api/v1/follow/${id}`);
};

export const updateUser = async (payload) => {
  http.put(`api/v1/user`, payload);
};
