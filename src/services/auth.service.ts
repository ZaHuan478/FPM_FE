import apiClient from './api';

export type LoginData = {
    email: string;
    password: string;
}

export type RegisterData = {
    fullName: string;
    email: string;
    password: string;
}

export type AuthResponse = {
    success: boolean;
    data: {
        token: string;
        user: {
            id: number;
            email: string;
            fullName: string;
        };
    };
}

export type User = {
    id: number;
    email: string;
    fullName: string;
}

export const authService = {
    async login(data: LoginData): Promise<AuthResponse> {
        console.log('🔵 Calling login API with data:', data);
        console.log('🔵 API URL:', apiClient.defaults.baseURL);
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        console.log('✅ Login response:', response.data);
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        console.log('🔵 Calling register API with data:', data);
        console.log('🔵 API URL:', apiClient.defaults.baseURL);
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        console.log('✅ Register response:', response.data);
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    async getMe(): Promise<{ success: boolean; data: User }> {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    getUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },
};
