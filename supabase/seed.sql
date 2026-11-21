-- Seed the example notes from the design for a given user.
--
-- RLS ties every note to a user, so set the target id first. Grab it from the
-- Supabase dashboard (Authentication → Users) or `select id from auth.users`.
--
--   1. Replace the placeholder below with a real auth user id.
--   2. Run this file in the SQL editor.

do $$
declare
  seed_user uuid := '00000000-0000-0000-0000-000000000000'; -- << replace me
begin
  delete from public.notes where user_id = seed_user;

  insert into public.notes
    (user_id, type, title, color, collection, important, body, headline, items, media_urls, waveform, duration_sec, created_at)
  values
    (seed_user, 'checklist', 'Shopping List', 'mint', null, true, null, null,
      '[{"id":"i1","label":"Vegetables","done":true},{"id":"i2","label":"Fruits","done":false},{"id":"i3","label":"Grocery","done":false}]'::jsonb,
      null, null, null, '2026-05-28T09:00:00Z'),

    (seed_user, 'text', 'Thought of the day', 'frostedWhite', 'Thought of the day', false,
      'Every day is a fresh start—embrace it with hope and courage. Let each moment inspire you to grow and shine brighter than before.',
      'Embrace the moment and let your spirit soar.',
      null, null, null, null, '2026-06-01T10:10:00Z'),

    (seed_user, 'audio', 'Voice memo', 'lavender', null, false, null, null, null,
      null,
      '{0.3,0.5,0.7,0.9,0.6,0.4,0.8,0.5,0.3,0.6,0.9,0.7,0.5,0.4,0.6,0.8,0.5,0.3}'::double precision[],
      42, '2026-05-30T14:20:00Z'),

    (seed_user, 'files', 'Files', 'cream', null, false, null, null, null,
      '{report.docx,notes.txt}'::text[], null, null, '2026-05-22T11:00:00Z'),

    (seed_user, 'pdf', 'Pdf', 'pinkLilac', null, false, null, null, null,
      '{invoice.pdf,ticket.pdf}'::text[], null, null, '2026-05-20T16:30:00Z'),

    (seed_user, 'photos', 'Highlights', 'frostedWhite', 'Highlights', false, null, null, null,
      '{https://images.unsplash.com/photo-1469474968028-56623f02e42e,https://images.unsplash.com/photo-1501785888041-af3ef285b470,https://images.unsplash.com/photo-1472214103451-9374bd1c798e}'::text[],
      null, null, '2026-05-25T18:00:00Z'),

    (seed_user, 'photos', 'Snapshots', 'frostedWhite', 'Snapshots', true, null, null, null,
      '{https://images.unsplash.com/photo-1470770841072-f978cf4d019e,https://images.unsplash.com/photo-1472214103451-9374bd1c798e}'::text[],
      null, null, '2026-05-25T18:05:00Z'),

    -- Collection notes for the "Thought of the day" detail stack.
    (seed_user, 'photos', 'Morning Reflection', 'frostedWhite', 'Thought of the day', false,
      'Every day is a fresh start—embrace it with hope and courage. Let each moment inspire you to grow and shine brighter than before.',
      null, null,
      '{https://images.unsplash.com/photo-1469474968028-56623f02e42e,https://images.unsplash.com/photo-1501785888041-af3ef285b470}'::text[],
      null, null, '2026-06-01T10:10:00Z'),

    (seed_user, 'text', 'Evening Gratitude', 'cream', 'Thought of the day', false,
      'Give yourself permission to slow down. A calm mind sees the path more clearly than a hurried one.',
      'Rest is productive too.', null, null, null, null, '2026-05-31T21:00:00Z'),

    (seed_user, 'text', 'Quiet Intention', 'lavender', 'Thought of the day', false,
      'Progress rarely announces itself. Keep showing up and let consistency do the quiet work.',
      'Small steps, steady heart.', null, null, null, null, '2026-05-30T08:00:00Z');
end $$;
