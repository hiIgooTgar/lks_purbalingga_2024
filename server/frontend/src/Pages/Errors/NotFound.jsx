import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column text-center mt-5"
      style={{ padding: "12rem 0" }}
    >
      <h1 className="text-danger">
        <strong>404 - Page Not Found</strong>
      </h1>
      <p>page is Not Found. Try again</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
