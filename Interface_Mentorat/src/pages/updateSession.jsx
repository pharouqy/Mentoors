import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateSession = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    mentorId: "",
    menteeId: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/sessions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
        const formattedData = {
          ...response.data,
          date: response.data.date
            ? new Date(response.data.date).toISOString().split("T")[0]
            : "",
        };
        setFormData(formattedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the session data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/sessions/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        alert("Session updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the session!", error);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mentor
          </label>
          <input
            type="text"
            name="mentorId"
            value={formData.mentorId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mentee
          </label>
          <input
            type="text"
            name="menteeId"
            value={formData.menteeId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Session
        </button>
      </form>
    </div>
  );
};

export default UpdateSession;
