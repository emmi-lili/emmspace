/**
 * Maps a Supabase `notes` row (snake_case, nullable) into the strongly-typed
 * `Note` discriminated union the UI consumes.
 */
import { type CardColorName, cardColors } from '@/theme/tokens';
import { type Note, type NoteRow } from '@/types/note';

function toColorName(value: string): CardColorName {
  return (Object.keys(cardColors) as CardColorName[]).includes(
    value as CardColorName,
  )
    ? (value as CardColorName)
    : 'frostedWhite';
}

export function mapRowToNote(row: NoteRow): Note {
  const base = {
    id: row.id,
    title: row.title,
    color: toColorName(row.color),
    collection: row.collection,
    important: row.important ?? false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  switch (row.type) {
    case 'checklist':
      return { ...base, type: 'checklist', items: row.items ?? [] };
    case 'audio':
      return {
        ...base,
        type: 'audio',
        audioUrl: row.media_urls?.[0] ?? null,
        waveform: row.waveform ?? [],
        durationSec: row.duration_sec ?? 0,
      };
    case 'photos':
      return {
        ...base,
        type: 'photos',
        mediaUrls: row.media_urls ?? [],
        body: row.body,
      };
    case 'files':
      return { ...base, type: 'files', mediaUrls: row.media_urls ?? [] };
    case 'pdf':
      return { ...base, type: 'pdf', mediaUrls: row.media_urls ?? [] };
    case 'text':
    default:
      return {
        ...base,
        type: 'text',
        headline: row.headline,
        body: row.body ?? '',
      };
  }
}
