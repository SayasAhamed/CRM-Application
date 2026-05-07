import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleLogin = async () => {
  const res = await login({ email, password });

  if (res.message) {
    localStorage.setItem("user", email);
    navigate("/dashboard");
  } else {
    alert("Login failed");
  }
};