import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MessageComponent = ({ sessionId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [editMessage, setEditMessage] = useState({ id: null, text: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const url = `${import.meta.env.VITE_API_URL}api/messages/`;
    const token = JSON.parse(localStorage.getItem("token"));
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const fetchMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${url}${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId, token, url]);

    useEffect(() => {
        fetchMessages();
        // Auto-refresh messages every 30 seconds
        const interval = setInterval(fetchMessages, 30000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    const createMessage = async () => {
        if (!newMessage.trim()) return;
        
        try {
            setIsSending(true);
            const response = await axios.post(
                url,
                {
                    sessionId: sessionId,
                    senderId: currentUser.id,
                    content: newMessage.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessages([...messages, response.data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error creating message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createMessage();
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Aujourd'hui";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Hier";
        } else {
            return date.toLocaleDateString('fr-FR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
            });
        }
    };

    return (
        <div className="bg-white/5 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Messages</span>
                </h3>
                <span className="text-sm text-gray-400">{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Messages List */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-gray-400 text-sm">Chargement des messages...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-sm">Aucun message pour le moment</p>
                        <p className="text-gray-500 text-xs">Soyez le premier à démarrer la conversation !</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwnMessage = message.senderId === currentUser.id;
                        return (
                            <div key={message.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                                    <div className={`rounded-2xl px-4 py-3 ${
                                        isOwnMessage 
                                            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white' 
                                            : 'bg-white/10 text-white border border-white/20'
                                    }`}>
                                        <p className="text-sm">{message.content}</p>
                                        <div className={`text-xs mt-2 ${
                                            isOwnMessage ? 'text-cyan-100' : 'text-gray-400'
                                        }`}>
                                            {formatTime(message.createdAt)}
                                        </div>
                                    </div>
                                    <div className={`text-xs text-gray-400 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                                        {formatDate(message.createdAt)}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Message Input */}
            <div className="flex space-x-3">
                <div className="flex-1 relative">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tapez votre message..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none"
                        rows="2"
                        disabled={isSending}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        Appuyez sur Entrée pour envoyer
                    </div>
                </div>
                <button
                    onClick={createMessage}
                    disabled={!newMessage.trim() || isSending}
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-400/25 flex items-center space-x-2"
                >
                    {isSending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Envoi...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span>Envoyer</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

MessageComponent.propTypes = {
    sessionId: PropTypes.number.isRequired,
};

export default MessageComponent;
