import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <button
        className="border shadow-md"
        onClick={() => navigate("/projects")}
      >
        <p className="text-xl">GO</p>
      </button>
    </div>
  );
};

export default LoginPage;
