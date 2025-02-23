import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

const Profile = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="card">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-3 col-sm-12 d-flex justify-content-center mb-4">
                <img
                  src={"images/profile-default.png"}
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                />
              </div>
              <div className="col-md-9 col-sm-12">
                <h3 className="mb-3 text-primary">My Profile</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        value={user.name}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label">
                        Username
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        value={user.username}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label">
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        value={user.email}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="" className="form-label">
                        Role
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        value={user.role}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
