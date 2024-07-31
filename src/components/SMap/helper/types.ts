export interface SMapProps {
  width?: string | number;
  height?: string | number;
  tileType: 'gaode' | 'tianditu';
}

export interface Degree {
  longitude: number;
  latitude: number;
  height?: number;
}
