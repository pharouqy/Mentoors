import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url1 = `${import.meta.env.VITE_API_URL}/api/sessions/`;
const url2 = `${import.meta.env.VITE_API_URL}/api/users/`;
const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(url2, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(url1, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the sessions!", error);
            });
    }, []);

    const findUserById = (id) => users.find((user) => parseInt(user.id) === parseInt(id));

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Sessions</h1>
            <Link to="/create-session">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Create Session</button>
            </Link>
            <ul className="space-y-4">
                {sessions.map((session) => {
                    const mentor = findUserById(session.mentorId);
                    const mentee = findUserById(session.menteeId);
                    return (
                        <li key={session.id} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">Session ID: {session.id}</h2>
                            <p className="text-gray-700">Status: {session.status}</p>
                            {mentor && (
                                <p className="text-gray-700">
                                    Mentor: {mentor.firstName} {mentor.lastName}
                                </p>
                            )}
                            {mentee && (
                                <p className="text-gray-700">
                                    Mentee: {mentee.firstName} {mentee.lastName}
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sessions;
