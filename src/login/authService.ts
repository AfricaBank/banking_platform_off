import { LoginCredentials, UserData } from "./auth.types";

/**
 * Service simple d'authentification par comparaison
 */
export const authService = {
  login: async (credentials: LoginCredentials): Promise<UserData> => {
    try {
      // Appel de l'API locale json-server
      const response = await fetch("http://localhost:3001/users");
      
      if (!response.ok) {
        throw new Error("Erreur lors de la communication avec le serveur d'authentification.");
      }

      const users: UserData[] = await response.json();

      // Comparaison simple et stricte des identifiants
      const foundUser = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (!foundUser) {
        throw new Error("Identifiants incorrects. Veuillez vérifier votre email ou mot de passe.");
      }

      return foundUser;
    } catch (error: unknown) {
      // Extraction sécurisée du message d'erreur pour éviter le type 'any'
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      
      throw new Error("Une erreur inconnue est survenue.");
    }
  },
};