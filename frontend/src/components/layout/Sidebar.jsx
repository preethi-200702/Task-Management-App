import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  Calendar,
  Settings,
  Sparkles,
  X,
  Sprout,
  Flower,
  Heart,
  CheckCircle2,
} from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({
  activeView,
  setActiveView,
  isMobileOpen,
  setIsMobileOpen,
  taskCount,
  completionRate,
}) {
  const { accentConfig } = useTheme();
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Garden Desk', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Blooms', icon: CheckSquare, badge: taskCount },
    { id: 'board', label: 'Seedling Board', icon: Kanban },
    { id: 'calendar', label: 'Planner & Days', icon: Calendar },
    { id: 'settings', label: 'Cozy Settings', icon: Settings },
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#fdfbf7] dark:bg-[#1a1722] border-r border-[#f1eae1] dark:border-[#2b2538] w-64 select-none transition-colors">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#f1eae1] dark:border-[#2b2538]">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm transform -rotate-3 transition-transform hover:rotate-0 ${accentConfig.btnClass.split(' ')[0]}`}
          >
            <Flower className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">
                BloomTask
              </h1>
              <Sparkles className={`w-3.5 h-3.5 ${accentConfig.textClass}`} />
            </div>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 tracking-wide">
              your cozy little corner
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="p-3.5 space-y-1.5 flex-1 overflow-y-auto">
        <div className="px-3 py-1 flex items-center justify-between">
          <span className="font-hand text-xs text-slate-400 dark:text-slate-500 tracking-wider">
            Workspace Pages
          </span>
          <Sprout className={`w-3.5 h-3.5 ${accentConfig.textClass} opacity-60`} />
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? `${accentConfig.activeNavClass} shadow-xs`
                  : 'text-slate-600 dark:text-slate-300 hover:bg-[#f5efe6] dark:hover:bg-[#252030] hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`p-1 rounded-lg ${isActive ? accentConfig.bgLightClass : 'bg-transparent'}`}>
                  <Icon className={`w-4 h-4 ${isActive ? accentConfig.textClass : 'text-slate-400'}`} />
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? accentConfig.badgeClass
                      : 'bg-[#f1eae1] dark:bg-[#2b2538] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Progress & Garden Widget */}
      <div className="p-4 m-3 rounded-2xl bg-white/80 dark:bg-[#211d2c] border border-[#f1eae1] dark:border-[#2b2538] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-heading font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Sprout className={`w-4 h-4 ${accentConfig.textClass}`} />
            Garden Growth
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-100 font-hand text-sm">
            {completionRate}% bloomed
          </span>
        </div>
        <div className="w-full bg-[#f1eae1] dark:bg-[#2e273d] h-2 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${accentConfig.btnClass.split(' ')[0]}`}
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="font-hand text-xs text-slate-500 dark:text-slate-400 leading-tight">
          &ldquo;Little by little, one seedling at a time.&rdquo; 🌸
        </p>
      </div>

      {/* User Workspace Info & Logout */}
      {user && (
        <div className="px-3 pb-3">
          <div className="p-2.5 rounded-2xl bg-amber-50/50 dark:bg-[#1a1724] border border-amber-100/60 dark:border-purple-900/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${accentConfig.btnClass.split(' ')[0]}`}>
                {user.name ? user.name.charAt(0).toUpperCase() : '🌱'}
              </div>
              <div className="min-w-0">
                <p className="font-heading font-semibold text-xs text-slate-800 dark:text-amber-50 truncate leading-none">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Log out of workspace"
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
            >
              🚪
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Collapsible with backdrop) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-[80vw] h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
