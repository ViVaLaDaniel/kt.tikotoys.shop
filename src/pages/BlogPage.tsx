import React from 'react';
import { posts } from '../data/posts';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        News and Updates
      </h1>
      <div className="max-w-3xl mx-auto">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default BlogPage;
