import { combineReducers } from "redux";

// reducers
import user from "./user";
import feed from "./feed";
import tweet from "./tweet";
import profile from "./profile";
import whotofollow from "./whotofollow";

export default combineReducers({
    user,
    feed,
    tweet,
    profile,
    whotofollow,
})