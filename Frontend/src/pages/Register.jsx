import api from "../api/axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const [error, setError] = useState(false);
  const [formData, SetFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const navigate = useNavigate();
  const submit = async () => {
    try {
      const data = new FormData();

      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("avatar", formData.avatar);
      await api.post("/register", data);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  // username, email, password, fullname
  return (
    <>
      <div className="container w-50 mt-5 pt-5">
        <h3 className="mb-3">Register Form</h3>
        <div className="input-group input-group-sm mb-3">
          {error && <h4>{error}</h4>}
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Full-Name
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              SetFormData({ ...formData, fullname: e.target.value });
            }}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Username
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              SetFormData({ ...formData, username: e.target.value });
            }}
          />
        </div>

        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Email
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              SetFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => {
              SetFormData({ ...formData, avatar: e.target.files[0] });
            }}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            PassWord
          </span>
          <input
            type="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              SetFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={submit}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default Register;
