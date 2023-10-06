import "./Login.css";

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const URL1 =
    "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/login";
  const URL2 = "http://3.84.171.136:5000/user/login";

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "user",
    usertype: "app",
  });

  const getLoginData = async (event) => {
    event.preventDefault();

    if (loginData?.username === "" || loginData?.password === "") {
      event.preventDefault();
      return;
    }
    try {
      let response = await fetch(URL2, {
        method: "POST",
        body: JSON.stringify(loginData),
      });

      const api1Response = await response.json(URL1, loginData);

      const api2Response = await axios.post(URL2, loginData);

      if (+api1Response.status === 200 && +api2Response.status === 200) {
        console.log("User registered successfully.");

        localStorage.setItem("token", api1Response.data.token);
        setToken(api1Response.data.token);
        navigate(location?.state?.from.pathname || "/", { replace: true });
      } else {
        console.error("User Login failed.");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    // <div className="login_full">
    // <div className="logindiv_second">
    <div className="login_secondhalf">
      <div className="login_container">
        <div>
          <h2 className="prinstagram">Login</h2>
        </div>

        <form onSubmit={getLoginData} className="login_form_container">
          <div id="email-block">
            <label className="login_label">username</label>
            <input
              className="login_input"
              type="text"
              name="username"
              placeholder="Username"
              value={loginData?.username}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  username: event.target.value,
                })
              }
              required
            />
          </div>

          <div id="password-block">
            <label>password</label>

            <input
              className="login_input"
              type="password"
              name="password"
              placeholder="Password"
              value={loginData?.password}
              onChange={(event) =>
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                })
              }
              required
            />
          </div>

          <button className="login_button" type="submit">
            Login
          </button>
        </form>

        <Link to="/signup" className="link_to_signup">
          {" "}
          Create a New Account{" "}
        </Link>
      </div>
    </div>
  );
};

export default Login;
