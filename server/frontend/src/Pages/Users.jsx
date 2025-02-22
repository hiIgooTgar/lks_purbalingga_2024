import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useEffect, useState } from "react";
import api from "../Api";
import { Footer } from "../Components/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error Fetching API", error);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.error("Token not found. Please login.");
    }
  }, [token]);

  const filterUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/edit-users/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin untuk menghapus user ini?")) {
      return;
    }
    try {
      const response = await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id != id));
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
            <Link className="btn btn-primary" to={"/add-users"}>
              <span>Tambah Users</span>
            </Link>
          </div>
          <div className="">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Searching..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterUsers.length > 0 ? (
                  filterUsers.map((user, index) => (
                    <tr key={user.id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge bg-primary">{user.role}</span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="btn btn-sm btn-warning"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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
                      No users found.
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

export default Users;
