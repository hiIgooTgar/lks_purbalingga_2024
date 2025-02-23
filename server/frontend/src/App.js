import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import Users from "./Pages/Users";
import AddUsers from "./Pages/Users/AddUsers";
import UpdateUsers from "./Pages/Users/UpdateUsers";
import ManagementPassword from "./Pages/ManagementPassword";
import AddPassword from "./Pages/Management_password/AddPassword";
import UpdatePassword from "./Pages/Management_password/UpdatePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/add-users" element={<AddUsers />}></Route>
          <Route path="/edit-users/:id" element={<UpdateUsers />}></Route>
          <Route
            path="/management-password"
            element={<ManagementPassword />}
          ></Route>
          <Route
            path="/add-management-password"
            element={<AddPassword />}
          ></Route>
          <Route
            path="/edit-management-password/:id"
            element={<UpdatePassword />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
