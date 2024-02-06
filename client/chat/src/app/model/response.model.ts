export interface User {
  id: string;
  username: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

export interface AuthResponse extends ApiResponse {
  user: {
    id: string;
    username: string;
  };
}
