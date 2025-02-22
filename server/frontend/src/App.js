import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AuthMiddleware from "./Middleware/AuthMiddleware";
import Users from "./Pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <AuthMiddleware>
              <Dashboard />
            </AuthMiddleware>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <AuthMiddleware>
              <Users />
            </AuthMiddleware>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
