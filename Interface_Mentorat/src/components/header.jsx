import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth?.user?.role); // Assuming role is stored in state.auth.role

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <header>
      <nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li>
                <button onClick={() => navigate("/profil")}>Profile</button>
              </li>
              <li>
                <button onClick={() => navigate("/sessions")}>Sessions</button>
              </li>
              {userRole === "admin" && (
                <li>
                  <button onClick={() => navigate("/signup")}>Sign Up</button>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => navigate("/signin")}>Sign In</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
