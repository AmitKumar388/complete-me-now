import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

interface DashboardProps {
  onSignOut: () => void;
}

interface Note {
  id: string;
  title: string;
  createdAt: Date;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Note 1', createdAt: new Date() },
    { id: '2', title: 'Note 2', createdAt: new Date() }
  ]);
  const [newNote, setNewNote] = useState('');
  const [showCreateNote, setShowCreateNote] = useState(false);

  const handleCreateNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote,
        createdAt: new Date()
      };
      setNotes([...notes, note]);
      setNewNote('');
      setShowCreateNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

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
            onClick={onSignOut}
          >
            Sign Out
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="p-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-1">Welcome, Jonas Kahnwald !</h2>
              <p className="text-sm text-muted-foreground">Email: xxxxxx@xxxx.com</p>
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
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateNote()}
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateNote} size="sm">Add Note</Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowCreateNote(false);
                    setNewNote('');
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
              {notes.map((note) => (
                <Card key={note.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3 flex items-center justify-between">
                    <span className="text-sm">{note.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
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