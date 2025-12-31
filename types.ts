
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTargetReached: boolean;
}

export interface Blessing {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  scale: number;
  rotation: number;
}
