/** The Mi Espacio home filters and the chip labels, in display order. */
export type EspacioFilter =
  | 'all'
  | 'fede'
  | 'agenda'
  | 'recordatorios'
  | 'ideas';

export const ESPACIO_FILTERS: { key: EspacioFilter; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'fede', label: 'Fede' },
  { key: 'agenda', label: 'Agenda' },
  { key: 'recordatorios', label: 'Recordatorios' },
  { key: 'ideas', label: 'Ideas' },
];

/**
 * Whether a bento card tagged with `tags` is visible under the active filter.
 * "all" shows everything; otherwise the card must carry the active tag.
 */
export function cardVisible(
  tags: readonly EspacioFilter[],
  active: EspacioFilter,
): boolean {
  return active === 'all' || tags.includes(active);
}
