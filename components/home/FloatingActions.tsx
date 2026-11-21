/**
 * The floating dark-translucent capsule anchored at the bottom of the home
 * screen: a solid white "+" button (opens the note-type sheet) and a glass mic
 * button (hold to record a voice note). While recording, the capsule shows a
 * pulsing dot and the elapsed time.
 */
import { useCallback, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { CircleButton } from '@/components/ui/CircleButton';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { PlusIcon, MicIcon } from '@/components/ui/icons';
import { NoteTypeSheet } from './NoteTypeSheet';
import { accents, capsule, fonts, radii, sizes, spacing } from '@/theme/tokens';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { formatDuration } from '@/lib/format';
import { type NoteType } from '@/types/note';

export interface FloatingActionsProps {
  onCreateNote?: (type: NoteType) => void;
  onRecordComplete?: (uri: string | null) => void;
}

export function FloatingActions({
  onCreateNote,
  onRecordComplete,
}: FloatingActionsProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const recorder = useVoiceRecorder();
  const pulse = useSharedValue(0);

  const startRecording = useCallback(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 600 }), -1, true);
    void recorder.start();
  }, [recorder, pulse]);

  const stopRecording = useCallback(() => {
    pulse.value = withTiming(0);
    void recorder.stop().then((uri) => onRecordComplete?.(uri));
  }, [recorder, pulse, onRecordComplete]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + pulse.value * 0.6,
    transform: [{ scale: 0.85 + pulse.value * 0.3 }],
  }));

  const handleSelect = useCallback(
    (type: NoteType) => {
      setSheetOpen(false);
      onCreateNote?.(type);
    },
    [onCreateNote],
  );

  return (
    <>
      <View style={styles.anchor} pointerEvents="box-none">
        <View style={styles.capsule}>
          {Platform.OS !== 'android' && (
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          )}
          <View style={[StyleSheet.absoluteFill, styles.capsuleFill]} />

          {recorder.isRecording ? (
            <View style={styles.recordingRow}>
              <Animated.View style={[styles.recordDot, dotStyle]} />
              <Text style={styles.recordText}>
                {formatDuration(Math.floor(recorder.durationMillis / 1000))}
              </Text>
            </View>
          ) : (
            <CircleButton
              variant="solid"
              size={sizes.circleButton}
              onPress={() => setSheetOpen(true)}
              accessibilityLabel="Create a new note"
            >
              <PlusIcon size={26} color={accents.darkText} />
            </CircleButton>
          )}

          <MicButton
            isRecording={recorder.isRecording}
            onStart={startRecording}
            onStop={stopRecording}
          />
        </View>
      </View>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        <NoteTypeSheet onSelect={handleSelect} />
      </BottomSheet>
    </>
  );
}

interface MicButtonProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

/** Hold-to-record mic. Press-in starts; release stops. */
function MicButton({ isRecording, onStart, onStop }: MicButtonProps) {
  return (
    <View
      // Using the raw handlers keeps start/stop tied to the physical gesture.
      onTouchStart={onStart}
      onTouchEnd={onStop}
      onTouchCancel={onStop}
      accessibilityLabel="Hold to record a voice note"
      accessibilityRole="button"
      accessibilityState={{ selected: isRecording }}
    >
      <CircleButton
        variant="glass"
        size={sizes.circleButton}
        accessibilityLabel="Hold to record a voice note"
      >
        <MicIcon size={24} color="#FFFFFF" />
      </CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.xl,
    alignItems: 'center',
  },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    overflow: 'hidden',
    shadowColor: '#1E2230',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  capsuleFill: {
    backgroundColor: capsule.light,
    borderRadius: radii.pill,
  },
  recordingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    width: sizes.circleButton,
    height: sizes.circleButton,
    justifyContent: 'center',
  },
  recordDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: accents.softMagenta,
  },
  recordText: {
    fontFamily: fonts.uiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
