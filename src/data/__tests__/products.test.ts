import { products, getProductById, getProductsByCategory } from '../products';

describe('products data', () => {
  it('exports a non-empty array of products', () => {
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('every product has required fields', () => {
    for (const p of products) {
      expect(p.id).toBeDefined();
      expect(typeof p.name).toBe('string');
      expect(typeof p.price).toBe('number');
      expect(p.price).toBeGreaterThan(0);
      expect(typeof p.currency).toBe('string');
      expect(Array.isArray(p.imageUrl)).toBe(true);
      expect(p.imageUrl.length).toBeGreaterThan(0);
      expect(typeof p.description).toBe('string');
      expect(typeof p.rating).toBe('number');
      expect(p.rating).toBeGreaterThanOrEqual(0);
      expect(p.rating).toBeLessThanOrEqual(5);
      expect(typeof p.reviewCount).toBe('number');
    }
  });

  it('has unique product ids', () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every product has a valid category', () => {
    const validCategories = ['toys', 'keychains', 'boxes'];
    for (const p of products) {
      if (p.category) {
        expect(validCategories).toContain(p.category);
      }
    }
  });
});

describe('getProductById', () => {
  it('returns the correct product for a known id', () => {
    const product = getProductById(1);
    expect(product).toBeDefined();
    expect(product!.id).toBe(1);
    expect(product!.name).toBe('Candy Unicorn Amigurumi');
  });

  it('returns undefined for a non-existent id', () => {
    expect(getProductById(9999)).toBeUndefined();
  });

  it('returns undefined for negative id', () => {
    expect(getProductById(-1)).toBeUndefined();
  });
});

describe('getProductsByCategory', () => {
  it('returns only toys when filtering by toys', () => {
    const toys = getProductsByCategory('toys');
    expect(toys.length).toBeGreaterThan(0);
    for (const t of toys) {
      expect(t.category).toBe('toys');
    }
  });

  it('returns only keychains when filtering by keychains', () => {
    const keychains = getProductsByCategory('keychains');
    expect(keychains.length).toBeGreaterThan(0);
    for (const k of keychains) {
      expect(k.category).toBe('keychains');
    }
  });

  it('returns only boxes when filtering by boxes', () => {
    const boxes = getProductsByCategory('boxes');
    expect(boxes.length).toBeGreaterThan(0);
    for (const b of boxes) {
      expect(b.category).toBe('boxes');
    }
  });

  it('returns an empty array for a category with no products', () => {
    // cast to any to test with an invalid category
    const result = getProductsByCategory('nonexistent' as never);
    expect(result).toEqual([]);
  });

  it('sum of all categories equals total products with categories', () => {
    const toys = getProductsByCategory('toys');
    const keychains = getProductsByCategory('keychains');
    const boxes = getProductsByCategory('boxes');
    const categorizedCount = products.filter((p) => p.category).length;
    expect(toys.length + keychains.length + boxes.length).toBe(
      categorizedCount,
    );
  });
});
