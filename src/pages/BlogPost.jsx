import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Building2, Rocket, Brain, Briefcase, User } from 'lucide-react';
import { useSEO, generateBlogPostingSchema } from '../hooks/useSEO';

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

export const BlogPost = ({ posts }) => {
    const { id } = useParams();
    const post = posts.find(p => p.id === id);

    // SEO for individual blog post (must be called before any conditional returns for hooks rules)
    useSEO({
        title: post ? `${post.title} | George Lolos` : 'Blog | George Lolos',
        description: post ? post.description : 'Case studies and insights from George Lolos',
        type: 'article',
        structuredData: post ? generateBlogPostingSchema(post) : null
    });

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const currentIndex = posts.findIndex(p => p.id === id);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    const CategoryIcon = categoryIcons[post.category] || TrendingUp;
    const gradientClass = categoryColors[post.category] || "from-zinc-500 to-zinc-600";

    return (
        <div className="pt-24 sm:pt-32 pb-16 md:pb-24">
            {/* Hero Section */}
            <div className={`px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 bg-gradient-to-br ${gradientClass}`}>
                <div className="w-full max-w-4xl mx-auto pt-8 sm:pt-12">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </motion.div>

                    {/* Category & Outcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-4 mb-6"
                    >
                        <div className="flex items-center gap-2">
                            <CategoryIcon className="w-5 h-5 text-white/80" />
                            <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                                {post.category}
                            </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold">
                            {post.outcome}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 text-white/80"
                    >
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">{post.role}</span>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 -mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                    <div className="p-6 sm:p-10 lg:p-12">
                        {/* Overview */}
                        <section className="mb-10">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                                Overview
                            </h2>
                            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {post.description}
                            </p>
                        </section>

                        {/* Challenge */}
                        <section className="mb-10">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                                The Challenge
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                {post.category === "Private Equity" && "The client needed rapid, comprehensive assessment of the target company's technology infrastructure to inform investment decisions. With tight deal timelines and high stakes, the due diligence had to be both thorough and efficient."}
                                {post.category === "Banking" && "Legacy systems, siloed data, and regulatory constraints made transformation complex. The organization needed a clear roadmap that balanced innovation with risk management while securing stakeholder buy-in."}
                                {post.category === "Venture Building" && "Building a new venture from scratch required establishing everything from technology stack to team culture. Speed to market was critical, but so was building a foundation that could scale."}
                                {post.category === "AI & Digital" && "Integrating AI into existing business processes required careful change management and technical integration. The challenge was proving value quickly while building sustainable capabilities."}
                                {post.category === "Digital Transformation" && "Modernizing legacy systems while maintaining business continuity required careful planning and execution. The organization needed to see results while managing the complexity of large-scale change."}
                                {post.category === "Advisory" && "Providing strategic guidance required understanding both technical realities and business objectives. The challenge was translating complex technical concepts into actionable business recommendations."}
                            </p>
                        </section>

                        {/* Approach */}
                        <section className="mb-10">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                                The Approach
                            </h2>
                            <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <p>
                                    As {post.role}, I brought a structured methodology combining deep technical expertise with strategic business thinking. The approach focused on:
                                </p>
                                <ul className="list-disc list-inside space-y-2 pl-4">
                                    <li>Comprehensive stakeholder mapping and requirement gathering</li>
                                    <li>Technical deep-dives with hands-on architecture review</li>
                                    <li>Risk identification and mitigation strategy development</li>
                                    <li>Clear communication of findings to both technical and business audiences</li>
                                </ul>
                            </div>
                        </section>

                        {/* Impact & Results */}
                        <section className="mb-10 p-6 sm:p-8 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                                Impact & Results
                            </h2>
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="w-6 h-6 text-emerald-500" />
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {post.outcome}
                                </span>
                            </div>
                            <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {post.impact}
                            </p>
                        </section>

                        {/* Key Takeaways */}
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
                                Key Takeaways
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                                    <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Technical Leadership</div>
                                    <p className="text-sm text-indigo-700 dark:text-indigo-400">Deep technical expertise combined with strategic vision drives lasting impact.</p>
                                </div>
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                    <div className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">Stakeholder Alignment</div>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-400">Success requires bringing together technical teams, executives, and external partners.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>

            {/* Navigation */}
            <div className="px-4 sm:px-6 lg:px-8 mt-12">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {prevPost ? (
                            <Link
                                to={`/blog/${prevPost.id}`}
                                className="flex-1 group p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                            >
                                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </div>
                                <div className="font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                    {prevPost.title}
                                </div>
                            </Link>
                        ) : <div className="flex-1" />}

                        {nextPost ? (
                            <Link
                                to={`/blog/${nextPost.id}`}
                                className="flex-1 group p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-right"
                            >
                                <div className="flex items-center justify-end gap-2 text-sm text-zinc-500 mb-2">
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                                <div className="font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                    {nextPost.title}
                                </div>
                            </Link>
                        ) : <div className="flex-1" />}
                    </div>
                </div>
            </div>
        </div>
    );
};
