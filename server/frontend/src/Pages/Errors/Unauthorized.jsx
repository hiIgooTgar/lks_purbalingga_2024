import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column text-center mt-5"
      style={{ padding: "12rem 0" }}
    >
      <h1 className="text-danger">
        <strong>403 - Unauthorized</strong>
      </h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
