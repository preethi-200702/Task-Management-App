import { Calendar, Check, Edit3, Trash2, AlertTriangle, Flower, Heart } from '../common/Icons';
import { PriorityBadge, StatusBadge } from '../common/Badge';
import { isTaskOverdue, formatDueDate } from '../../data/sampleTasks';
import { useTheme } from '../../context/ThemeContext';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const { accentConfig } = useTheme();
  const isOverdue = isTaskOverdue(task);
  const isCompleted = task.status === 'Completed';

  return (
    <div
      className={`group bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-5 border transition-all duration-200 relative ${
        isCompleted
          ? 'border-[#ece4da]/70 dark:border-[#2b2538]/70 opacity-75 bg-[#faf7f2]/60 dark:bg-[#1a1722]/50'
          : isOverdue
          ? 'border-rose-300/80 dark:border-rose-900/60 shadow-xs shadow-rose-400/10'
          : 'border-[#ede5db] dark:border-[#332b42] hover:border-[#dfd3c3] dark:hover:border-[#483d5c] hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Whimsical Completion Checkbox */}
        <button
          type="button"
          onClick={() => onToggleStatus(task.id || task._id)}
          className={`mt-0.5 w-6 h-6 rounded-xl border flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs shadow-emerald-400/30 rotate-0'
              : 'border-[#d8cebe] dark:border-[#433954] hover:border-[#b8ab97] bg-white/90 dark:bg-[#252033] hover:scale-105'
          }`}
          title={isCompleted ? 'Mark as Not Bloomed' : 'Mark as Bloomed'}
        >
          {isCompleted && <Flower className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {task.category && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-[#f4efe8] dark:bg-[#2b2538] border border-[#e8dfd4] dark:border-[#352c44] font-heading">
                {task.category}
              </span>
            )}
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
          </div>

          <h4
            className={`font-heading text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-snug break-words ${
              isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
            }`}
          >
            {task.title}
          </h4>

          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-hand">
              {task.description}
            </p>
          )}

          {/* Footer Meta */}
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-[#f1eae1] dark:border-[#2b2538] text-xs">
            {/* Due Date Indicator */}
            <div
              className={`flex items-center gap-1.5 font-medium ${
                isOverdue
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isOverdue ? (
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
              ) : (
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="font-hand text-xs">
                {formatDueDate(task.dueDate)}
                {isOverdue && ' (Needs Love)'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] transition-colors"
                title="Edit task"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
