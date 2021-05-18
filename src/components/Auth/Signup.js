import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import Input from ".././Input";
import Button from "../../styles/Button";
import Form from "../../styles/Form";
import { signup } from "../../reducers/user";

const Signup = ({ setAuth }) => {
  const dispatch = useDispatch();

  const nickname = useInput("");
  const username = useInput("");
  const email = useInput("");
  const password = useInput("");
  const password_confirm = useInput("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !password_confirm.value ||
      !nickname.value ||
      !username.value ||
      !email.value ||
      !password.value
    ) {
      return toast.error("You need to fill in all the fields");
    }

    if (username.value.length < 5 || username.value.length > 30) {
      return toast.error("lenght of username is between 5 and 30");
    }

    if (
      username.value === "/" ||
      username.value === "explore" ||
      username.value === "settings/profile" ||
      username.value === "nofications" ||
      username.value === "bookmarks"
    ) {
      return toast.error("Your username is not valid, try a different one");
    }

    const re = /^[a-z0-9]+$/i;

    if (re.exec(username.value) === null) {
      return toast.error(
        "Your username contains some non-alphanumeric characters, choose a better username name"
      );
    }

    if (nickname.value.length < 2 || nickname.value.length > 30) {
      return toast.error("length of nickname is between 2 and 30");
    }

    if (
      nickname.value === "/" ||
      nickname.value === "explore" ||
      nickname.value === "settings/profile" ||
      nickname.value === "nofications" ||
      nickname.value === "bookmarks"
    ) {
      return toast.error("Your nickname is not valid, try a different one");
    }

    if (re.exec(nickname.value) === null) {
      return toast.error(
        "Your nickname contains some non-alphanumeric characters, choose a better username name"
      );
    }

    if (password_confirm.value !== password.value) {
      return toast.error("passwords don't match");
    }

    const payload = {
      username: username.value,
      nickname: nickname.value,
      password_confirm: password_confirm.value,
      email: email.value,
      password: password.value,
    };

    const clearForm = () => {
      username.setValue("");
      nickname.setValue("");
      password_confirm.setValue("");
      email.setValue("");
      password.setValue("");
    };

    dispatch(signup({ payload, clearForm }));
  };

  return (
    <Form center onSubmit={handleSignup}>
      <div className="group-input">
        <Input
          text="Username"
          type="text"
          value={username.value}
          onChange={username.onChange}
        />
        <Input
          text="Nickname"
          type="text"
          value={nickname.value}
          onChange={nickname.onChange}
        />
      </div>
      <Input
        text="Email"
        type="email"
        value={email.value}
        onChange={email.onChange}
      />
      <div className="group-input">
        <Input
          text="Password"
          type="password"
          value={password.value}
          onChange={password.onChange}
        />
        <Input
          text="Password_Confirm"
          type="password"
          value={password_confirm.value}
          onChange={password_confirm.onChange}
        />
      </div>
      <Button xl outline type="submit">
        Sign up
      </Button>
      <span>or</span>
      <Button xl type="button" onClick={() => setAuth("LOGIN")}>
        Login
      </Button>
    </Form>
  );
};

export default Signup;
