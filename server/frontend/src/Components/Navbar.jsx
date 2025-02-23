import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

export const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center mb-0">
          <img
            style={{ width: "50px", height: "50px" }}
            src={"images/logo-lks.png"}
            alt=""
          />{" "}
          <p className="h3" style={{ textDecoration: "none" }}>
            <Link to={"/"}>
              LKS <span className="text-primary">SMK</span>
            </Link>
          </p>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" to={"/"}>
              Home
            </Link>

            {currentUser?.role === "admin" && (
              <>
                <Link className="nav-link active" to={"/users"}>
                  Data Users
                </Link>
                <Link className="nav-link active" to={"/management-password"}>
                  Management Password
                </Link>
              </>
            )}

            {currentUser?.role === "pengguna" && (
              <Link className="nav-link active" to={"/my-passwords"}>
                My Passwords
              </Link>
            )}

            {currentUser && (
              <Link className="nav-link active" to={"/profile"}>
                My Profile
              </Link>
            )}

            <p
              onClick={handleLogout}
              className="nav-link mb-0 text-white btn btn-sm btn-danger"
              style={{ cursor: "pointer" }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
