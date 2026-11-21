/** Maps the active home filter to a predicate over notes. */
import { type Note, type NoteFilter } from '@/types/note';

export function filterNotes(notes: Note[], filter: NoteFilter): Note[] {
  switch (filter) {
    case 'all':
      return notes;
    case 'todo':
      return notes.filter((n) => n.type === 'checklist');
    case 'images':
      return notes.filter((n) => n.type === 'photos');
    case 'audio':
      return notes.filter((n) => n.type === 'audio');
    case 'important':
      return notes.filter((n) => n.important);
    default:
      return notes;
  }
}

export const FILTERS: { key: NoteFilter; label: string }[] = [
  { key: 'all', label: 'All Notes' },
  { key: 'todo', label: 'To-Do' },
  { key: 'images', label: 'Images' },
  { key: 'important', label: 'Important' },
  { key: 'audio', label: 'Audio' },
];
