import { API_BASE_URL } from "@/config/apiConfig";

/**
 * Client HTTP centralisé et rigoureusement typé pour l'application.
 * Élimine complètement l'usage du type 'any' pour garantir la sécurité au build.
 * * @param endpoint Le chemin de la ressource (ex: "/agents", "/dossiers")
 * @param options Les options de configuration de la requête fetch
 */
export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const token = localStorage.getItem("token");

  // Configuration des en-têtes par défaut
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Fusion sécurisée des en-têtes sans altérer le typage strict
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string>),
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error(
          "Session expirée ou accès non autorisé. Veuillez vous re-connecter.",
        );
      }

      if (response.status === 403) {
        throw new Error(
          "Vous n'avez pas les habilitations nécessaires pour effectuer cette action.",
        );
      }

      // Extraction sécurisée du message d'erreur JSON du serveur
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        (errorData as { message?: string }).message ||
          `Une erreur est survenue (Code : ${response.status})`,
      );
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error: unknown) {
    // Traitement de l'erreur inconnue de manière sécurisée (Type Guard)
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        console.error(
          "Le serveur API est injoignable. Vérifiez que votre JSON Server est lancé.",
        );
        throw new Error(
          "Impossible de joindre le serveur. Veuillez vérifier votre connexion.",
        );
      }
      // Si c'est une erreur standard, on propage son message typé
      throw error;
    }

    // Alternative de secours si l'objet capturé n'est pas une instance d'Error
    throw new Error("Une erreur indéterminée est survenue.");
  }
};
