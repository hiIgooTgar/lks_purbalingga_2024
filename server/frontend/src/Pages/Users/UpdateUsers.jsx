import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import api from "../../Api";

const UpdateUsers = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setName(userData.name);
      setUsername(userData.username);
      setEmail(userData.email);
      setRole(userData.role);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/admin/users/${id}`,
        { name, username, email, role },
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
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="mb-3 col-md-6 col-sm-12">
                  <label className="mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name[0]}</p>
                  )}
                </div>
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
                    value={username}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email[0]}</p>
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

export default UpdateUsers;
