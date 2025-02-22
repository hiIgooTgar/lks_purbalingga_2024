import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import Users from "./Pages/Users";
import AddUsers from "./Pages/Users/AddUsers";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
