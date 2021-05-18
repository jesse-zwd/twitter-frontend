import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Container from "./styles/Container";

import Nav from "./components/Layout/Nav";
import Home from "./pages/Home";
import MainTweet from "./components/Tweet/MainTweet";
import Profile from "./components/Profile/Profile";
import Bookmarks from "./pages/Bookmarks";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Suggestion from "./pages/Suggestion";
import EditProfile from "./components/Profile/EditProfile";

const AppRouter = () => {
  return (
    <Router>
      <Nav />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route exact path={`/status/:tweetId`} component={MainTweet} />
          <Route exact path={`/settings/profile`} component={EditProfile} />
          <Route exact path={`/:id`} component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
        <Suggestion />
      </Container>
    </Router>
  );
};

export default AppRouter;
