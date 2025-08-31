import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Pin, Edit3 } from 'lucide-react';
import { authAPI, notesAPI, type Note, type User } from '@/lib/api';

interface DashboardProps {
  onSignOut: () => void;
}

// Note interface is imported from api.ts

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load user and notes on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [userResponse, notesResponse] = await Promise.all([
          authAPI.getCurrentUser(),
          notesAPI.getNotes()
        ]);
        
        setUser(userResponse);
        setNotes(notesResponse.notes);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note title",
        variant: "destructive",
      });
      return;
    }

    try {
      const newNote = await notesAPI.createNote({
        title: newNoteTitle,
        content: newNoteContent,
      });
      
      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowCreateNote(false);
      
      toast({
        title: "Success",
        description: "Note created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await notesAPI.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      
      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const handleTogglePin = async (id: string) => {
    try {
      const updatedNote = await notesAPI.togglePin(id);
      setNotes(notes.map(note => note._id === id ? updatedNote : note));
      
      toast({
        title: "Success",
        description: `Note ${updatedNote.isPinned ? 'pinned' : 'unpinned'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await authAPI.logout();
      onSignOut();
    } catch (error) {
      // Even if logout fails on server, we should still sign out locally
      onSignOut();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HD</span>
            </div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <Button 
            variant="link" 
            className="text-primary text-sm p-0"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="p-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-1">Welcome, {user?.name || 'User'}!</h2>
              <p className="text-sm text-muted-foreground">Email: {user?.email}</p>
            </CardContent>
          </Card>

          {/* Create Note Button */}
          <Button 
            className="w-full mb-6"
            onClick={() => setShowCreateNote(!showCreateNote)}
          >
            Create Note
          </Button>

          {/* Create Note Input */}
          {showCreateNote && (
            <div className="mb-4 space-y-2">
              <Input
                placeholder="Enter note title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <Textarea
                placeholder="Enter note content"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={3}
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateNote} size="sm">Add Note</Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowCreateNote(false);
                    setNewNoteTitle('');
                    setNewNoteContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Notes Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Notes</h3>
            <div className="space-y-2">
              {notes
                .sort((a, b) => {
                  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                .map((note) => (
                <Card key={note._id} className={`hover:shadow-sm transition-shadow ${note.isPinned ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{note.title}</h4>
                        {note.content && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {note.content}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePin(note._id)}
                          className={`h-8 w-8 p-0 ${note.isPinned ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                          <Pin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNote(note._id)}
                          className="h-8 w-8 p-0 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {notes.length === 0 && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground text-sm">No notes yet. Create your first note!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;