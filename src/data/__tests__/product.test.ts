import { sampleProduct } from '../product';

describe('sampleProduct', () => {
  it('has required fields', () => {
    expect(sampleProduct.id).toBe(1);
    expect(typeof sampleProduct.name).toBe('string');
    expect(sampleProduct.price).toBeGreaterThan(0);
    expect(typeof sampleProduct.currency).toBe('string');
    expect(Array.isArray(sampleProduct.imageUrl)).toBe(true);
    expect(sampleProduct.imageUrl.length).toBeGreaterThan(0);
    expect(typeof sampleProduct.description).toBe('string');
    expect(typeof sampleProduct.rating).toBe('number');
    expect(typeof sampleProduct.reviewCount).toBe('number');
  });

  it('has a rating in valid range', () => {
    expect(sampleProduct.rating).toBeGreaterThanOrEqual(0);
    expect(sampleProduct.rating).toBeLessThanOrEqual(5);
  });

  it('image URLs point to webp files', () => {
    for (const url of sampleProduct.imageUrl) {
      expect(url).toMatch(/\.webp$/);
    }
  });
});
