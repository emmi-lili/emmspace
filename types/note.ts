/**
 * Note domain types. `Note` is a discriminated union over `type`, so each card
 * component can narrow to exactly the fields it renders.
 */
import { type CardColorName } from '@/theme/tokens';

export type NoteType =
  | 'text'
  | 'checklist'
  | 'audio'
  | 'photos'
  | 'files'
  | 'pdf';

/** Filter categories shown as chips on the home screen. */
export type NoteFilter = 'all' | 'todo' | 'images' | 'important' | 'audio';

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface NoteBase {
  id: string;
  title: string;
  color: CardColorName;
  collection: string | null;
  important: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface TextNote extends NoteBase {
  type: 'text';
  /** Big colored headline inside the card. */
  headline: string | null;
  body: string;
}

export interface ChecklistNote extends NoteBase {
  type: 'checklist';
  items: ChecklistItem[];
}

export interface AudioNote extends NoteBase {
  type: 'audio';
  /** Remote/local URI of the recording, if any. */
  audioUrl: string | null;
  /** Normalized amplitudes (0..1) used to render the waveform. */
  waveform: number[];
  /** Duration in seconds. */
  durationSec: number;
}

export interface PhotosNote extends NoteBase {
  type: 'photos';
  mediaUrls: string[];
  body: string | null;
}

export interface FilesNote extends NoteBase {
  type: 'files';
  mediaUrls: string[];
}

export interface PdfNote extends NoteBase {
  type: 'pdf';
  mediaUrls: string[];
}

export type Note =
  | TextNote
  | ChecklistNote
  | AudioNote
  | PhotosNote
  | FilesNote
  | PdfNote;

/** Shape of a row in the Supabase `notes` table (snake_case, nullable). */
export interface NoteRow {
  id: string;
  user_id: string;
  type: NoteType;
  title: string;
  body: string | null;
  headline: string | null;
  items: ChecklistItem[] | null;
  media_urls: string[] | null;
  color: string;
  collection: string | null;
  important: boolean | null;
  waveform: number[] | null;
  duration_sec: number | null;
  created_at: string;
  updated_at: string;
}
