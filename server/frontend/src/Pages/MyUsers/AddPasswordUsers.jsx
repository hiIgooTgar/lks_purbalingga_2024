import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import api from "../../Api";

const AddPasswordUsers = () => {
  const [password, setPasswords] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "passwords",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      navigate("/my-passwords");
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
            <Link className="btn btn-primary" to={"/my-passwords"}>
              <span>Kembali</span>
            </Link>
          </div>
        </div>
        <div className="card mt-4 p-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <label className="mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="text"
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

export default AddPasswordUsers;
