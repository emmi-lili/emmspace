/**
 * Minimal local UI state via Zustand: the active home filter and optimistic
 * checklist toggles keyed by `${noteId}:${itemId}`. Server state lives in
 * TanStack Query, not here.
 */
import { create } from 'zustand';
import { type NoteFilter } from '@/types/note';

interface UIState {
  activeFilter: NoteFilter;
  setFilter: (filter: NoteFilter) => void;

  /** Active card index on the note-detail swipe stack. */
  detailIndex: number;
  setDetailIndex: (index: number) => void;

  /** Local overrides for checklist item done-state. */
  checklistOverrides: Record<string, boolean>;
  toggleChecklistItem: (noteId: string, itemId: string, next: boolean) => void;
  isItemDone: (noteId: string, itemId: string, fallback: boolean) => boolean;
}

export const useUIStore = create<UIState>((set, get) => ({
  activeFilter: 'all',
  setFilter: (activeFilter) => set({ activeFilter }),

  detailIndex: 0,
  setDetailIndex: (detailIndex) => set({ detailIndex }),

  checklistOverrides: {},
  toggleChecklistItem: (noteId, itemId, next) =>
    set((state) => ({
      checklistOverrides: {
        ...state.checklistOverrides,
        [`${noteId}:${itemId}`]: next,
      },
    })),
  isItemDone: (noteId, itemId, fallback) => {
    const override = get().checklistOverrides[`${noteId}:${itemId}`];
    return override ?? fallback;
  },
}));
