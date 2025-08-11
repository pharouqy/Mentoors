import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = `${import.meta.env.VITE_API_URL}api/users/`;
const createSessionUrl = `${import.meta.env.VITE_API_URL}api/sessions`;

const CreateSession = () => {
    const [mentees, setMentees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [sessionData, setSessionData] = useState({
        mentorId: "",
        menteeId: "",
        date: "",
        status: "planned",
    });

    const id = (JSON.parse(localStorage.getItem("user")).id);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentees = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                });
                setMentees(response.data.filter((mentee) => mentee.role === "mentee"));
            } catch (error) {
                console.error("There was an error fetching the mentees!", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentees();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!sessionData.menteeId) newErrors.menteeId = "Veuillez sélectionner un apprenti";
        if (!sessionData.date) newErrors.date = "Veuillez sélectionner une date";
        if (!sessionData.status) newErrors.status = "Veuillez sélectionner un statut";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await axios.post(createSessionUrl, { ...sessionData, mentorId: id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });
            alert("Session créée avec succès !");
            navigate("/sessions");
        } catch (error) {
            console.error("There was an error creating the session!", error);
            alert("Erreur lors de la création de la session. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Chargement des apprentis...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-lg">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Créer une Session</h2>
                        <p className="text-gray-300 text-sm">Planifiez votre prochaine session de mentorat</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Sélectionner un Apprenti</label>
                            <select
                                name="menteeId"
                                value={sessionData.menteeId}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                    errors.menteeId ? 'border-red-400' : 'border-white/20'
                                }`}
                            >
                                <option value="" className="bg-slate-800 text-white">-- Choisir un apprenti --</option>
                                {mentees.map((mentee) => (
                                    <option key={mentee.id} value={mentee.id} className="bg-slate-800 text-white">
                                        {mentee.firstName} {mentee.lastName}
                                    </option>
                                ))}
                            </select>
                            {errors.menteeId && <p className="text-red-400 text-xs mt-1">{errors.menteeId}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Date de la Session</label>
                            <input
                                type="date"
                                name="date"
                                value={sessionData.date}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                    errors.date ? 'border-red-400' : 'border-white/20'
                                }`}
                            />
                            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Statut de la Session</label>
                            <select
                                name="status"
                                value={sessionData.status}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                                    errors.status ? 'border-red-400' : 'border-white/20'
                                }`}
                            >
                                <option value="planned" className="bg-slate-800 text-white">Planifiée</option>
                                <option value="active" className="bg-slate-800 text-white">Active</option>
                                <option value="completed" className="bg-slate-800 text-white">Terminée</option>
                                <option value="cancelled" className="bg-slate-800 text-white">Annulée</option>
                            </select>
                            {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-400/25 mt-6"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Création de la session...</span>
                                </div>
                            ) : (
                                "Créer la Session"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={() => navigate("/sessions")}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Retour aux sessions</span>
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-xl -z-10"></div>
            </div>
        </div>
    );
};

export default CreateSession;
