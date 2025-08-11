import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Main heading with gradient text */}
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Plateforme de Mentorat
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Connectez-vous avec des mentors expérimentés et développez vos compétences 
                            dans un environnement collaboratif et innovant
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Mentors Qualifiés</h3>
                            <p className="text-gray-300 text-sm">Accédez à un réseau de professionnels expérimentés prêts à partager leur expertise</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Sessions Flexibles</h3>
                            <p className="text-gray-300 text-sm">Planifiez des sessions personnalisées selon vos disponibilités et objectifs</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Communication Directe</h3>
                            <p className="text-gray-300 text-sm">Échangez en temps réel avec vos mentors via notre système de messagerie intégré</p>
                        </div>
                    </div>

                    {/* Call to action buttons (only when not authenticated) */}
                    {!isAuthenticated && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link to="/signup">
                                <button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-cyan-400/25 flex items-center space-x-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    <span>Commencer maintenant</span>
                                </button>
                            </Link>
                            
                            <Link to="/signin">
                                <button className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Se connecter</span>
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Stats section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">100+</div>
                            <div className="text-gray-400 text-sm">Mentors actifs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">500+</div>
                            <div className="text-gray-400 text-sm">Sessions réalisées</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-400">1000+</div>
                            <div className="text-gray-400 text-sm">Apprentis satisfaits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400">24/7</div>
                            <div className="text-gray-400 text-sm">Support disponible</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-xl -z-10"></div>
        </div>
    );
};

export default Index;