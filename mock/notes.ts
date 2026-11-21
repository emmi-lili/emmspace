/**
 * Mock notes that reproduce the example content from the design. Used whenever
 * Supabase is not configured, so the app is fully explorable out of the box.
 */
import { type Note } from '@/types/note';

/** Deterministic pseudo-random waveform so cards look consistent across renders. */
function makeWaveform(seed: number, count = 40): number[] {
  const out: number[] = [];
  let x = seed;
  for (let i = 0; i < count; i += 1) {
    x = (x * 9301 + 49297) % 233280;
    const r = x / 233280;
    // Bias toward a central bulge so it reads as a voice note.
    const envelope = Math.sin((i / count) * Math.PI);
    out.push(0.2 + r * 0.8 * (0.4 + envelope * 0.6));
  }
  return out;
}

const PHOTO_A = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80';
const PHOTO_B = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80';
const PHOTO_C = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80';
const PHOTO_D = 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80';

export const mockNotes: Note[] = [
  {
    id: 'note-shopping',
    type: 'checklist',
    title: 'Shopping List',
    color: 'mint',
    collection: null,
    important: true,
    createdAt: '2026-05-28T09:00:00.000Z',
    updatedAt: '2026-05-28T09:00:00.000Z',
    items: [
      { id: 'i1', label: 'Vegetables', done: true },
      { id: 'i2', label: 'Fruits', done: false },
      { id: 'i3', label: 'Grocery', done: false },
    ],
  },
  {
    id: 'note-thought',
    type: 'text',
    title: 'Thought of the day',
    color: 'frostedWhite',
    collection: 'Thought of the day',
    important: false,
    createdAt: '2026-06-01T10:10:00.000Z',
    updatedAt: '2026-06-01T10:10:00.000Z',
    headline: 'Embrace the moment and let your spirit soar.',
    body: 'Every day is a fresh start—embrace it with hope and courage. Let each moment inspire you to grow and shine brighter than before.',
  },
  {
    id: 'note-voice',
    type: 'audio',
    title: 'Voice memo',
    color: 'lavender',
    collection: null,
    important: false,
    createdAt: '2026-05-30T14:20:00.000Z',
    updatedAt: '2026-05-30T14:20:00.000Z',
    audioUrl: null,
    waveform: makeWaveform(7),
    durationSec: 42,
  },
  {
    id: 'note-files',
    type: 'files',
    title: 'Files',
    color: 'cream',
    collection: null,
    important: false,
    createdAt: '2026-05-22T11:00:00.000Z',
    updatedAt: '2026-05-22T11:00:00.000Z',
    mediaUrls: ['report.docx', 'notes.txt'],
  },
  {
    id: 'note-pdf',
    type: 'pdf',
    title: 'Pdf',
    color: 'pinkLilac',
    collection: null,
    important: false,
    createdAt: '2026-05-20T16:30:00.000Z',
    updatedAt: '2026-05-20T16:30:00.000Z',
    mediaUrls: ['invoice.pdf', 'ticket.pdf'],
  },
  {
    id: 'note-highlights',
    type: 'photos',
    title: 'Highlights',
    color: 'frostedWhite',
    collection: 'Highlights',
    important: false,
    createdAt: '2026-05-25T18:00:00.000Z',
    updatedAt: '2026-05-25T18:00:00.000Z',
    body: null,
    mediaUrls: [PHOTO_A, PHOTO_B, PHOTO_C],
  },
  {
    id: 'note-snapshots',
    type: 'photos',
    title: 'Snapshots',
    color: 'frostedWhite',
    collection: 'Snapshots',
    important: true,
    createdAt: '2026-05-25T18:05:00.000Z',
    updatedAt: '2026-05-25T18:05:00.000Z',
    body: null,
    mediaUrls: [PHOTO_D, PHOTO_C],
  },
];

/**
 * Notes belonging to the "Thought of the day" collection, rendered as the card
 * stack on the detail screen. Multiple reflections share the collection.
 */
export const mockCollectionNotes: Note[] = [
  {
    id: 'reflection-1',
    type: 'photos',
    title: 'Morning Reflection',
    color: 'frostedWhite',
    collection: 'Thought of the day',
    important: false,
    createdAt: '2026-06-01T10:10:00.000Z',
    updatedAt: '2026-06-01T10:10:00.000Z',
    body: 'Every day is a fresh start—embrace it with hope and courage. Let each moment inspire you to grow and shine brighter than before.',
    mediaUrls: [PHOTO_A, PHOTO_B],
  },
  {
    id: 'reflection-2',
    type: 'text',
    title: 'Evening Gratitude',
    color: 'cream',
    collection: 'Thought of the day',
    important: false,
    createdAt: '2026-05-31T21:00:00.000Z',
    updatedAt: '2026-05-31T21:00:00.000Z',
    headline: 'Rest is productive too.',
    body: 'Give yourself permission to slow down. A calm mind sees the path more clearly than a hurried one.',
  },
  {
    id: 'reflection-3',
    type: 'text',
    title: 'Quiet Intention',
    color: 'lavender',
    collection: 'Thought of the day',
    important: false,
    createdAt: '2026-05-30T08:00:00.000Z',
    updatedAt: '2026-05-30T08:00:00.000Z',
    headline: 'Small steps, steady heart.',
    body: 'Progress rarely announces itself. Keep showing up and let consistency do the quiet work.',
  },
];
