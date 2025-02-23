import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import IsAdmin from "./Middleware/isAdmin";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import AddUsers from "./Pages/Users/AddUsers";
import UpdateUsers from "./Pages/Users/UpdateUsers";
import ManagementPassword from "./Pages/ManagementPassword";
import AddPassword from "./Pages/Management_password/AddPassword";
import UpdatePassword from "./Pages/Management_password/UpdatePassword";
import Unauthorized from "./Pages/Errors/Unauthorized";
import NotFound from "./Pages/Errors/NotFound";
import MyPasswords from "./Pages/MyUsers/MyPasswords";
import AddPasswordUsers from "./Pages/MyUsers/AddPasswordUsers";
import UpdatePasswords from "./Pages/MyUsers/UpdatePasswords";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/my-passwords" element={<MyPasswords />}></Route>
          <Route
            path="/edit-my-passwords/:id"
            element={<UpdatePasswords />}
          ></Route>
          <Route
            path="/add-my-passwords"
            element={<AddPasswordUsers />}
          ></Route>
          <Route element={<IsAdmin />}>
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
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
