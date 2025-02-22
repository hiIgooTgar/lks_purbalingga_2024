import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useEffect, useState } from "react";
import api from "../Api";
import { Footer } from "../Components/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

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
                        <a href="" className="btn btn-sm btn-warning">
                          Ubah
                        </a>
                        <a href="" className="btn btn-sm btn-danger">
                          Hapus
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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
