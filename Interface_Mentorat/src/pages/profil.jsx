import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = `${import.meta.env.VITE_API_URL}/api/users/`;

const Profil = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) throw new Error("Token not found");

        const endpoint = user.role === "admin" ? url : `${url}${user.id}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.role]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setData(data.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Une erreur est survenue: {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>

      {user.role === "admin" ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
          {data &&
            data.map((user) => (
              <div key={user.id} className="mb-2 p-2 border rounded">
                <p>
                  {user.name} ({user.email}) - Rôle: {user.role}
                </p>
                <div className="flex">
                  <button
                    onClick={() => navigate(`/update/${user.id}`)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Mettre à jour
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white p-2 rounded ml-2"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
        </>
      ) : (
        <p className="text-center text-gray-500">
       <>
          <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
          {data &&
              <div key={user.id} className="mb-2 p-2 border rounded">
                <p>
                  {user.name} ({user.email}) - Rôle: {user.role}
                </p>
                <div className="flex">
                  <button
                    onClick={() => navigate(`/update/${user.id}`)}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Mettre à jour
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white p-2 rounded ml-2"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              }
        </>
        </p>
      )}
    </div>
  );
};

export default Profil;
