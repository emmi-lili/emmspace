/**
 * Server-state hooks for notes via TanStack Query. When Supabase is configured
 * they read from Postgres; otherwise they resolve the bundled mock data, so the
 * UI behaves identically in both modes.
 */
import { useQuery } from '@tanstack/react-query';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { mapRowToNote } from '@/lib/mapNote';
import { mockCollectionNotes, mockNotes } from '@/mock/notes';
import { type Note, type NoteRow } from '@/types/note';

export const notesKeys = {
  all: ['notes'] as const,
  list: () => [...notesKeys.all, 'list'] as const,
  collection: (name: string) => [...notesKeys.all, 'collection', name] as const,
  detail: (id: string) => [...notesKeys.all, 'detail', id] as const,
};

async function fetchNotes(): Promise<Note[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockNotes;
  }
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as NoteRow[]).map(mapRowToNote);
}

export function useNotes() {
  return useQuery({
    queryKey: notesKeys.list(),
    queryFn: fetchNotes,
  });
}

async function fetchCollection(name: string): Promise<Note[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockCollectionNotes.filter((n) => n.collection === name);
  }
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('collection', name)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as NoteRow[]).map(mapRowToNote);
}

/**
 * Notes for the detail screen. `id` is a note id; we resolve its collection and
 * return every note in that collection (falling back to the single note).
 */
export function useNoteCollection(id: string) {
  return useQuery({
    queryKey: notesKeys.detail(id),
    queryFn: async (): Promise<{ collection: string; notes: Note[] }> => {
      if (!isSupabaseConfigured || !supabase) {
        const all = [...mockNotes, ...mockCollectionNotes];
        const note = all.find((n) => n.id === id);
        const collection = note?.collection ?? null;
        if (collection) {
          return { collection, notes: await fetchCollection(collection) };
        }
        return { collection: note?.title ?? 'Note', notes: note ? [note] : [] };
      }

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      const note = mapRowToNote(data as NoteRow);
      if (note.collection) {
        return {
          collection: note.collection,
          notes: await fetchCollection(note.collection),
        };
      }
      return { collection: note.title, notes: [note] };
    },
  });
}
