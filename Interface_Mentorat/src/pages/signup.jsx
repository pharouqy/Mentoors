import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/signupActions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupError = useSelector((state) => state.signup.error);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "Le prénom est requis";
    if (!formData.lastname) newErrors.lastname = "Le nom de famille est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    if (!formData.role) newErrors.role = "Le rôle est requis";
    if (formData.password && formData.password.length < 6)
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const signupData = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      await dispatch(signup(signupData));
      // L'action signup déclenche une connexion automatique (LOGIN_SUCCESS)
      // Si tout se passe bien, on envoie l'utilisateur directement sur son profil
      navigate("/profil");
    } catch (error) {
      // Rien: l'erreur serveur est lue depuis Redux et affichée plus bas
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Card container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Créer un compte</h2>
            <p className="text-gray-300 text-sm">
              Rejoignez la communauté mentorat
            </p>
          </div>

          {/* Erreur serveur */}
          {signupError && (
            <div className="rounded-lg border border-red-400/40 bg-red-500/10 text-red-300 px-4 py-2 text-sm">
              {signupError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-cyan-300">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                    errors.firstname ? "border-red-400" : "border-white/20"
                  }`}
                  placeholder="Votre prénom"
                />
                {errors.firstname && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-cyan-300">
                  Nom de famille
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                    errors.lastname ? "border-red-400" : "border-white/20"
                  }`}
                  placeholder="Votre nom"
                />
                {errors.lastname && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-300">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-400" : "border-white/20"
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-cyan-300">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.confirmPassword && e.target.value === formData.confirmPassword) {
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }
                  }}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                    errors.password ? "border-red-400" : "border-white/20"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-cyan-300">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.confirmPassword && e.target.value === formData.password) {
                      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }
                  }}
                  required
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword
                      ? "border-red-400"
                      : "border-white/20"
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-300">
                Rôle
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 ${
                  errors.role ? "border-red-400" : "border-white/20"
                }`}
              >
                <option value="" className="bg-slate-800 text-white">
                  Sélectionner un rôle
                </option>
                <option value="mentor" className="bg-slate-800 text-white">
                  Mentor
                </option>
                <option value="mentee" className="bg-slate-800 text-white">
                  Mentee
                </option>
              </select>
              {errors.role && (
                <p className="text-red-400 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-400/25 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Création du compte...</span>
                </div>
              ) : (
                "Créer le compte"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Déjà un compte ?{" "}
              <button
                onClick={() => navigate("/signin")}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>

        {/* Decorative border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-cyan-400/20 rounded-2xl blur-xl -z-10"></div>
      </div>
    </div>
  );
};

export default SignUp;
