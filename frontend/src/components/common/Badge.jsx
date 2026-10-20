import { useTheme } from '../../context/ThemeContext';

export function PriorityBadge({ priority }) {
  const configs = {
    High: {
      label: 'High Priority',
      badgeClass: 'bg-rose-100/80 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
      dotClass: 'bg-rose-400',
    },
    Medium: {
      label: 'Medium',
      badgeClass: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
      dotClass: 'bg-amber-400',
    },
    Low: {
      label: 'Low',
      badgeClass: 'bg-[#f4efe8] text-slate-700 dark:bg-[#2b2538] dark:text-slate-300 border-[#e5ded4] dark:border-[#382f47]',
      dotClass: 'bg-slate-400',
    },
  };

  const config = configs[priority] || configs.Low;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.badgeClass} font-heading shadow-2xs`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  let inProgressClass = 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/60';
  
  try {
    const { accentConfig } = useTheme();
    if (accentConfig?.badgeClass && accentConfig?.borderClass) {
      inProgressClass = `${accentConfig.badgeClass} border ${accentConfig.borderClass}`;
    }
  } catch {
    // fallback if rendered outside ThemeProvider
  }

  const configs = {
    'To Do': {
      label: '🌱 Seed',
      badgeClass: 'bg-[#f4efe8] text-slate-700 dark:bg-[#2b2538] dark:text-slate-300 border-[#e5ded4] dark:border-[#382f47]',
    },
    'In Progress': {
      label: '🌿 Sprouting',
      badgeClass: inProgressClass,
    },
    Completed: {
      label: '🌸 Bloomed',
      badgeClass: 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    },
  };

  const config = configs[status] || configs['To Do'];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.badgeClass} font-heading shadow-2xs`}
    >
      {config.label}
    </span>
  );
}
