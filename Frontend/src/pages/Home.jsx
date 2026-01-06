import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Store/DataStore";
import api from "../api/axios";

const Home = () => {
  const { userData, loading } = useContext(DataContext);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !userData) {
      navigate("/");
    }
  }, [loading, userData, navigate]);

  const logout = async () => {
    try {
      await api.get("/logout");
      navigate("/");
    } catch (error) {
      console.log("Error while Logout", error);
    }
  };

  const chgDetail = () => {
    navigate("/chgDetail");
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (!userData) return null;

  return (
    <main className="container mt-5">
      <div className="bg-body-tertiary p-4 rounded shadow-sm">
        <h1 className="mb-1">Welcome</h1>
        <h4 className="text-muted mb-4">User Profile</h4>

        {/* PROFILE CARD */}
        <div className="card shadow-sm mb-4" style={{ maxWidth: "720px" }}>
          <div className="row g-0 align-items-center">
            {/* Avatar */}
            <div className="col-md-4 text-center p-3">
              <img
                src={userData?.avatar?.url || "/default-avatar.png"}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* User Info */}
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title mb-3">{userData.fullname}</h5>

                <p className="mb-1">
                  <strong>Username:</strong> {userData.username}
                </p>

                <p className="mb-0">
                  <strong>Email:</strong> {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          className="d-flex justify-content-between"
          style={{ maxWidth: "720px" }}
        >
          <button className="btn btn-outline-danger" onClick={logout}>
            Log Out
          </button>

          <button className="btn btn-primary" onClick={chgDetail}>
            Change Details
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
