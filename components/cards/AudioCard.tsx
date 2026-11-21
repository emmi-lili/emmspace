/**
 * AudioCard — lavender card with a white play/pause button and an animated
 * waveform. If the note has a real `audioUrl` it drives `expo-audio` playback
 * and mirrors the player's playing state; otherwise it animates the waveform
 * as a preview.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { CircleButton } from '@/components/ui/CircleButton';
import { PlayIcon, PauseIcon } from '@/components/ui/icons';
import { CardShell } from './CardShell';
import { Waveform } from './Waveform';
import { accents, fonts, spacing } from '@/theme/tokens';
import { formatDuration } from '@/lib/format';
import { type AudioNote } from '@/types/note';

export interface AudioCardProps {
  note: AudioNote;
  onPress?: () => void;
}

export function AudioCard({ note, onPress }: AudioCardProps) {
  const source = useMemo(
    () => (note.audioUrl ? { uri: note.audioUrl } : null),
    [note.audioUrl],
  );
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  // Local preview state for mock notes that have no real audio.
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const isRealAudio = Boolean(note.audioUrl);
  const playing = isRealAudio ? status.playing : previewPlaying;

  // Auto-stop the mock preview after the note's duration.
  useEffect(() => {
    if (!isRealAudio && previewPlaying) {
      const t = setTimeout(() => setPreviewPlaying(false), note.durationSec * 1000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isRealAudio, previewPlaying, note.durationSec]);

  const toggle = useCallback(() => {
    if (isRealAudio) {
      if (status.playing) {
        player.pause();
      } else {
        if (status.didJustFinish || status.currentTime >= status.duration) {
          player.seekTo(0);
        }
        player.play();
      }
    } else {
      setPreviewPlaying((p) => !p);
    }
  }, [isRealAudio, player, status]);

  return (
    <CardShell
      color={note.color}
      onPress={onPress}
      accessibilityLabel={`Audio note: ${note.title}`}
    >
      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.row}>
        <CircleButton
          variant="solid"
          size={48}
          onPress={toggle}
          accessibilityLabel={playing ? 'Pause audio' : 'Play audio'}
        >
          {playing ? (
            <PauseIcon size={20} color={accents.darkText} />
          ) : (
            <PlayIcon size={20} color={accents.darkText} />
          )}
        </CircleButton>
        <Waveform amplitudes={note.waveform} playing={playing} />
      </View>
      <Text style={styles.duration}>{formatDuration(note.durationSec)}</Text>
    </CardShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.uiBold,
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  duration: {
    marginTop: spacing.sm,
    fontFamily: fonts.uiRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
});
