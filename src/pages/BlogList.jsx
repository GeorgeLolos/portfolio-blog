import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Rocket, Brain, TrendingUp, Briefcase } from 'lucide-react';
import { useSEO, generateBlogListSchema } from '../hooks/useSEO';

const categoryIcons = {
    "Private Equity": Building2,
    "Banking": Building2,
    "Venture Building": Rocket,
    "AI & Digital": Brain,
    "Digital Transformation": TrendingUp,
    "Advisory": Briefcase,
};

const categoryColors = {
    "Private Equity": "from-blue-500 to-indigo-600",
    "Banking": "from-emerald-500 to-teal-600",
    "Venture Building": "from-orange-500 to-red-500",
    "AI & Digital": "from-purple-500 to-pink-500",
    "Digital Transformation": "from-cyan-500 to-blue-500",
    "Advisory": "from-amber-500 to-orange-500",
};

export const BlogList = ({ posts }) => {
    // SEO for blog listing
    useSEO({
        title: 'Case Studies & Insights | George Lolos',
        description: 'Deep dives into technology leadership, due diligence findings, and lessons learned from building ventures at Google, Uber, Bain and beyond.',
        type: 'website',
        structuredData: generateBlogListSchema(posts)
    });

    return (
        <div className="pt-24 sm:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4"
                    >
                        Insights & Case Studies
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-6"
                    >
                        Blog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
                    >
                        Deep dives into technology leadership, due diligence findings, and lessons learned from building ventures across industries.
                    </motion.p>
                </div>

                {/* Featured Post */}
                {posts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12 lg:mb-16"
                    >
                        <Link to={`/blog/${posts[0].id}`} className="block group">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 p-6 sm:p-8 lg:p-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                                {/* Image/Gradient Area */}
                                <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${categoryColors[posts[0].category] || "from-zinc-500 to-zinc-600"} flex items-center justify-center`}>
                                    {(() => {
                                        const Icon = categoryIcons[posts[0].category] || TrendingUp;
                                        return <Icon className="w-20 h-20 text-white/30" strokeWidth={1} />;
                                    })()}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                            Featured
                                        </span>
                                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                            {posts[0].category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {posts[0].title}
                                    </h2>
                                    <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3">
                                        {posts[0].description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                            {posts[0].outcome}
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                            Read More
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* All Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {posts.slice(1).map((post, index) => {
                        const CategoryIcon = categoryIcons[post.category] || TrendingUp;
                        const gradientClass = categoryColors[post.category] || "from-zinc-500 to-zinc-600";

                        return (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                                className="group"
                            >
                                <Link to={`/blog/${post.id}`} className="block h-full">
                                    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg overflow-hidden">
                                        {/* Header with gradient */}
                                        <div className={`h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                                            <CategoryIcon className="w-12 h-12 text-white/30" strokeWidth={1} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                                    {post.category}
                                                </span>
                                                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                    {post.outcome}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                                                {post.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                                Read More
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
