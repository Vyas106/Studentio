
// components/lists/NotesList.tsx
import { Card } from "@/components/ui/card";
import type { Note } from "../../types/user";

export function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id} className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{note.title}</h3>
              <span className="text-sm text-gray-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">{note.description}</p>
            <a
              href={note.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View Note
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}