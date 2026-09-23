import { clamp, perlin1D } from './math';

export class TraumaManager {
  private trauma: number = 0;
  private decayRate: number = 1.2; // decay per second
  private maxX: number = 30; // px
  private maxY: number = 30; // px
  private maxRoll: number = 2.5; // degrees

  public addTrauma(amount: number) {
    this.trauma = clamp(this.trauma + amount, 0, 1);
  }

  public update(dt: number, time: number) {
    if (this.trauma > 0) {
      this.trauma = clamp(this.trauma - this.decayRate * dt, 0, 1);
    }
    
    const shake = this.trauma * this.trauma;
    
    return {
      offsetX: this.maxX * shake * perlin1D(time * 18, 0),
      offsetY: this.maxY * shake * perlin1D(time * 18, 100),
      roll: this.maxRoll * shake * perlin1D(time * 18, 200)
    };
  }

  public getTrauma() {
    return this.trauma;
  }
}

export const globalTrauma = new TraumaManager();
