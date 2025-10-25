import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const menus = {
    shelter: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Manage Pets", path: "/manage-pets" },
      { name: "Requests", path: "/adoption-requests" },
      { name: "Messages", path: "/messages" },
    ],
    adopter: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Favorites", path: "/favorites" },
      { name: "Messages", path: "/messages" },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Users", path: "/users" },
      { name: "Logs", path: "/logs" },
    ],
    super_admin: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Users", path: "/users" },
      { name: "Logs", path: "/logs" },
      { name: "System", path: "/system" },
    ],
  };

  const roleMenus = menus[user?.role] || [];

  return (
    <div className="sidebar">
      <h2>🐾 Fur & Feathers</h2>
      <ul>
        {roleMenus.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}