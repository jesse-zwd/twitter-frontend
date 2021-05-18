import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { lightTheme } from "../../styles/themes";
import { UserIcon } from "../Icons";
import AuthService from "../../services/auth";
import { logout } from "../../reducers/user";

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 0.7rem;
  margin-bottom: 1rem;
  cursor: pointer;

  p {
    margin-left: 0.4rem;
  }
`;

const Logout = () => {
  const theme = lightTheme;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    AuthService.logout();
  };

  return (
    <Wrapper onClick={handleLogout}>
      <UserIcon sm color={theme.accentColor} />
      <span>Logout</span>
    </Wrapper>
  );
};

export default Logout;
