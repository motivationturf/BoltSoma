export interface User {
  id: number;
  email?: string;
  mobile?: string;
  firstName: string;
  lastName: string;
  grade?: string;
  avatar?: string;
  isGuest: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginRequest {
  email?: string;
  mobile?: string;
  password: string;
}

export interface RegisterRequest {
  email?: string;
  mobile?: string;
  password: string;
  firstName: string;
  lastName: string;
  grade?: string;
  avatar?: string;
}

export interface GuestRequest {
  firstName: string;
  lastName: string;
  grade?: string;
}

export interface GuestUpgradeRequest {
  email: string;
  password: string;
  mobile?: string;
}

class AuthServiceV2 {
  private baseUrl = '/api/auth';
  private tokenKey = 'somasmart_token_v2';
  private userKey = 'somasmart_user_v2';

  // Token management
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // User management
  private getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  // API request helper
  private async apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Guest session creation
  async createGuestSession(data: GuestRequest): Promise<AuthResponse> {
    console.log('Creating guest session:', data);
    
    const response = await this.apiRequest<AuthResponse>('/guest', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setToken(response.token);
      this.setUser(response.user);
    }

    return response;
  }

  // User registration
  async register(data: RegisterRequest): Promise<AuthResponse> {
    console.log('Registering user:', { ...data, password: '[HIDDEN]' });
    
    const response = await this.apiRequest<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setToken(response.token);
      this.setUser(response.user);
    }

    return response;
  }

  // User login
  async login(data: LoginRequest): Promise<AuthResponse> {
    console.log('Logging in user:', { ...data, password: '[HIDDEN]' });
    
    const response = await this.apiRequest<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setToken(response.token);
      this.setUser(response.user);
    }

    return response;
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await this.apiRequest<{ success: boolean; user: User }>('/profile');
    return response.user;
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.apiRequest<{ success: boolean; user: User }>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setUser(response.user);
    }

    return response.user;
  }

  // Guest account upgrade
  async upgradeGuestAccount(data: GuestUpgradeRequest): Promise<AuthResponse> {
    console.log('Upgrading guest account:', { ...data, password: '[HIDDEN]' });
    
    const response = await this.apiRequest<AuthResponse>('/guest/upgrade', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success) {
      this.setToken(response.token);
      this.setUser(response.user);
    }

    return response;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await this.apiRequest('/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout API call failed, but clearing local data:', error);
    } finally {
      this.removeToken();
      this.removeUser();
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  // Check if user is a guest
  isGuest(): boolean {
    const user = this.getUser();
    return user?.isGuest || false;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.getUser();
  }

  // Get auth token
  getAuthToken(): string | null {
    return this.getToken();
  }

  // Clear all auth data
  clearAuth(): void {
    this.removeToken();
    this.removeUser();
  }

  // Refresh user data from server
  async refreshUser(): Promise<User | null> {
    try {
      const user = await this.getProfile();
      this.setUser(user);
      return user;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      this.clearAuth();
      return null;
    }
  }
}

// Export singleton instance
export const authServiceV2 = new AuthServiceV2(); 