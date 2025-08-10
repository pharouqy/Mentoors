import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MessageComponent from "../components/message";

const url1 = `${import.meta.env.VITE_API_URL}/api/sessions/`;
const url2 = `${import.meta.env.VITE_API_URL}/api/users/`;

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);
  const [mentorsSessions, setMentorsSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const idUser = JSON.parse(localStorage.getItem("user")).id;
  const userRole = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {
    if (idUser) {
      axios
        .get(url2, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idUser]);

  useEffect(() => {
    if (idUser) {
      axios
        .get(url1, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((response) => {
          setSessions(response.data);
          setMentorsSessions(
            response.data.filter((session) => {
              return session.mentorId === idUser || session.menteeId === idUser;
            })
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the sessions!", error);
          setIsLoading(false);
        });
    }
  }, [idUser]);

  const findUserById = (id) =>
    users.find((user) => parseInt(user.id) === parseInt(id));

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) {
      axios
        .delete(`${url1}${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        })
        .then(() => {
          setSessions(sessions.filter((session) => session.id !== id));
          setMentorsSessions(mentorsSessions.filter((session) => session.id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the session!", error);
        });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status || 'Non défini';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des sessions...</p>
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sessions de Mentorat</h1>
          <p className="text-gray-300 text-lg">Gérez vos sessions et suivez vos progrès</p>
        </div>

        {/* Create Session Button */}
        {["admin", "mentor"].includes(userRole) && (
          <div className="text-center mb-8">
            <Link to="/create-session">
              <button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-cyan-400/25 flex items-center space-x-2 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Créer une session</span>
              </button>
            </Link>
          </div>
        )}

        {/* Sessions Grid */}
        <div className="grid gap-6">
          {(userRole === "admin" ? sessions : mentorsSessions).map((session) => {
            const mentor = findUserById(session.mentorId);
            const mentee = findUserById(session.menteeId);
            
            return (
              <div key={session.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Session Header */}
                <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Session #{session.id}</h2>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(session.status)}`}>
                            {getStatusText(session.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-cyan-300 text-sm font-medium">Date</p>
                      <p className="text-white font-semibold">
                        {new Date(session.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentor && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">M</span>
                          </div>
                          <div>
                            <p className="text-purple-300 text-xs font-medium">MENTOR</p>
                            <p className="text-white font-semibold">{mentor.firstName} {mentor.lastName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {mentee && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                          </div>
                          <div>
                            <p className="text-cyan-300 text-xs font-medium">APPRENTI</p>
                            <p className="text-white font-semibold">{mentee.firstName} {mentee.lastName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-white/5">
                  <div className="flex flex-wrap gap-3">
                    {mentor && (
                      <Link to={`/update-session/${session.id}`}>
                        <button className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Modifier</span>
                        </button>
                      </Link>
                    )}
                    
                    {userRole === "admin" && (
                      <button
                        onClick={() => handleDelete(session.id)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Supprimer</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages Section */}
                {userRole !== "admin" && (
                  <div className="border-t border-white/10">
                    <MessageComponent sessionId={session.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {(userRole === "admin" ? sessions : mentorsSessions).length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucune session trouvée</h3>
            <p className="text-gray-400">Commencez par créer votre première session de mentorat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
