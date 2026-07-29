import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Tag,
  Search
} from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../data/mockExtraPagesData';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Living & Design', 'Craftsmanship', 'Style Trends', 'Tech Innovations'];

  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3.5 py-1 rounded-full">
            QuickKart Journal
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl tracking-tight">Editorial & Design Stories</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Exploring modern craftsmanship, interior architecture, Horology revolutions, and intentional living.
          </p>
        </div>

        {/* Featured Blog Post */}
        {MOCK_BLOG_POSTS.filter(p => p.featured).slice(0, 1).map(post => (
          <div key={post.id} className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-[#2e3a35] group">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-80 sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 sm:p-12 flex flex-col justify-end text-white">
              <span className="text-xs uppercase tracking-widest text-[#a3d0be] font-bold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#fd6c1a]" /> Featured Cover Story
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-4xl max-w-3xl mb-3 leading-tight">{post.title}</h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl mb-6 font-light line-clamp-2">{post.excerpt}</p>
              
              <div className="flex items-center justify-between border-t border-white/20 pt-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full object-cover border border-white/30" />
                  <div>
                    <h5 className="font-bold text-xs">{post.author.name}</h5>
                    <p className="text-[10px] text-gray-300">{post.author.role}</p>
                  </div>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fd6c1a] hover:bg-[#e8480a] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 dark:border-[#2e3a35] pb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#00241a] text-white dark:bg-[#234e40]'
                    : 'bg-white dark:bg-[#1c2722] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2e3a35]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] text-xs focus:outline-none focus:ring-2 focus:ring-[#fd6c1a]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white dark:bg-[#1c2722] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2e3a35] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-[#191c1d] dark:text-white group-hover:text-[#fd6c1a] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-[#2e3a35] text-xs">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{post.author.name}</span>
                </div>
                <span className="font-semibold text-[#00241a] dark:text-[#a3d0be] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
