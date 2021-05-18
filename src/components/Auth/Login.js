import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import Input from ".././Input";
import Button from "../../styles/Button";
import Form from "../../styles/Form";
import { login } from "../../reducers/user";

const Login = ({ setAuth }) => {
  const dispatch = useDispatch();

  const email = useInput("");
  const password = useInput(""); 
  const loading = false

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.value || !email.value) {
      return toast.error("You need to fill all the fields");
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    const clearForm = () => {
      email.setValue("");
      password.setValue("");
    };

    dispatch(login({ payload, clearForm }));
    
  };

  return (
    <Form center onSubmit={handleLogin}>
      <Input
        text="Email"
        type="email"
        value={email.value}
        onChange={email.onChange}
      />
      <Input
        text="Password"
        type="password"
        value={password.value}
        onChange={password.onChange}
      />

      <Button xl outline disabled={loading} type="submit">
        {loading ? "Logging in" : "Login"}
      </Button>
      <span>or</span>
      <Button xl type="button" onClick={() => setAuth("SIGNUP")}>
        Signup
      </Button>
    </Form>
  );
};

export default Login
