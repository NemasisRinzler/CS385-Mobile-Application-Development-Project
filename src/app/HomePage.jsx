import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import { logout } from "../services/authService";

export default function HomePage() {
  const { user, xp } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/LoginPage");
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
        <h1>Welcome, {user?.username}!</h1>
        <p style={{ fontSize: "20px", color: "#16a34a", fontWeight: "600", marginTop: "20px" }}>
          Total XP: {xp}
        </p>
        <p style={{ fontSize: "16px", color: "#6b7280", marginTop: "10px" }}>
          Level: {Math.floor(xp / 1000) + 1}
        </p>
      </div>
    </>
  );
}