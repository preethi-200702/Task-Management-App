import { Plus, ArrowRight, ArrowLeft, Check, Edit3, Trash2, Calendar, AlertTriangle, Sprout, Flower, Sparkles, Heart } from '../common/Icons';
import { PriorityBadge } from '../common/Badge';
import { isTaskOverdue, formatDueDate } from '../../data/sampleTasks';
import { useTheme } from '../../context/ThemeContext';

export default function BoardView({
  tasks,
  onAddTaskWithStatus,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}) {
  const { accentConfig } = useTheme();

  const columns = [
    {
      id: 'To Do',
      title: 'Seeds & Ideas',
      subtitle: 'To Do',
      icon: Sprout,
      colorClass: 'border-[#e4ded4] dark:border-[#382f47]',
      headerBg: 'bg-[#f4efe8] dark:bg-[#252033] text-slate-800 dark:text-slate-100',
      badgeClass: 'bg-[#e9e1d6] text-slate-700 dark:bg-[#342c44] dark:text-slate-300',
      dotClass: 'bg-slate-400',
    },
    {
      id: 'In Progress',
      title: 'Sprouting',
      subtitle: 'In Progress',
      icon: Sparkles,
      colorClass: accentConfig.borderClass,
      headerBg: `${accentConfig.bgLightClass} ${accentConfig.textClass}`,
      badgeClass: accentConfig.badgeClass,
      dotClass: accentConfig.previewClass,
    },
    {
      id: 'Completed',
      title: 'Fully Bloomed',
      subtitle: 'Completed',
      icon: Flower,
      colorClass: 'border-emerald-200 dark:border-emerald-900/40',
      headerBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200',
      badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      dotClass: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Board Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${accentConfig.textClass}`} />
            <h2 className="font-heading font-bold text-xl text-slate-800 dark:text-slate-100">
              Seedling Board View
            </h2>
          </div>
          <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
            Nurture your tasks across growth stages with sweet ease.
          </p>
        </div>
      </div>

      {/* 3 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          const ColIcon = col.icon;

          return (
            <div
              key={col.id}
              className="bg-[#faf7f2]/80 dark:bg-[#1a1724]/80 rounded-3xl p-4 border border-[#ede5db] dark:border-[#332b42] flex flex-col min-h-[500px] shadow-xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f1eae1] dark:border-[#2b2538]">
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-lg ${col.headerBg}`}>
                    <ColIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-100">
                      {col.title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badgeClass}`}>
                    {colTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddTaskWithStatus(col.id)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-[#252033] transition-colors"
                  title={`Plant task in ${col.title}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Column Task Cards */}
              <div className="space-y-3 flex-1">
                {colTasks.map((task) => {
                  const isOverdue = isTaskOverdue(task);

                  return (
                    <div
                      key={task._id || task.id}
                      className="bg-white/95 dark:bg-[#211d2c] rounded-2xl p-4 border border-[#ede5db] dark:border-[#352c44] shadow-xs hover:shadow-md transition-all duration-200 group relative"
                    >
                      {/* Priority & Category Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <PriorityBadge priority={task.priority} />
                        {task.category && (
                          <span className="text-[10px] text-slate-400 font-semibold uppercase font-heading">
                            {task.category}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                        {task.title}
                      </h4>

                      {/* Description */}
                      {task.description && (
                        <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      {/* Due Date */}
                      <div
                        className={`flex items-center gap-1.5 text-[11px] mt-3 font-medium font-hand ${
                          isOverdue
                            ? 'text-rose-500 dark:text-rose-400 font-semibold'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {isOverdue ? (
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                        ) : (
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>{formatDueDate(task.dueDate)}</span>
                      </div>

                      {/* Card Footer with Quick Move Arrows */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f4efe8] dark:border-[#2e263d]">
                        {/* Quick Status Shift */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'To Do' && (
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateStatus(
                                  task._id || task.id,
                                  col.id === 'Completed' ? 'In Progress' : 'To Do'
                                )
                              }
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] text-[11px] flex items-center gap-0.5"
                              title="Move back a stage"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'Completed' && (
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateStatus(
                                  task._id || task.id,
                                  col.id === 'To Do' ? 'In Progress' : 'Completed'
                                )
                              }
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] text-[11px] flex items-center gap-0.5"
                              title="Advance to next stage"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {/* Edit & Delete Actions */}
                        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => onEditTask(task)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538]"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteTask(task)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-[#e3d8ca] dark:border-[#382f47] rounded-2xl space-y-1">
                    <p className="font-hand text-xs text-slate-400 dark:text-slate-500">
                      No seedlings in this section
                    </p>
                    <button
                      type="button"
                      onClick={() => onAddTaskWithStatus(col.id)}
                      className={`mt-1 text-xs font-semibold ${accentConfig.textClass} hover:underline inline-flex items-center gap-1 font-heading`}
                    >
                      <Plus className="w-3 h-3" />
                      Plant task here
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
