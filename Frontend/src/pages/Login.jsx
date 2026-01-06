import { useContext } from "react";
import api from "../api/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Store/DataStore.jsx";
function Login() {
  const [loginFormData, setLoginFormData] = useState({});
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(false);
  // const [loginErrData, setLoginErrData] = useState(false);
  const { setUserData } = useContext(DataContext);
  const login = async () => {
    try {
      console.log("Welcome to loginchecker");
      const data = await api.post("/login", loginFormData);
      console.log("huuuu..", data.data.data);
      setUserData(data.data.data);

      navigate("/home");
    } catch (error) {
      console.log("hhjhgj....", error);

      setLoginErr(error.response.data.message);
      console.log("hhjhgj....", loginErr);
    }
  };
  // if (loginErr) return <h5></h5>;
  return (
    <>
      (
      <main className="form-signin w-100 m-auto">
        <form>
          <div className="container w-50 mt-5 pt-5">
            <h2 className="mb-3">Login</h2>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginFormData,
                    email: e.target.value,
                  });
                }}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginFormData,
                    password: e.target.value,
                  });
                }}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {login && (
              <div className="container text-danger mt-2">{loginErr}</div>
            )}

            <div className="form-check text-start my-3 d-flex justify-content-between align-items-center">
              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="remember-me"
                  id="checkDefault"
                />
                <label className="form-check-label" htmlFor="checkDefault">
                  Remember me
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="button"
              onClick={login}
            >
              Sign in
            </button>
          </div>
        </form>
      </main>
      )
    </>
  );
}

export default Login;
