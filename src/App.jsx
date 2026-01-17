import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, Menu, X } from 'lucide-react';
import { PROFILE, EXPERIENCE, SERVICES, FEATURED_PROJECTS, BLOG_POSTS } from './data';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { FeaturedProjects } from './components/FeaturedProjects';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { useSEO } from './hooks/useSEO';

// Landing Page Component
function LandingPage() {
  // SEO for landing page
  useSEO({
    title: 'George Lolos | Fractional CTO & Engineering Leader | Ex-Google, Uber, Bain',
    description: 'Engineering Executive with 15+ years leading at Google, Uber, Bain. Fractional CTO, Technical Due Diligence, AI Transformation & Venture Building expert serving Europe & Middle East.',
    type: 'website'
  });

  return (
    <>
      <Hero profile={PROFILE} />
      <div id="services">
        <Services services={SERVICES} />
      </div>
      <div id="case-studies">
        <FeaturedProjects projects={FEATURED_PROJECTS} />
      </div>
      <div id="experience">
        <Experience experience={EXPERIENCE} />
      </div>
      <Contact profile={PROFILE} />
    </>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isLanding
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50 py-3 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo / Name */}
          <Link
            to="/"
            className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            {PROFILE.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Services
            </button>
            <Link to="/blog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Blog
            </Link>
            <button onClick={() => scrollToSection('experience')} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Experience
            </button>
            <motion.a
              href={`mailto:${PROFILE.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="px-4 py-4 space-y-4">
                <button onClick={() => scrollToSection('services')} className="block w-full text-left text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                  Services
                </button>
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                  Blog
                </Link>
                <button onClick={() => scrollToSection('experience')} className="block w-full text-left text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                  Experience
                </button>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogList posts={BLOG_POSTS} />} />
          <Route path="/blog/:id" element={<BlogPost posts={BLOG_POSTS} />} />
        </Routes>
      </main>

      <footer className="py-6 sm:py-8 text-center text-zinc-500 text-xs sm:text-sm border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {PROFILE.name}. {PROFILE.location}.
        </div>
      </footer>
    </div>
  );
}

export default App;
