import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./component/Register";
import SignIn from "./component/login";
import Dashboard from "./component/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
