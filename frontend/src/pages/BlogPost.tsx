import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../data/mockExtraPagesData';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug) || MOCK_BLOG_POSTS[0];

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[900px] mx-auto space-y-8">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#00241a] dark:hover:text-[#a3d0be]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal Index
        </Link>

        {/* Post Title Header */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3.5 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="font-headline font-bold text-3xl sm:text-5xl leading-tight">{post.title}</h1>
          
          <div className="flex items-center justify-between border-y border-gray-200 dark:border-[#2e3a35] py-4 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h5 className="font-bold text-[#191c1d] dark:text-white">{post.author.name}</h5>
                <p className="text-[11px]">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-[#2e3a35]">
          <img src={post.coverImage} alt={post.title} className="w-full h-80 sm:h-[450px] object-cover" />
        </div>

        {/* Post Body Content */}
        <div className="bg-white dark:bg-[#1c2722] p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6 text-gray-700 dark:text-gray-200 leading-relaxed text-base">
          <p className="text-lg font-medium text-[#191c1d] dark:text-white leading-relaxed italic border-l-4 border-[#fd6c1a] pl-4">
            "{post.excerpt}"
          </p>
          <div className="whitespace-pre-line space-y-4">
            {post.content}
          </div>
        </div>

        {/* Shop The Look Banner */}
        <div className="bg-[#00241a] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-[#a3d0be] tracking-wider">Interactive Curated Shop</span>
            <h3 className="font-headline font-bold text-2xl">Love the items featured in this story?</h3>
            <p className="text-xs text-gray-300">Explore the full QuickKart catalog inspired by this article.</p>
          </div>
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl bg-[#fd6c1a] hover:bg-[#e8480a] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 flex-shrink-0 transition-colors shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" /> Shop Curated Collection
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogPost;
