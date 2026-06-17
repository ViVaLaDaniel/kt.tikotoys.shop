import { sampleReviews } from '../reviews';

describe('reviews data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(sampleReviews)).toBe(true);
    expect(sampleReviews.length).toBeGreaterThan(0);
  });

  it('every review has required fields', () => {
    for (const r of sampleReviews) {
      expect(typeof r.id).toBe('number');
      expect(typeof r.author).toBe('string');
      expect(r.author.length).toBeGreaterThan(0);
      expect(typeof r.location).toBe('string');
      expect(typeof r.rating).toBe('number');
      expect(r.rating).toBeGreaterThanOrEqual(1);
      expect(r.rating).toBeLessThanOrEqual(5);
      expect(typeof r.text).toBe('string');
      expect(r.text.length).toBeGreaterThan(0);
    }
  });

  it('has unique review ids', () => {
    const ids = sampleReviews.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
