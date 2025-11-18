/**
 * Perlin Noise Generator
 *
 * Creates smooth, organic noise patterns for natural-looking animations.
 * Optimized with cached gradients for performance.
 *
 * Based on Ken Perlin's improved noise algorithm (2002)
 */

class PerlinNoise {
  private permutation: number[];
  private gradients: { [key: string]: [number, number] };

  constructor(seed?: number) {
    // Initialize permutation table
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i;
    }

    // Shuffle using seed (or random)
    const random = seed !== undefined ? this.seededRandom(seed) : Math.random;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]];
    }

    // Duplicate permutation to avoid overflow
    this.permutation = [...this.permutation, ...this.permutation];

    // Cache for gradient vectors
    this.gradients = {};
  }

  /**
   * Seeded random number generator for reproducible noise
   */
  private seededRandom(seed: number): () => number {
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  /**
   * Get or create gradient vector for a grid point
   */
  private getGradient(x: number, y: number): [number, number] {
    const key = `${x},${y}`;

    if (!this.gradients[key]) {
      // Generate random gradient vector
      const angle = (this.permutation[x % 256] + this.permutation[y % 256]) / 256 * Math.PI * 2;
      this.gradients[key] = [Math.cos(angle), Math.sin(angle)];
    }

    return this.gradients[key];
  }

  /**
   * Compute dot product of gradient and distance vectors
   */
  private dotGridGradient(ix: number, iy: number, x: number, y: number): number {
    const gradient = this.getGradient(ix, iy);
    const dx = x - ix;
    const dy = y - iy;
    return dx * gradient[0] + dy * gradient[1];
  }

  /**
   * Smootherstep interpolation function (6t^5 - 15t^4 + 10t^3)
   * Provides smooth acceleration/deceleration
   */
  private smootherstep(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  /**
   * Linear interpolation
   */
  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  /**
   * Generate 2D Perlin noise value at coordinates (x, y)
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns Noise value between -1 and 1
   */
  public noise2D(x: number, y: number): number {
    // Grid cell coordinates
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    // Interpolation weights
    const sx = this.smootherstep(x - x0);
    const sy = this.smootherstep(y - y0);

    // Compute dot products at grid corners
    const n0 = this.dotGridGradient(x0, y0, x, y);
    const n1 = this.dotGridGradient(x1, y0, x, y);
    const ix0 = this.lerp(n0, n1, sx);

    const n2 = this.dotGridGradient(x0, y1, x, y);
    const n3 = this.dotGridGradient(x1, y1, x, y);
    const ix1 = this.lerp(n2, n3, sx);

    return this.lerp(ix0, ix1, sy);
  }

  /**
   * Generate octave noise for more detailed patterns
   * Combines multiple frequencies of noise
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param octaves - Number of noise layers to combine
   * @param persistence - How much each octave contributes (0-1)
   * @returns Noise value between -1 and 1
   */
  public octaveNoise2D(
    x: number,
    y: number,
    octaves: number = 4,
    persistence: number = 0.5
  ): number {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.noise2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= 2;
    }

    return total / maxValue;
  }

  /**
   * Clear cached gradients to free memory
   */
  public clearCache(): void {
    this.gradients = {};
  }
}

// Export singleton instance with default seed
export const perlinNoise = new PerlinNoise();

// Export class for custom instances
export default PerlinNoise;
