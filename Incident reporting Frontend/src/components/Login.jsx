import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-600" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const checkBtn = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/reporting-page");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-96 mt-32">
      <div className="max-w-md w-full px-6">
        <div className="bg-white p-6 rounded-lg shadow-lg shadow-blue-100">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="mx-auto w-20 h-20 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-semibold text-blue-700 text-center">
            LogIn Page
          </h2>
          <Form onSubmit={handleLogin} ref={form}>
            <div className="mt-8">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-blue-700 font-semibold"
                >
                  Username
                </label>
                <Input
                  type="text"
                  className="form-input mt-1 block w-full border-2 border-blue-700 rounded-md focus:border-blue-600 px-3 py-2"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-blue-700 font-semibold"
                >
                  Password
                </label>
                <Input
                  type="password"
                  className="form-input mt-1 block w-full border-2 border-blue-700 rounded-md focus:border-blue-600 px-3 py-2"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="btn-primary w-full px-3 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-600 transition duration-100 font-bold text-xl ease-in-out uppercase"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </div>

            {message && (
              <div className="mt-4">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
