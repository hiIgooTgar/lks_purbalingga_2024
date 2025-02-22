import { useState } from "react";
import api from "../Api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data_user));
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setAuthError(error.response.data.message);
        } else if (error.response.status == 422) {
          setErrors(error.response.data.errors);
        }
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
                    <h4 className="text-center h1 fw-bold  mx-1 mx-md-4 mt-4">
                      Sign In | LKS
                    </h4>
                    <p className="text-center mb-5">
                      Masukan email dan password sesuai data anda
                    </p>
                    {authError && (
                      <div
                        class="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        <p className="mb-0">{authError}</p>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="mb-2">
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
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary ">
                          Login
                        </button>
                      </div>
                    </form>
                    <p className="mt-2 text-center">
                      Anda belum punya akun?{" "}
                      <Link to={"/register"}>Sign Up</Link> sekarang
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

export default Login;
