/**
 * The main white card on the note-detail stack. Shows the note title, date, an
 * edit (pencil) button, a blue headline, the body paragraph and up to two
 * side-by-side images. Edit mode makes the body editable in place.
 */
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { CircleButton } from '@/components/ui/CircleButton';
import { PencilIcon } from '@/components/ui/icons';
import { accents, fonts, radii, spacing } from '@/theme/tokens';
import { formatDateTime } from '@/lib/format';
import { type Note } from '@/types/note';

export interface ReflectionCardProps {
  note: Note;
  /** Fixed height so stacked siblings align. */
  height: number;
}

function getContent(note: Note): { headline: string | null; body: string; images: string[] } {
  switch (note.type) {
    case 'text':
      return { headline: note.headline, body: note.body, images: [] };
    case 'photos':
      return { headline: null, body: note.body ?? '', images: note.mediaUrls.slice(0, 2) };
    case 'checklist':
      return {
        headline: null,
        body: note.items.map((i) => `• ${i.label}`).join('\n'),
        images: [],
      };
    case 'audio':
      return { headline: null, body: 'Voice note', images: [] };
    case 'files':
    case 'pdf':
      return { headline: null, body: note.mediaUrls.join('\n'), images: [] };
    default:
      return { headline: null, body: '', images: [] };
  }
}

export function ReflectionCard({ note, height }: ReflectionCardProps) {
  const { headline, body, images } = getContent(note);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(body);

  return (
    <View style={[styles.card, { height }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.date}>{formatDateTime(note.createdAt)}</Text>
        </View>
        <CircleButton
          variant="solid"
          size={44}
          onPress={() => setEditing((e) => !e)}
          accessibilityLabel={editing ? 'Finish editing' : 'Edit note'}
        >
          <PencilIcon size={20} color={accents.darkText} />
        </CircleButton>
      </View>

      {headline ? <Text style={styles.headline}>{headline}</Text> : null}

      {editing ? (
        <TextInput
          style={styles.bodyInput}
          value={draft}
          onChangeText={setDraft}
          multiline
          accessibilityLabel="Note body"
          autoFocus
        />
      ) : (
        <Text style={styles.body}>{draft}</Text>
      )}

      {images.length > 0 && (
        <View style={styles.images}>
          {images.map((uri, i) => (
            <Image
              key={i}
              source={{ uri }}
              style={styles.image}
              contentFit="cover"
              transition={250}
              accessibilityIgnoresInvertColors
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    backgroundColor: '#FFFFFF',
    padding: spacing.xl,
    shadowColor: '#1E2230',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerText: {
    flexShrink: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: accents.darkText,
  },
  date: {
    fontFamily: fonts.uiRegular,
    fontSize: 12,
    color: 'rgba(30,34,48,0.5)',
    marginTop: 2,
  },
  headline: {
    fontFamily: fonts.uiBold,
    fontSize: 22,
    lineHeight: 28,
    color: accents.blue,
    marginTop: spacing.xl,
  },
  body: {
    fontFamily: fonts.uiRegular,
    fontSize: 15,
    lineHeight: 23,
    color: 'rgba(30,34,48,0.8)',
    marginTop: spacing.md,
  },
  bodyInput: {
    fontFamily: fonts.uiRegular,
    fontSize: 15,
    lineHeight: 23,
    color: accents.darkText,
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(30,34,48,0.04)',
    borderRadius: radii.sm,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  images: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 'auto',
    paddingTop: spacing.lg,
  },
  image: {
    flex: 1,
    height: 120,
    borderRadius: radii.md,
    backgroundColor: 'rgba(30,34,48,0.06)',
  },
});
