/**
 * Thin wrapper around expo-audio's recorder for the mic button. Requests
 * permission on first use, fires haptics on start/stop, and exposes a simple
 * `isRecording` flag plus the resulting file uri.
 */
import { useCallback, useState } from 'react';
import * as Haptics from 'expo-haptics';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

export interface VoiceRecorder {
  isRecording: boolean;
  durationMillis: number;
  start: () => Promise<void>;
  stop: () => Promise<string | null>;
}

export function useVoiceRecorder(): VoiceRecorder {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const ensurePermission = useCallback(async () => {
    if (permissionGranted) return true;
    const result = await AudioModule.requestRecordingPermissionsAsync();
    setPermissionGranted(result.granted);
    return result.granted;
  }, [permissionGranted]);

  const start = useCallback(async () => {
    const granted = await ensurePermission();
    if (!granted) return;
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await recorder.prepareToRecordAsync();
    recorder.record();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }, [ensurePermission, recorder]);

  const stop = useCallback(async () => {
    await recorder.stop();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    await setAudioModeAsync({ allowsRecording: false });
    return recorder.uri;
  }, [recorder]);

  return {
    isRecording: state.isRecording,
    durationMillis: state.durationMillis ?? 0,
    start,
    stop,
  };
}
