import { useContext, useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

import { BiHide } from "react-icons/bi";

import { BiShow } from "react-icons/bi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    usertype: "app",
    role: "user",
    status: "active",
  });

  const URL1 =
    "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1/signup";
  const URL2 = "http://3.84.171.136:5000/user/add";

  const signupHandler = async (event) => {
    event.preventDefault();
    if (
      userData.firstname === "" ||
      userData.lastname === "" ||
      userData.username === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      return;
    }

    try {
      const config = {
        withCredentials: false,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const api1Response = await axios.post(URL1, userData);

      const api2Response = await axios.post(URL2, userData);

      if (api1Response.status === 201 && api2Response.status === 200) {
        console.log("User registered successfully.");
        navigate(location?.state?.from.pathname || "/login", { replace: true });
      } else {
        console.error("User registration failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className={styles.login_secondhalf}>
    <div className={styles.login_container}>
      <h2 className={styles.prinstagram}>Sign Up</h2>

      <form onSubmit={signupHandler} className={styles.login_form_container}>
        <div className={styles.firstname_block}>
          <label htmlFor="first" className={styles.login_label}>
            First Name
          </label>
          <input
            className={styles.login_input}
            type="text"
            id="first"
            value={userData?.firstName}
            onChange={(event) =>
              setUserData({ ...userData, firstname: event.target.value })
            }
            name="name"
            placeholder="First Name"
            required
          />
        </div>

        <div id="lastname-block">
          <label htmlFor="last" className={styles.login_label}>
            Last Name
          </label>
          <input
            className={styles.login_input}
            type="text"
            id="last"
            value={userData?.lastName}
            onChange={(event) =>
              setUserData({ ...userData, lastname: event.target.value })
            }
            name="name"
            placeholder="Last Name"
            required
          />
        </div>

        <div className={styles.email_block}>
          <label className={styles.login_label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.login_input}
            id="email"
            type="email"
            name="email"
            value={userData?.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
            placeholder="email"
            required
          />
        </div>

        <div className={styles.username_block}>
          <label htmlFor="user" className={styles.login_label}>
            Username
          </label>
          <input
            className={styles.login_input}
            type="username"
            name="username"
            id="user"
            value={userData?.username}
            onChange={(event) =>
              setUserData({ ...userData, username: event.target.value })
            }
            placeholder="Username"
            required
          />
        </div>

        <div>
          <label htmlFor="pass" className={styles.login_label}>
            password
          </label>

          <div className={`${styles.password_block} ${styles.passworddiv}`}>
            <input
              className={styles.login_input_password}
              type={showPassword ? "text" : "password"}
              // type="password"
              name="password"
              id="pass"
              value={userData?.password}
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
              placeholder="Password"
              required
            />
            <button
              className={styles.showhidelogo}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BiShow className={styles.showhidelogo} />
              ) : (
                <BiHide className={styles.showhidelogo} />
              )}
            </button>
          </div>
        </div>

        <button className={styles.login_button} type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
