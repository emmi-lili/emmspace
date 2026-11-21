/**
 * The app mark: a 12-ray asterisk / light-burst drawn in SVG. Each ray is a
 * slim rounded capsule radiating from the center, giving a soft "sparkle".
 */
import Svg, { G, Rect } from 'react-native-svg';

export interface LogoProps {
  size?: number;
  color?: string;
}

const RAYS = 12;

export function Logo({ size = 34, color = '#FFFFFF' }: LogoProps) {
  const center = size / 2;
  const rayWidth = size * 0.11;
  const rayLength = size * 0.46;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <G>
        {Array.from({ length: RAYS }).map((_, i) => {
          const angle = (360 / RAYS) * i;
          return (
            <Rect
              key={i}
              x={center - rayWidth / 2}
              y={center - rayLength / 2}
              width={rayWidth}
              height={rayLength}
              rx={rayWidth / 2}
              fill={color}
              origin={`${center}, ${center}`}
              rotation={angle}
            />
          );
        })}
      </G>
    </Svg>
  );
}
