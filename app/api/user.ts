import axiosInstance from "../utils/axios";

interface User {
  id: number;
  username: string;
  email: string;
  voteStatus: boolean;
  access_token: string;
}

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const userApi = {
   login: (input: LoginInput) => axiosInstance.post<User>('/auth/login', input),
   register: (input: RegisterInput) => axiosInstance.post<User>('/user/register', input),
   getMe: (token: string) => axiosInstance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


export default userApi;