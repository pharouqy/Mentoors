import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MessageComponent = ({ sessionId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [editMessage, setEditMessage] = useState({ id: null, text: "" });
    const url = `${import.meta.env.VITE_API_URL}/api/messages/`;
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchMessages = useCallback(async () => {
        try {
            const response = await axios.get(`${url}${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [sessionId, token, url]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const createMessage = async () => {
        try {
            const response = await axios.post(
                url,
                {
                    sessionId: sessionId,
                    senderId: JSON.parse(localStorage.getItem("user")).id,
                    content: newMessage,
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
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <ul className="space-y-4">
                {messages.map((message) => (
                    <li key={message.id} className="flex items-center space-x-4">
                        {editMessage.id === message.id ? (
                            <input
                                type="text"
                                value={editMessage.content}
                                onChange={(e) =>
                                    setEditMessage({ ...editMessage, content: e.target.value })
                                }
                                className="border p-2 flex-1"
                            />
                        ) : (
                            <span className="flex-1">{message.content}</span>
                        )}
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex space-x-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="border p-2 flex-1"
                />
                <button
                    onClick={createMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Message
                </button>
            </div>
        </div>
    );
};

MessageComponent.propTypes = {
    sessionId: PropTypes.number.isRequired,
};

export default MessageComponent;
