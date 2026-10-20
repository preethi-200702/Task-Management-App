// Centralized API Client with Cookie + Bearer Token Dual Support

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('bloomtask_auth_token');
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('bloomtask_auth_token', token);
    } else {
      localStorage.removeItem('bloomtask_auth_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    // credentials: 'include' ensures HttpOnly cookies are sent across origins when configured
    const config = {
      ...options,
      headers,
      credentials: 'include',
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      // Re-throw with user-friendly error message
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        throw new Error('Unable to connect to BloomTask server. Please make sure the backend is running.');
      }
      throw err;
    }
  }

  /* Auth Endpoints */
  async register(name, email, password) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) this.setToken(data.token);
    return data;
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } catch {
      // Clean up token anyway even if backend is offline
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
    return await this.request('/api/auth/me');
  }

  /* Task Endpoints */
  async getTasks() {
    return await this.request('/api/tasks');
  }

  async createTask(taskData) {
    return await this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id, taskData) {
    return await this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id) {
    return await this.request(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  /* Health Endpoint */
  async getHealth() {
    return await this.request('/api/health');
  }
}

export const api = new ApiClient();
export default api;
