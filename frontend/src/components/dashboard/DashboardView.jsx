import { ArrowRight, Plus, Activity, CheckCircle2, Flower, Sprout, Sparkles } from '../common/Icons';
import StatCards from './StatCards';
import TaskOverview from './TaskOverview';
import TaskCard from '../tasks/TaskCard';
import { useTheme } from '../../context/ThemeContext';

export default function DashboardView({
  tasks,
  stats,
  isLoading,
  onNavigateToTasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
  backendHealth,
  onPingBackend,
  isPingingBackend,
  backendError,
}) {
  const { accentConfig } = useTheme();

  // Show up to 4 most recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* 4 Dynamic Whimsical Statistic Cards */}
      <StatCards stats={stats} />

      {/* Task Life-Cycle Overview & Visual Meters */}
      <TaskOverview stats={stats} />

      {/* Recent Tasks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${accentConfig.textClass}`} />
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100">
                Fresh Sprouting Tasks
              </h3>
            </div>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
              Your most recently planted ideas & milestones
            </p>
          </div>
          <button
            onClick={onNavigateToTasks}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accentConfig.textClass} hover:underline cursor-pointer font-heading`}
          >
            <span>View All Blooms ({tasks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center bg-white/80 dark:bg-[#1f1b2b] rounded-3xl border border-[#ede5db] dark:border-[#382f47] space-y-2 animate-pulse">
            <Sprout className="w-6 h-6 text-emerald-500 animate-bounce mx-auto" />
            <p className="font-hand text-xs text-slate-400">Loading your recent workspace blooms...</p>
          </div>
        ) : recentTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white/80 dark:bg-[#1f1b2b] rounded-3xl border border-dashed border-[#e4dcd2] dark:border-[#382f47] space-y-2">
            <p className="font-hand text-sm text-slate-400 dark:text-slate-500">
              Your little corner is quiet right now. No tasks to display yet.
            </p>
            <button
              onClick={onAddTask}
              className={`mt-2 text-xs font-semibold ${accentConfig.textClass} inline-flex items-center gap-1 font-heading`}
            >
              <Plus className="w-3.5 h-3.5" /> Plant Your First Task
            </button>
          </div>
        )}
      </div>

      {/* Preserved Full-Stack Health Monitor */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Activity className="w-4 h-4" />
              </span>
              <h4 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">
                Full-Stack API Bridge & Server Link
              </h4>
            </div>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-1">
              Checks live communication with Express backend at <code className={`px-2 py-0.5 rounded-lg bg-[#f4efe8] dark:bg-[#2b2538] text-[11px] font-mono ${accentConfig.textClass}`}>http://localhost:5000/api/health</code>
            </p>
          </div>

          <button
            onClick={onPingBackend}
            disabled={isPingingBackend}
            className={`px-4 py-2 text-xs font-semibold rounded-2xl border border-[#e8dfd4] dark:border-[#382f47] bg-white/70 dark:bg-[#221d2d] hover:bg-[#f5efe6] dark:hover:bg-[#2b2538] text-slate-700 dark:text-slate-300 transition-colors shrink-0 ${
              isPingingBackend ? 'opacity-50' : ''
            }`}
          >
            {isPingingBackend ? 'Testing connection...' : 'Ping Express Server'}
          </button>
        </div>

        {backendHealth && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              API Status: {backendHealth.status?.toUpperCase()} &bull; {backendHealth.message}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
              {backendHealth.timestamp}
            </span>
          </div>
        )}

        {backendError && (
          <div className="mt-4 p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-hand">
            ⚠️ Connection Notice: {backendError}. Run <code className="font-mono bg-rose-100 dark:bg-rose-900/60 px-1.5 py-0.5 rounded">npm run dev</code> inside <code className="font-mono bg-rose-100 dark:bg-rose-900/60 px-1.5 py-0.5 rounded">backend/</code>.
          </div>
        )}
      </div>
    </div>
  );
}
