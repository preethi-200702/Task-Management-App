import { CheckCircle2, Clock, AlertTriangle, Layers, Sprout, Flower, Heart, Sparkles } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';

export default function StatCards({ stats }) {
  const { accentConfig } = useTheme();

  const cards = [
    {
      id: 'total',
      title: 'Total Blooms',
      value: stats.total,
      subtitle: `${stats.toDo} tasks pending care`,
      icon: Layers,
      colorClass: 'text-slate-600 dark:text-slate-300',
      bgClass: 'bg-[#f4efe8] dark:bg-[#2b2538]',
      badge: 'All Seeds',
      badgeClass: 'bg-[#f1eae1] text-slate-700 dark:bg-[#2e273d] dark:text-slate-300',
    },
    {
      id: 'completed',
      title: 'Fully Bloomed',
      value: stats.completed,
      subtitle: `${stats.completionRate}% of garden complete`,
      icon: Flower,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/40',
      badge: `${stats.completionRate}% Done`,
      badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'in-progress',
      title: 'Sprouting Now',
      value: stats.inProgress,
      subtitle: 'Currently growing strong',
      icon: Sprout,
      colorClass: accentConfig.textClass,
      bgClass: accentConfig.bgLightClass,
      badge: 'Growing',
      badgeClass: accentConfig.badgeClass,
    },
    {
      id: 'overdue',
      title: 'Needs Tender Care',
      value: stats.overdue,
      subtitle: stats.overdue > 0 ? 'Give a little extra love' : 'All deadlines peaceful',
      icon: Heart,
      colorClass: stats.overdue > 0 ? 'text-rose-500 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400',
      bgClass: stats.overdue > 0 ? 'bg-rose-50 dark:bg-rose-950/40' : 'bg-[#f4efe8] dark:bg-[#2b2538]',
      badge: stats.overdue > 0 ? 'Action Needed' : 'Serene',
      badgeClass: stats.overdue > 0
        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
        : 'bg-[#f1eae1] text-slate-600 dark:bg-[#2e273d] dark:text-slate-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-5 border border-[#ede5db] dark:border-[#332b42] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden group"
          >
            {/* Subtle top decorative ribbon accent */}
            <div className="flex items-center justify-between mb-3.5">
              <span className={`p-2.5 rounded-2xl ${card.bgClass} ${card.colorClass} transition-transform group-hover:scale-105`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${card.badgeClass}`}>
                {card.badge}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-heading">
                {card.title}
              </p>
              <h3 className="font-heading text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 tracking-tight">
                {card.value}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-hand truncate">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
