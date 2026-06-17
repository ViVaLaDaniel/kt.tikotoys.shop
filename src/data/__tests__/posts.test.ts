import { posts } from '../posts';

describe('posts data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('every post has required fields', () => {
    for (const p of posts) {
      expect(typeof p.id).toBe('number');
      expect(typeof p.title).toBe('string');
      expect(p.title.length).toBeGreaterThan(0);
      expect(typeof p.date).toBe('string');
      expect(typeof p.excerpt).toBe('string');
      expect(p.excerpt.length).toBeGreaterThan(0);
      expect(typeof p.content).toBe('string');
      expect(p.content.length).toBeGreaterThan(0);
    }
  });

  it('has unique post ids', () => {
    const ids = posts.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('excerpt is shorter than content', () => {
    for (const p of posts) {
      expect(p.excerpt.length).toBeLessThan(p.content.length);
    }
  });
});
