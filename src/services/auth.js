import { toast } from "react-toastify";
import http from "./http";

class AuthService {
  login(payload) {
    return http
      .post("api/v1/user/login", payload)
      .then((res) => {
        const user = res.data.data
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("logged in");
        return user;
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  signup(payload) {
    return http
      .post("api/v1/user/register", payload)
      .then(() => {
        toast.success("signed up，please log in");
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  logout() {
    return http.delete("api/v1/user/logout").then(() => {
      toast.success("Logged out");
    });
  }
}

export default new AuthService();
