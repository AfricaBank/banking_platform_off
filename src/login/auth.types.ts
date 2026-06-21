export interface UserData {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}