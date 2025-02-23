import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import api from "../../Api";

const UpdatePassword = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [user_id, setUserid] = useState("");
  const [password, setPasswords] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchPasswordUser();
    }
  }, [token]);

  const fetchPasswordUser = async () => {
    try {
      const response = await api.get(`/admin/passwords/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setUserid(userData.user_id);
      setPasswords();
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetch API", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/admin/passwords/${id}`,
        { user_id, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      navigate("/management-password");
    } catch (error) {
      if (error.response) {
        if (error.response.status == 422) {
          setErrors(error.response.data.errors);
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <div className="">
            <h2>Form Edit Passwords</h2>
          </div>
          <div className="">
            <Link className="btn btn-primary" to={"/management-password"}>
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card mt-4 p-3">
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="user_id">
                    User ID | Name
                  </label>
                  <select
                    name="user_id"
                    value={user_id}
                    disabled
                    onChange={(e) => setUserid(e.target.value)}
                    className="form-control"
                    id="user_id"
                  >
                    <option value="">-- Choice Role --</option>

                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.id} | {user.name} | {user.role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="password">
                    Password Baru
                  </label>
                  <input
                    id="password"
                    type="text"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPasswords(e.target.value)}
                    autoComplete="off"
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password[0]}</p>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-warning ">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;
