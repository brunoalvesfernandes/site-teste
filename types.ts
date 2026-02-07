export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface GameObject {
  position: Position;
  size: Size;
  velocity: Velocity;
  color: string;
  active: boolean;
}

export interface Player extends GameObject {
  lives: number;
  score: number;
  weapon: WeaponType;
  lastShot: number;
  shootCooldown: number;
}

export interface Enemy extends GameObject {
  type: EnemyType;
  health: number;
  points: number;
}

export interface Bullet extends GameObject {
  damage: number;
  owner: 'player' | 'enemy';
}

export interface Particle extends GameObject {
  lifetime: number;
  maxLifetime: number;
}

export type WeaponType = 'basic' | 'spread' | 'laser';
export type EnemyType = 'basic' | 'fast' | 'tank';

export interface GameState {
  player: Player;
  enemies: Enemy[];
  bullets: Bullet[];
  particles: Particle[];
  gameTime: number;
  level: number;
  isRunning: boolean;
  isPaused: boolean;
  enemiesKilled: number;
  shotsFired: number;
  shotsHit: number;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  playerSpeed: number;
  enemySpeed: number;
  bulletSpeed: number;
  enemySpawnRate: number;
  maxEnemies: number;
}