import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Store/DataStore";
import api from "../api/axios";
const Home = () => {
  const { userData, loading } = useContext(DataContext);
  const navigate = useNavigate();
  //
  // LogOut Logic
  //
  const logout = async () => {
    try {
      const login = await api.get("/logout");

      navigate("/");
    } catch (error) {
      console.log("Error while Logout", error);
    }
  };

  if (loading) return <h1>Loading... </h1>;

  if (!userData) return navigate("/");
  else
    return (
      <>
        <main className="container">
          <div className="bg-body-tertiary p-5 rounded">
            <h1 className="mb-2">Welcome To Home Page</h1>
            <h3 className="mb-4 ">Profile</h3>

            <div
              className="card text-bg-secondary mb-4"
              style={{ maxWidth: "600px" }}
            >
              <div className="row g-0 align-items-center p-3">
                <div className="col-4">
                  <img
                    src={userData.avatar}
                    className="img-fluid rounded-start"
                    alt="avatar"
                  />
                </div>

                <div className="col-8 p-5">
                  <div className="card-body">
                    <h5 className="card-title">{userData.fullname}</h5>
                    <p className="card-text">Username: {userData.username}</p>
                    <p className="card-text">Email: {userData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button className="btn btn-lg btn-primary" onClick={logout}>
              LogOut
            </button>
          </div>
        </main>
      </>
    );
};
export default Home;
