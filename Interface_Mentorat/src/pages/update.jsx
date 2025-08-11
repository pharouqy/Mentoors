import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
    const url = `${import.meta.env.VITE_API_URL}api/users/`;
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${url}${id}`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                });
                const result = response.data;
                setData(result);
                setFormData({
                    firstName: result.firstName || "",
                    lastName: result.lastName || "",
                    email: result.email || "",
                    role: result.role || "",
                    password: ""
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Erreur lors du chargement des données. Veuillez réessayer.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, url]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
        if (!formData.email.trim()) newErrors.email = "L'email est requis";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
        if (formData.password && formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const payload = { ...formData };
            if (!payload.password) delete payload.password;
            await axios.put(`${url}${id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            });
            alert("Profil mis à jour avec succès !");
            navigate("/profil");
        } catch (error) {
            console.error("Error updating data:", error);
            alert("Erreur lors de la mise à jour. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Erreur de chargement</h3>
                    <p className="text-red-400">Impossible de charger les données du profil</p>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white">Modifier le Profil</h2>
                        <p className="text-gray-300 text-sm">Mettez à jour vos informations personnelles</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Prénom</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.firstName ? 'border-red-400' : 'border-white/20'}`}
                                placeholder="Entrez votre prénom"
                            />
                            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Nom</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.lastName ? 'border-red-400' : 'border-white/20'}`}
                                placeholder="Entrez votre nom"
                            />
                            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-400' : 'border-white/20'}`}
                                placeholder="Entrez votre email"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Rôle</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                                disabled
                            >
                                <option value="mentor" className="bg-slate-800 text-white">Mentor</option>
                                <option value="mentee" className="bg-slate-800 text-white">Apprenti</option>
                                <option value="admin" className="bg-slate-800 text-white">Administrateur</option>
                            </select>
                            <p className="text-gray-400 text-xs">Le rôle ne peut pas être modifié</p>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-cyan-300">Nouveau mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-400' : 'border-white/20'}`}
                                placeholder="Laissez vide pour conserver l'actuel"
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-400/25 mt-6"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Mise à jour...</span>
                                </div>
                            ) : (
                                "Mettre à jour le profil"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={() => navigate("/profil")}
                            className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Retour au profil</span>
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-xl -z-10"></div>
            </div>
        </div>
    );
};

export default UpdatePage;
