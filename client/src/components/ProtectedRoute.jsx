import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const navigate = useNavigate();

    const getUser = async () => {
      try {
          const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
          const data = await response.data;
          setIsAuthenticated(data.message === "Authenticated")
          console.log("~response",response, data)
      } catch (error) {
        navigate("/login")
      }
  }
  
  
  useEffect(() => {
    getUser()
  }, [])

    return (
        <Routes>
        <Route
        {...restOfProps}
        render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
    }
    />
    </Routes>
  );
}

export default ProtectedRoute;