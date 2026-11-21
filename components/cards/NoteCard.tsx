/**
 * Dispatches a `Note` to its concrete card component based on the discriminated
 * `type`. The switch is exhaustive — adding a new NoteType surfaces a compile
 * error here until a card is wired up.
 */
import { ChecklistCard } from './ChecklistCard';
import { TextCard } from './TextCard';
import { AudioCard } from './AudioCard';
import { FilesCard } from './FilesCard';
import { PhotoCard } from './PhotoCard';
import { type Note } from '@/types/note';

export interface NoteCardProps {
  note: Note;
  onPress?: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  switch (note.type) {
    case 'checklist':
      return <ChecklistCard note={note} onPress={onPress} />;
    case 'text':
      return <TextCard note={note} onPress={onPress} />;
    case 'audio':
      return <AudioCard note={note} onPress={onPress} />;
    case 'files':
    case 'pdf':
      return <FilesCard note={note} onPress={onPress} />;
    case 'photos':
      return <PhotoCard note={note} onPress={onPress} />;
    default: {
      // Exhaustiveness guard.
      const _never: never = note;
      return _never;
    }
  }
}
