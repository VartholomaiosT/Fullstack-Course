import React from "react";
import PropTypes from "prop-types";
import Notification from "./Notification";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  notification,
}) => (
  <div>
    <Notification message={notification.message} type={notification.type} />
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default LoginForm;
