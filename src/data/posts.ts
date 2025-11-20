export interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'Our First Blog Post!',
    date: 'November 18, 2025',
    excerpt:
      "Welcome to our new blog! We're excited to share news and updates with you.",
    content:
      "This is the full content of our first blog post. We'll be sharing more about our products, our process, and our team in the coming weeks. Stay tuned!",
  },
  {
    id: 2,
    title: 'New Winter Collection',
    date: 'November 20, 2025',
    excerpt:
      'Get ready for winter with our new collection of handmade beanies.',
    content:
      'Our new winter collection is here! We have a variety of new colors and styles to choose from. All of our beanies are handmade with love and care. Check them out in our shop!',
  },
];
