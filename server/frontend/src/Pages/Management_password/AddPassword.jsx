import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api";

const AddPassword = () => {
  const [users, setUsers] = useState([]);
  const [user_id, setUserid] = useState("");
  const [password, setPasswords] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const uniqueUser = [
          ...new Map(
            response.data.data.map((user) => [user.id, user])
          ).values(),
        ];
        setUsers(uniqueUser);
      } catch (error) {
        console.error("Error fetch API", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/admin/passwords",
        {
          user_id,
          password,
        },
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
        if (error.response.status === 422) {
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
            <h2>Form Tambah Passwords</h2>
          </div>
          <div className="">
            <Link className="btn btn-primary" to={"/management-password"}>
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card mt-4 p-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="user_id">
                    User ID | Name
                  </label>
                  <select
                    name="user_id"
                    value={user_id}
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
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={(e) => setPasswords(e.target.value)}
                    autoComplete="off"
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password[0]}</p>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary ">
                  Submit
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

export default AddPassword;
