export interface User {
  id: string;
  username: string;
}

export interface ApiResponse {
  message: string;
  success: boolean;
  token: string;
  user: User;
}

export interface AuthResponse extends ApiResponse {
  user: {
    id: string;
    username: string;
  };
}
