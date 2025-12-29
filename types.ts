
export interface Point {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  friction: number;
}

export interface Firework {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  distanceToTarget: number;
  distanceTraveled: number;
  coordinates: Point[];
  coordinateCount: number;
  angle: number;
  speed: number;
  acceleration: number;
  brightness: number;
  targetRadius: number;
  hue: number;
}
