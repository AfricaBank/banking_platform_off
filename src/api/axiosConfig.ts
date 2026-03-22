// src/api/axiosConfig.ts

import axios from "axios";

/**
 * Instance Axios centralisée.
 * Tous les appels API passent par cette instance.
 * La baseURL pointe vers le backend Spring Boot.
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8085",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30 secondes
});

// ── Intercepteur requête ──────────────────────────────────────────────────────
// À utiliser plus tard pour injecter le token JWT
axiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Intercepteur réponse ──────────────────────────────────────────────────────
// Centralise la gestion des erreurs HTTP
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message ?? error.message;

        if (status === 404) {
            console.error(`[API 404] Ressource introuvable : ${message}`);
        } else if (status === 400) {
            console.error(`[API 400] Données invalides : ${message}`);
        } else if (status === 409) {
            console.error(`[API 409] Conflit : ${message}`);
        } else if (status === 500) {
            console.error(`[API 500] Erreur serveur : ${message}`);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
