import React, { useState } from "react";
import { Navbar } from "../../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../Components/Footer";
import api from "../../Api";

const AddUsers = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/admin/users",
        { name, username, password, email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      navigate("/users");
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
            <h2>Form Tambah Users</h2>
          </div>
          <div className="">
            <Link className="btn btn-primary" to={"/users"}>
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card mt-4 p-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-danger">{errors.name[0]}</p>}
              </div>
              <div className="row">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username[0]}</p>
                  )}
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email[0]}</p>
                  )}
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
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password[0]}</p>
                  )}
                </div>
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="role">
                    Role
                  </label>
                  <select
                    name="role"
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">-- Choice Role --</option>
                    <option value="admin">Admin</option>
                    <option value="pengguna">Pengguna</option>
                  </select>
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

export default AddUsers;
