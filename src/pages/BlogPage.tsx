import React from 'react';
import { posts } from '../data/posts';
import BlogPostCard from '../components/BlogPostCard';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const BlogPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Blog - KT.TikoToys"
        description="Read the latest stories, knitting tips, and updates from our handmade toy studio."
      />
      <main className="flex-grow w-full min-h-screen pt-24 pb-20 px-4 bg-cream-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
              Our <span className="text-salmon">Journal</span>
            </h1>
            <p className="text-brown-light text-lg">
              Stories behind the stitches.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid gap-8 max-w-3xl mx-auto"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
