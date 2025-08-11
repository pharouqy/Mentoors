import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/authActions";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/signin");
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (!isAuthenticated) {
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-cyan-400/20 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Aller à l'accueil"
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-cyan-400 font-bold text-xl tracking-wider">
              MENTOORS
            </span>
          </button>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/profil")}
                    className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profil</span>
                    </span>
                  </button>
                  <button
                    onClick={() => navigate("/sessions")}
                    className="text-gray-300 hover:text-purple-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Sessions</span>
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-pink-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Déconnexion</span>
                    </span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
                >
                  Connexion
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-gray-300 hover:text-cyan-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
           >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          {isMobileMenuOpen && (
            <div className="px-4 pb-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profil");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Profil
                  </button>
                  <button
                    onClick={() => {
                      navigate("/sessions");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-purple-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Sessions
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-300 hover:text-pink-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-cyan-400/25"
                >
                  Connexion
                </button>
              )}
            </div>
          )}
        </div>

        {/* User info banner */}
        {isAuthenticated && user && (
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 border-t border-cyan-400/20 py-2 px-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-300">
                Connecté en tant que <span className="font-semibold text-white">{user.firstName} {user.lastName}</span>
              </span>
              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium">
                {user.role}
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
