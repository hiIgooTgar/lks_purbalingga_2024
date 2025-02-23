import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import api from "../Api";

const ManagementPassword = () => {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await api.get("/admin/passwords", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPasswords(response.data.data);
      } catch (error) {
        console.error("Error Fetching API", error);
      }
    };

    if (token) {
      fetchPasswords();
    } else {
      console.error("Token not found. Please login.");
    }
  }, [token]);

  const filterPasswords = passwords.filter(
    (password) =>
      String(password.user_id).includes(search) ||
      password.name.toLowerCase().includes(search.toLowerCase()) ||
      password.username.toLowerCase().includes(search.toLowerCase()) ||
      password.email.toLowerCase().includes(search.toLowerCase()) ||
      password.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = async (id) => {
    navigate(`/edit-management-password/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin untuk menghapus user ini?")) {
      return;
    }

    try {
      const response = await api.delete(`/admin/passwords/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPasswords(passwords.filter((password) => password.id != id));
      alert(response.data.message);
    } catch (error) {
      console.error("Error delete API", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <div className="">
            <Link className="btn btn-primary" to={"/add-management-password"}>
              <span>Tambah Passwords</span>
            </Link>
          </div>
          <div className="">
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Searching..."
              className="form-control"
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>User Id | Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterPasswords.length > 0 ? (
                  filterPasswords.map((password, index) => (
                    <tr key={password.id}>
                      <td>{index + 1}</td>
                      <td>
                        {password.user_id} | {password.name}
                      </td>
                      <td>{password.username}</td>
                      <td>{password.email}</td>
                      <td>
                        <span className="badge bg-primary">
                          {password.role}
                        </span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          onClick={() => handleEdit(password.id)}
                          className="btn btn-sm btn-warning"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleDelete(password.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No management passwords found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManagementPassword;
