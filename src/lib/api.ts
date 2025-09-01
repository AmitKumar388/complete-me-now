const API_BASE_URL = "http://localhost:5000/api";

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
  tags: string[];
  isPinned: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  success: false;
}

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth API
export const authAPI = {
  // Register new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  // Login user
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    
    return data;
  },
};

// Notes API
export const notesAPI = {
  // Get all notes for authenticated user
  getNotes: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
  }): Promise<{
    notes: Note[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.tag) searchParams.append('tag', params.tag);
    
    const response = await fetch(`${API_BASE_URL}/notes?${searchParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Get single note by ID
  getNote: async (id: string): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Create new note
  createNote: async (noteData: {
    title: string;
    content: string;
    tags?: string[];
    color?: string;
  }): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    
    return handleResponse(response);
  },

  // Update note
  updateNote: async (id: string, noteData: {
    title?: string;
    content?: string;
    tags?: string[];
    isPinned?: boolean;
    color?: string;
  }): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    
    return handleResponse(response);
  },

  // Delete note
  deleteNote: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  // Toggle pin status
  togglePin: async (id: string): Promise<Note> => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}/pin`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Get stored auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};