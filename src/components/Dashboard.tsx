import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Task 1', content: 'Sample note content...', createdAt: new Date() },
    { id: '2', title: 'Task 2', content: 'Another note content...', createdAt: new Date() },
  ]);
  
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HD</span>
            </div>
            <span className="font-semibold">Dashboard</span>
          </div>
          <Button variant="ghost" size="sm">
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, Jonas Kahnwald !</h1>
          <p className="text-muted-foreground">jonas@gmail.com</p>
        </div>

        {/* Create Note Button */}
        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="note-title">Title</Label>
                  <Input
                    id="note-title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    placeholder="Enter note title"
                  />
                </div>
                <div>
                  <Label htmlFor="note-content">Content</Label>
                  <Textarea
                    id="note-content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Enter note content"
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreateNote} className="w-full">
                  Create Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="relative group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {note.title}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {note.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {note.createdAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {notes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notes yet. Create your first note!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;