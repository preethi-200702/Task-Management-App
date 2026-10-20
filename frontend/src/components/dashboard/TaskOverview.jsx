import { TrendingUp, Target, BarChart3, AlertCircle, Sprout, Flower, Heart, Sparkles } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';

export default function TaskOverview({ stats }) {
  const { accentConfig } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Overall Progress Meter */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-xl ${accentConfig.bgLightClass} ${accentConfig.textClass}`}>
                <Flower className="w-4 h-4" />
              </span>
              <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                Garden Progress
              </h3>
            </div>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your overall bloom rate today
            </p>
          </div>
          <span className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100">
            {stats.completionRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-[#f4efe8] dark:bg-[#2e273d] h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${accentConfig.btnClass.split(' ')[0]}`}
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-hand pt-1">
            <span>{stats.completed} of {stats.total} seeds bloomed</span>
            <span>{stats.total - stats.completed} still growing</span>
          </div>
        </div>

        {/* Whimsical Encouragement Box */}
        <div className="mt-5 p-3 rounded-2xl bg-[#faf6f0] dark:bg-[#252030] border border-[#f0e8de] dark:border-[#352c44] text-xs">
          {stats.overdue > 0 ? (
            <span className="text-rose-600 dark:text-rose-400 font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 shrink-0 text-rose-500 fill-rose-500/20" />
              <span>You have {stats.overdue} task{stats.overdue > 1 ? 's' : ''} calling for a little love!</span>
            </span>
          ) : (
            <span className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
              <Sprout className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Everything is flourishing smoothly. Keep up the gentle rhythm!</span>
            </span>
          )}
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-[#f4efe8] dark:bg-[#2b2538] text-slate-600 dark:text-slate-300">
            <BarChart3 className="w-4 h-4" />
          </span>
          <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
            Growth Stages
          </h3>
        </div>
        <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mb-4">
          Distribution of work across life-cycle stages
        </p>

        <div className="space-y-3.5">
          {/* To Do */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Seeds (To Do)
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-hand">{stats.toDo} tasks</span>
            </div>
            <div className="w-full bg-[#f4efe8] dark:bg-[#2e273d] h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-slate-400 h-full rounded-full transition-all"
                style={{ width: `${stats.total ? (stats.toDo / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* In Progress */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${accentConfig.previewClass}`} />
                Sprouting (In Progress)
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-hand">{stats.inProgress} tasks</span>
            </div>
            <div className="w-full bg-[#f4efe8] dark:bg-[#2e273d] h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all ${accentConfig.btnClass.split(' ')[0]}`}
                style={{ width: `${stats.total ? (stats.inProgress / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Completed */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Bloomed (Completed)
              </span>
              <span className="text-slate-800 dark:text-slate-200 font-hand">{stats.completed} tasks</span>
            </div>
            <div className="w-full bg-[#f4efe8] dark:bg-[#2e273d] h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
            Priority Petals
          </h3>
        </div>
        <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mb-4">
          How urgently each seedling needs water
        </p>

        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 text-center">
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase font-heading">High</span>
            <p className="font-heading text-2xl font-extrabold text-rose-700 dark:text-rose-300 mt-1">
              {stats.byPriority.High}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-center">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase font-heading">Medium</span>
            <p className="font-heading text-2xl font-extrabold text-amber-700 dark:text-amber-300 mt-1">
              {stats.byPriority.Medium}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#f4efe8] dark:bg-[#2b2538] border border-[#ede5db] dark:border-[#352c44] text-center">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase font-heading">Low</span>
            <p className="font-heading text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-1">
              {stats.byPriority.Low}
            </p>
          </div>
        </div>

        <p className="font-hand text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
          🌿 Tend to high priority seedlings first for maximum joy!
        </p>
      </div>
    </div>
  );
}
