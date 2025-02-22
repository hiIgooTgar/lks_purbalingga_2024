import { useState } from "react";
import api from "../Api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pengguna");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/registrasi", {
        name,
        username,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.log(error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-4">
                      Sign Up | LKS
                    </p>
                    <p className="text-center mb-5">
                      Masukan data dibawah ini sesuai dengan anda
                    </p>
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="mb-2">
                        <label className="mb-1" htmlFor="name">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          autoComplete="off"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <p className="text-danger">{errors.name[0]}</p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="mb-1" htmlFor="username">
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          autoComplete="off"
                          className="form-control"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && (
                          <p className="text-danger">{errors.username[0]}</p>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="mb-1" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          autoComplete="off"
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email[0]}</p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="mb-1" htmlFor="password">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          autoComplete="off"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <p className="text-danger">{errors.password[0]}</p>
                        )}
                      </div>
                      <input type="hidden" name="role" value={role} />
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary">
                          Sign Up
                        </button>
                      </div>
                    </form>
                    <p className="mt-2 text-center">
                      Anda sudah punya akun? <Link to={"/login"}>Sign In</Link>{" "}
                      sekarang
                    </p>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://pjj.smknurussalam-salopa.sch.id/blogimages/img_3424_1546601447.png"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
