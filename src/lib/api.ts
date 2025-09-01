// Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date().toISOString(),
};

let mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: 'Welcome to your notes app! This is your first note.',
    tags: ['welcome'],
    isPinned: true,
    color: '#fbbf24',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Auth API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ ...mockUser, name: userData.name, email: userData.email }));
    return { user: { ...mockUser, name: userData.name, email: userData.email } };
  },

  login: async (credentials: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { user: mockUser };
  },

  getCurrentUser: async () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : mockUser;
  },

  logout: async () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    return { message: 'Logged out successfully' };
  },
};

// Mock Notes API
export const notesAPI = {
  getNotes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      notes: mockNotes,
      total: mockNotes.length,
      page: 1,
      totalPages: 1,
    };
  },

  createNote: async (noteData: { title: string; content: string; tags?: string[]; color?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newNote: Note = {
      id: Date.now().toString(),
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      isPinned: false,
      color: noteData.color || '#f3f4f6',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockNotes.unshift(newNote);
    return newNote;
  },

  deleteNote: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockNotes = mockNotes.filter(note => note.id !== id);
    return { message: 'Note deleted successfully' };
  },

  togglePin: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const note = mockNotes.find(n => n.id === id);
    if (note) {
      note.isPinned = !note.isPinned;
    }
    return note!;
  },
};

// Auto authentication - always return true
export const isAuthenticated = (): boolean => {
  return true;
};