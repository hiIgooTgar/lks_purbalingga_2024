import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <Navbar user={user} />
      <div className="container py-5">
        <div className="row">
          <div
            className="col-md-6 d-flex justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <h1>Dashboard</h1>
            <h1>
              Selamat Datang, <span className="text-primary">{user.name}</span>
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate adipisci quia itaque impedit incidunt esse ipsum
              reiciendis alias ipsa non?
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img src={"images/logo-lks.png"} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
