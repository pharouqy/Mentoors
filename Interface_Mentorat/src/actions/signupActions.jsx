import axios from "axios";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Thunk action for signup
export const signup = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    const apiBase = `${import.meta.env.VITE_API_URL}`;
    const token = localStorage.getItem("token");

    try {
      // 1) Tenter un endpoint public s'il existe
      try {
        const response = await axios.post(`${apiBase}/api/users/register`, userData, {
          headers: { "Content-Type": "application/json" },
        });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        return response.data;
      } catch (err) {
        // Si l'endpoint n'existe pas (404), on tente la route protégée seulement si un token est présent
        if (err.response?.status !== 404) throw err;

        if (!token) {
          throw new Error("Inscription publique désactivée. Veuillez vous connecter en tant qu'administrateur.");
        }

        const response = await axios.post(`${apiBase}/api/users/`, userData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Erreur lors de l'inscription";
      dispatch({ type: SIGNUP_FAILURE, payload: message });
      throw new Error(message);
    }
  };
};
