import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = `${import.meta.env.VITE_API_URL}/api/users/`;
const createSessionUrl = `${import.meta.env.VITE_API_URL}/api/sessions`;

const CreateSession = () => {
    const [mentees, setMentees] = useState([]);
    const [sessionData, setSessionData] = useState({
        mentorId: "",
        menteeId: "",
        date: "",
        status: "",
    });

    const id = (JSON.parse(localStorage.getItem("user")).id);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                setMentees(response.data.filter((mentee) => mentee.role === "mentee"));
            })
            .catch((error) => {
                console.error("There was an error fetching the mentees!", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(createSessionUrl, { ...sessionData, mentorId: id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
            })
            .then((response) => {
                console.log("Session created successfully:", response.data);
                // Optionally, reset form fields or show a success message
                navigate("/sessions")
            })
            .catch((error) => {
                console.error("There was an error creating the session!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Session</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="menteeId"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Select Mentee:
                    </label>
                    <select
                        id="menteeId"
                        name="menteeId"
                        value={sessionData.menteeId}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">--Please choose a mentee--</option>
                        {mentees.map((mentee) => (
                            <option key={mentee.id} value={mentee.id}>
                                {mentee.firstName} {mentee.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Session Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={sessionData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Session Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={sessionData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">--Please choose a status--</option>
                        <option value="planned">Planned</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Session
                </button>
            </form>
        </div>
    );
};

export default CreateSession;
