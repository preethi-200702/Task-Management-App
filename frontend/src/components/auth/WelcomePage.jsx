import { Sprout, Flower, Sparkles, Heart, CheckCircle2 as CheckCircle, Star, ShieldCheck } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';

export default function WelcomePage({ onGoToLogin, onGoToRegister }) {
  const { accentConfig, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#17151e] text-slate-800 dark:text-amber-50 flex flex-col transition-colors selection:bg-purple-200 selection:text-purple-900">
      {/* Top Navbar */}
      <header className="border-b border-amber-200/50 dark:border-purple-900/40 bg-white/60 dark:bg-[#1a1724]/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${accentConfig.softBg} ${accentConfig.textColor} shadow-xs`}>
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-900 dark:text-amber-100">
                BloomTask
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-hand text-slate-400 dark:text-purple-300">
                your cozy workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl text-slate-500 dark:text-amber-200 hover:bg-amber-100/60 dark:hover:bg-purple-900/40 transition-colors"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button
              onClick={onGoToLogin}
              className="px-4 py-2 rounded-2xl text-sm font-semibold text-slate-700 dark:text-purple-200 hover:bg-amber-100/60 dark:hover:bg-purple-900/30 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={onGoToRegister}
              className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-xs transition-all hover:scale-102 ${accentConfig.btnClass}`}
            >
              Get Started 🌱
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-center">
        {/* Cute Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-100/80 dark:bg-purple-950/70 text-amber-900 dark:text-purple-200 border border-amber-200/70 dark:border-purple-800/50 shadow-xs mb-6 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A cozy, personal task sanctuary for calm minds</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 dark:text-amber-50 tracking-tight leading-tight max-w-3xl">
          Plant your thoughts. <br />
          <span className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500`}>
            Watch your days bloom.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-purple-200/80 max-w-2xl leading-relaxed">
          Say goodbye to sterile, stressful productivity trackers. BloomTask is your gentle digital desk with warm stationery aesthetics, personal private workspaces, and delightful habit-nurturing.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onGoToRegister}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-base font-bold shadow-md transition-all hover:scale-103 flex items-center justify-center gap-2 ${accentConfig.btnClass}`}
          >
            <Sprout className="w-5 h-5" />
            <span>Open Your Garden Desk</span>
          </button>
          <button
            onClick={onGoToLogin}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 dark:text-purple-200 bg-white/80 dark:bg-[#1e1b29] border border-amber-200/80 dark:border-purple-900/60 shadow-xs hover:bg-amber-50 dark:hover:bg-purple-900/30 transition-all"
          >
            I already have an account →
          </button>
        </div>

        {/* Visual Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#1e1b29]/70 border-2 border-amber-100/80 dark:border-purple-900/40 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-4">
              <Flower className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-amber-100">
              Private Garden Desks
            </h3>
            <p className="text-sm text-slate-600 dark:text-purple-200/70 mt-1.5 leading-relaxed">
              Every user has a completely isolated, private workspace. No one else sees your notes, seeds, or bloomed tasks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#1e1b29]/70 border-2 border-amber-100/80 dark:border-purple-900/40 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-amber-100">
              Cozy Themes & Colors
            </h3>
            <p className="text-sm text-slate-600 dark:text-purple-200/70 mt-1.5 leading-relaxed">
              Soft lavender, blush blossom, sage garden, peach sorbet, and buttercup gold. Switch between sunny light & cozy night sky anytime.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#1e1b29]/70 border-2 border-amber-100/80 dark:border-purple-900/40 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-amber-100">
              Genuine Persistence
            </h3>
            <p className="text-sm text-slate-600 dark:text-purple-200/70 mt-1.5 leading-relaxed">
              Powered by real bcrypt hashing, JWT authentication, and MongoDB database persistence. Your data stays safe and saved.
            </p>
          </div>
        </div>

        {/* Micro Footer */}
        <p className="mt-16 text-xs text-slate-400 dark:text-purple-400 font-hand text-base">
          Crafted with care 🌸 BloomTask — A Cozy MERN Productivity Application
        </p>
      </main>
    </div>
  );
}
