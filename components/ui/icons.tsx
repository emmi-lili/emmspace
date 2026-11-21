/**
 * Minimal stroke/fill icon set drawn with react-native-svg, so the app has no
 * icon-font dependency. Every icon takes a `size` and `color`.
 */
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function DotsIcon({ size = 22, color = '#FFFFFF' }: IconProps) {
  const r = size * 0.1;
  const o = size * 0.26;
  const c = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={c - o} cy={c - o} r={r} fill={color} />
      <Circle cx={c + o} cy={c - o} r={r} fill={color} />
      <Circle cx={c - o} cy={c + o} r={r} fill={color} />
      <Circle cx={c + o} cy={c + o} r={r} fill={color} />
    </Svg>
  );
}

export function DotsHorizontalIcon({ size = 22, color = '#FFFFFF' }: IconProps) {
  const r = size * 0.1;
  const o = size * 0.28;
  const c = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={c - o} cy={c} r={r} fill={color} />
      <Circle cx={c} cy={c} r={r} fill={color} />
      <Circle cx={c + o} cy={c} r={r} fill={color} />
    </Svg>
  );
}

export function PlusIcon({ size = 24, color = '#1E2230', strokeWidth = 2.4 }: IconProps) {
  const c = size / 2;
  const arm = size * 0.3;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path
        d={`M${c} ${c - arm} L${c} ${c + arm}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d={`M${c - arm} ${c} L${c + arm} ${c}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MicIcon({ size = 24, color = '#FFFFFF', strokeWidth = 2 }: IconProps) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24">
      <Rect x={9} y={3} width={6} height={11} rx={3} fill={color} />
      <Path
        d="M6 11a6 6 0 0 0 12 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M12 17v3M9 20h6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 24, color = '#FFFFFF', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M15 5 L8 12 L15 19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function PencilIcon({ size = 22, color = '#1E2230', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M16.5 4.5l3 3L8 19l-4 1 1-4L16.5 4.5z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function PlayIcon({ size = 22, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 5v14l11-7z" fill={color} />
    </Svg>
  );
}

export function PauseIcon({ size = 22, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={7} y={5} width={3.5} height={14} rx={1.5} fill={color} />
      <Rect x={13.5} y={5} width={3.5} height={14} rx={1.5} fill={color} />
    </Svg>
  );
}

export function ImageIcon({ size = 18, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={3}
        y={5}
        width={18}
        height={14}
        rx={3}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle cx={8.5} cy={10} r={1.6} fill={color} />
      <Path
        d="M5 17l4.5-4 3 2.5L16 12l3 3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function DocumentIcon({ size = 36, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 3h7l4 4v14H7z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M14 3v4h4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = '#FFFFFF', strokeWidth = 2.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 13l4 4L19 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
