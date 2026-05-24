/**
 * Configuration globale des variables d'environnement de l'API.
 * Centraliser l'URL ici permet un basculement instantané entre l'environnement de mock (JSON Server)
 * et le serveur de production (Spring Boot).
 */

// Environnement actuel avec JSON Server
export const API_BASE_URL = "http://localhost:3001";

// À décommenter lors du déploiement ou de la liaison avec le backend Java :
// export const API_BASE_URL = "http://localhost:8080/api/v1";

export const API_TIMEOUT = 10000; // Optionnel : Limite de temps pour les requêtes (10 secondes)
