import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./authActions";

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
        const response = await axios.post(`${apiBase}api/users/register`, userData, {
          headers: { "Content-Type": "application/json" },
        });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        // Connexion automatique juste après inscription (endpoint login)
        try {
          const loginResponse = await axios.post(
            `${apiBase}api/users/login`,
            { email: userData.email, password: userData.password },
            { headers: { "Content-Type": "application/json" } }
          );
          const { user, token } = loginResponse.data || {};
          localStorage.setItem("token", JSON.stringify(token));
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: LOGIN_SUCCESS, payload: user });
        } catch (autoLoginErr) {
          const autoMsg =
            autoLoginErr.response?.data?.error ||
            autoLoginErr.response?.data?.message ||
            autoLoginErr.message ||
            "Connexion automatique échouée";
          dispatch({ type: LOGIN_FAILURE, payload: autoMsg });
          // Pour empêcher la navigation et signaler dans l'UI d'inscription
          throw new Error(autoMsg);
        }
        return response.data;
      } catch (err) {
        // Si l'endpoint n'existe pas (404), on tente la route protégée seulement si un token est présent
        if (err.response?.status !== 404) throw err;

        if (!token) {
          throw new Error("Inscription publique désactivée. Veuillez vous connecter en tant qu'administrateur.");
        }

        const response = await axios.post(`${apiBase}api/users/`, userData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        // Connexion automatique même pour la route protégée
        try {
          const loginResponse = await axios.post(
            `${apiBase}api/users/login`,
            { email: userData.email, password: userData.password },
            { headers: { "Content-Type": "application/json" } }
          );
          const { user, token: loginToken } = loginResponse.data || {};
          localStorage.setItem("token", JSON.stringify(loginToken));
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: LOGIN_SUCCESS, payload: user });
        } catch (autoLoginErr) {
          const autoMsg =
            autoLoginErr.response?.data?.error ||
            autoLoginErr.response?.data?.message ||
            autoLoginErr.message ||
            "Connexion automatique échouée";
          dispatch({ type: LOGIN_FAILURE, payload: autoMsg });
          throw new Error(autoMsg);
        }
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Erreur lors de l'inscription";
      dispatch({ type: SIGNUP_FAILURE, payload: message });
      throw new Error(message);
    }
  };
};
