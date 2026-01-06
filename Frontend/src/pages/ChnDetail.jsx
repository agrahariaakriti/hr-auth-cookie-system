import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Store/DataStore";
function ChgDetail() {
  const { setUserData } = useContext(DataContext);
  const navigater = useNavigate();
  const [chgData, setChgData] = useState({
    fullname: "",
    email: "",
    avatar: null,
    username: "",
  });
  const submitData = async () => {
    const chngData = new FormData();
    console.log("Hello submit data");

    chngData.append("username", chgData.username);
    chngData.append("fullname", chgData.fullname);
    chngData.append("email", chgData.email);
    chngData.append("avatar", chgData.avatar);
    const res = await api.post("/ChgData", chngData);
    console.log(
      "im backe guysss....",
      res.data.data,
      "...................bygfhf"
    );
    setUserData(res.data.data);
    navigater("/home");
  };

  return (
    <>
      <div className="container w-50 mt-5 pt-5 lh-4 gap-6 ">
        <h2>Change Detail</h2>
        <div className="input-group flex-nowrap py-2 py-2">
          <span className="input-group-text" id="addon-wrapping">
            Email
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="email"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={(e) => {
              setChgData({ ...chgData, email: e.target.value });
            }}
          />
        </div>
        <div className="input-group flex-nowrap py-2">
          <span className="input-group-text" id="addon-wrapping">
            Fullname
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Fullname"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={(e) => {
              setChgData({ ...chgData, fullname: e.target.value });
            }}
          />
        </div>
        <div className="input-group flex-nowrap py-2">
          <span className="input-group-text" id="addon-wrapping">
            username
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            onChange={(e) => {
              setChgData({ ...chgData, username: e.target.value });
            }}
          />
        </div>

        <div className="input-group mb-3  py-2">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            onChange={(e) => {
              setChgData({ ...chgData, avatar: e.target.files[0] });
            }}
          />

          <label className="input-group-text" for="inputGroupFile02">
            Profile Photo
          </label>
        </div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => {
            submitData();
          }}
        >
          Change
        </button>
      </div>
    </>
  );
}
export default ChgDetail;
