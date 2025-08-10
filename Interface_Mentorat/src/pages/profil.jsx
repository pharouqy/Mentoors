import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = `${import.meta.env.VITE_API_URL}/api/users/`;

const Profil = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) throw new Error("Token not found");

        const endpoint = user.role === "admin" ? url : `${url}${user.id}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Si c'est un utilisateur normal, on met les données dans un tableau
        if (user.role !== "admin") {
          setData([response.data]);
        } else {
          setData(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.role, user.id]);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`${url}${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setData(data.filter((user) => user.id !== id));
        alert("Utilisateur supprimé avec succès !");
      } catch (error) {
        setError(error.message);
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Une erreur est survenue</h3>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profil</h1>
          <p className="text-gray-300 text-lg">
            {user.role === "admin" ? "Gestion des utilisateurs" : "Votre profil utilisateur"}
          </p>
        </div>

        {/* Admin section */}
        {user.role === "admin" && (
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-400/25 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Créer un nouvel utilisateur</span>
              </button>
            </div>

            {/* Users list */}
            <div className="grid gap-4">
              {data && data.map((userItem) => (
                <div key={userItem.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {userItem.firstName ? userItem.firstName.charAt(0) : userItem.name ? userItem.name.charAt(0) : 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {userItem.firstName && userItem.lastName 
                            ? `${userItem.firstName} ${userItem.lastName}` 
                            : userItem.name || 'Nom non défini'
                          }
                        </h3>
                        <p className="text-gray-300 text-sm">{userItem.email}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                          userItem.role === 'admin' ? 'bg-red-500' :
                          userItem.role === 'mentor' ? 'bg-purple-500' :
                          userItem.role === 'mentee' ? 'bg-cyan-500' : 'bg-gray-500'
                        }`}>
                          {userItem.role === 'admin' ? 'Administrateur' :
                           userItem.role === 'mentor' ? 'Mentor' :
                           userItem.role === 'mentee' ? 'Apprenti' : userItem.role || 'Rôle non défini'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(`/update/${userItem.id}`)}
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(userItem.id)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User profile section */}
        {user.role !== "admin" && (
          <div className="max-w-2xl mx-auto">
            {data && data.map((userItem) => (
              <div key={userItem.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-200">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">
                      {userItem.firstName ? userItem.firstName.charAt(0) : userItem.name ? userItem.name.charAt(0) : 'U'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {userItem.firstName && userItem.lastName 
                      ? `${userItem.firstName} ${userItem.lastName}` 
                      : userItem.name || 'Nom non défini'
                    }
                  </h2>
                  <p className="text-gray-300 text-lg">{userItem.email}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mt-2 ${
                    userItem.role === 'mentor' ? 'bg-purple-500' : 'bg-cyan-500'
                  }`}>
                    {userItem.role === 'mentor' ? 'Mentor' : 'Apprenti'}
                  </span>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => navigate(`/update/${userItem.id}`)}
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Modifier le profil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-400">Commencez par créer votre premier utilisateur</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
