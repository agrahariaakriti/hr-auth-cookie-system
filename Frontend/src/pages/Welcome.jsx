import { useNavigate } from "react-router-dom";
import { DataProvider } from "../Store/DataStore";
const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <svg
          className="bi mt-4 mb-3"
          style={{ color: "var(--bs-indigo)" }}
          width="100"
          height="100"
          aria-hidden="true"
        >
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <h1 className="text-body-emphasis"> 🔐 Secure Authentication System</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          Cookie-based login, protected routes, and user profiles with <br />
          avatar upload
        </p>
        <div className="d-inline-flex gap-2 mb-5">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
