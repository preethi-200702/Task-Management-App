import { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Palette,
  Plus,
  User,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  Flower,
  Heart,
} from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Header({
  activeView,
  onOpenMobileSidebar,
  searchQuery,
  setSearchQuery,
  onAddTask,
  overdueCount,
  tasks,
}) {
  const { mode, toggleMode, accentConfig, setIsThemeModalOpen } = useTheme();
  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const titles = {
    dashboard: { title: 'Garden Desk', subtitle: 'A cozy overview of your daily blooms & milestones 🌸' },
    tasks: { title: 'My Blooms', subtitle: 'Organize, nurture, and check off your personal task list 📝' },
    board: { title: 'Seedling Board', subtitle: 'Move your tasks gently through each stage of growth 🌱' },
    calendar: { title: 'Planner & Days', subtitle: 'Quiet days, planned deadlines & peaceful schedule 📅' },
    settings: { title: 'Cozy Settings', subtitle: 'Pick your favorite pastel palette and theme mood 🎨' },
  };

  const currentMeta = titles[activeView] || titles.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-[#fdfbf7]/90 dark:bg-[#1a1722]/90 backdrop-blur-md border-b border-[#f1eae1] dark:border-[#2b2538] px-4 sm:px-6 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Button & View Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-2xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-[#f5efe6] dark:hover:bg-[#252030] md:hidden transition-colors"
            title="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                {currentMeta.title}
              </h2>
            </div>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 hidden sm:block tracking-wide">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Search Input styled like a gentle journal search */}
        <div className="hidden lg:flex items-center max-w-xs w-full relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search cozy tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-2xl border border-[#e8dfd4] dark:border-[#332b42] bg-white/80 dark:bg-[#221d2d]/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass} shadow-2xs transition-all`}
          />
        </div>

        {/* Right: Actions, Theme Control, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Add Task Button */}
          <button
            type="button"
            onClick={onAddTask}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold shadow-xs transition-all hover:scale-102 active:scale-98 shrink-0 ${accentConfig.btnClass}`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Plant Task</span>
          </button>

          {/* Quick Light/Dark Toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className="p-2 rounded-2xl border border-[#e8dfd4] dark:border-[#332b42] bg-white/70 dark:bg-[#221d2d]/70 text-slate-600 dark:text-slate-300 hover:bg-[#f5efe6] dark:hover:bg-[#282236] transition-colors"
            title={`Switch to ${mode === 'light' ? 'Cozy Dark' : 'Warm Light'} Mode`}
          >
            {mode === 'light' ? (
              <Moon className="w-4 h-4 text-purple-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Accent Color Palette Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsThemeModalOpen(true)}
            className="p-2 rounded-2xl border border-[#e8dfd4] dark:border-[#332b42] bg-white/70 dark:bg-[#221d2d]/70 text-slate-600 dark:text-slate-300 hover:bg-[#f5efe6] dark:hover:bg-[#282236] transition-colors"
            title="Choose cozy pastel palette"
          >
            <Palette className={`w-4 h-4 ${accentConfig.textClass}`} />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-2xl border border-[#e8dfd4] dark:border-[#332b42] bg-white/70 dark:bg-[#221d2d]/70 text-slate-600 dark:text-slate-300 hover:bg-[#f5efe6] dark:hover:bg-[#282236] transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {overdueCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {overdueCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#fdfbf7] dark:bg-[#1f1b2b] rounded-3xl shadow-xl border border-[#e8dfd4] dark:border-[#332b42] p-4 space-y-3 animate-in fade-in z-50">
                <div className="flex items-center justify-between border-b border-[#f1eae1] dark:border-[#2b2538] pb-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className={`w-4 h-4 ${accentConfig.textClass}`} />
                    <h4 className="font-heading font-semibold text-xs text-slate-800 dark:text-slate-100">
                      Garden Notes
                    </h4>
                  </div>
                  <span className="font-hand text-xs text-slate-400">
                    {overdueCount > 0 ? `${overdueCount} Needs Care` : 'All peaceful'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {overdueCount > 0 ? (
                    <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-2.5 text-rose-700 dark:text-rose-300">
                      <Heart className="w-4 h-4 shrink-0 mt-0.5 text-rose-500 fill-rose-500/20" />
                      <div>
                        <p className="font-bold">Gentle reminder</p>
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-0.5">
                          {overdueCount} task{overdueCount > 1 ? 's are' : ' is'} past due date. Give them some love today!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 flex items-start gap-2.5 text-emerald-700 dark:text-emerald-300">
                      <Flower className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                      <div>
                        <p className="font-bold">All caught up!</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                          Everything is on track. Take a deep breath and enjoy your day!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-[#282236] text-slate-600 dark:text-slate-400 text-[11px] font-hand">
                    🌸 Tip: Customize your favorite pastel accent color in Settings.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-2xl hover:bg-[#f5efe6] dark:hover:bg-[#282236] transition-colors"
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-2xl flex items-center justify-center text-white text-xs font-bold shadow-xs ${accentConfig.btnClass.split(' ')[0]}`}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : '🌿'}
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-heading font-semibold text-slate-800 dark:text-slate-100 leading-none">
                  {user?.name || 'Gardener'}
                </p>
                <p className="font-hand text-[11px] text-slate-400 mt-0.5">personal workspace</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#fdfbf7] dark:bg-[#1f1b2b] rounded-3xl shadow-xl border border-[#e8dfd4] dark:border-[#332b42] p-3 space-y-2 animate-in fade-in z-50">
                <div className="p-2.5 border-b border-[#f1eae1] dark:border-[#2b2538]">
                  <p className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">
                    {user?.name || 'Gardener'}
                  </p>
                  <p className="text-[11px] text-slate-400 break-all">
                    {user?.email || 'my-workspace@bloomtask.app'}
                  </p>
                  <span className={`inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${accentConfig.badgeClass}`}>
                    🌱 Active Garden Desk
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div
                    className="p-2 rounded-xl hover:bg-[#f5efe6] dark:hover:bg-[#282236] cursor-pointer flex items-center justify-between transition-colors"
                    onClick={() => {
                      setIsThemeModalOpen(true);
                      setShowProfileMenu(false);
                    }}
                  >
                    <span>Change Theme Accent</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-between transition-colors text-left font-medium"
                  >
                    <span>Log Out of Workspace</span>
                    <span>🚪</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
