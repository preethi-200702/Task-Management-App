import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Clock, AlertTriangle, Flower, Star, Heart } from '../common/Icons';
import { PriorityBadge, StatusBadge } from '../common/Badge';
import { isTaskOverdue, formatDueDate } from '../../data/sampleTasks';
import { useTheme } from '../../context/ThemeContext';

export default function CalendarView({ tasks, onEditTask }) {
  const { accentConfig } = useTheme();

  // Current view month/year
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Oct 2026
  const [selectedDateStr, setSelectedDateStr] = useState('2026-10-12');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Compute days in month
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Tasks mapped by date YYYY-MM-DD
  const tasksByDate = {};
  tasks.forEach((t) => {
    if (t.dueDate) {
      if (!tasksByDate[t.dueDate]) tasksByDate[t.dueDate] = [];
      tasksByDate[t.dueDate].push(t);
    }
  });

  const selectedDateTasks = tasksByDate[selectedDateStr] || [];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CalendarIcon className={`w-5 h-5 ${accentConfig.textClass}`} />
            Desk Planner & Schedule
          </h2>
          <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
            Keep track of due dates and upcoming milestones day by day.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2 bg-white/90 dark:bg-[#1f1b2b] px-3.5 py-1.5 rounded-2xl border border-[#ede5db] dark:border-[#332b42] shadow-xs self-start sm:self-auto">
          <button
            onClick={prevMonth}
            className="p-1 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-heading text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[120px] text-center">
            {monthName} {year}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Calendar Grid (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-5 border border-[#ede5db] dark:border-[#332b42] shadow-xs">
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 font-heading uppercase">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="h-16 sm:h-20 rounded-2xl bg-[#faf7f2]/50 dark:bg-[#252033]/30" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayTasks = tasksByDate[dateStr] || [];
              const isSelected = selectedDateStr === dateStr;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-16 sm:h-20 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? `${accentConfig.borderClass} ${accentConfig.bgLightClass} ring-2 ${accentConfig.ringClass}`
                      : 'border-[#f1eae1] dark:border-[#2b2538] hover:bg-[#faf7f2] dark:hover:bg-[#262033]'
                  }`}
                >
                  <span
                    className={`font-heading text-xs font-bold block ${
                      isSelected
                        ? accentConfig.textClass
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {/* Task Indicators */}
                  {dayTasks.length > 0 && (
                    <div className="space-y-1 w-full overflow-hidden">
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentConfig.previewClass}`} />
                        <span className="font-hand text-[11px] text-slate-600 dark:text-slate-400 truncate hidden sm:inline">
                          {dayTasks[0].title}
                        </span>
                      </div>
                      {dayTasks.length > 1 && (
                        <span className="text-[9px] font-bold text-slate-400 px-1.5 rounded-md bg-[#f1eae1] dark:bg-[#2e263d]">
                          +{dayTasks.length - 1} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Inspector Sidebar */}
        <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-5 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-4">
          <div className="border-b border-[#f1eae1] dark:border-[#2b2538] pb-3">
            <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Selected Day
            </span>
            <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
              {formatDueDate(selectedDateStr)}
            </h3>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
              {selectedDateTasks.length} task{selectedDateTasks.length === 1 ? '' : 's'} scheduled
            </p>
          </div>

          {/* List of Tasks for this date */}
          <div className="space-y-3">
            {selectedDateTasks.length > 0 ? (
              selectedDateTasks.map((task) => {
                const isOverdue = isTaskOverdue(task);
                return (
                  <div
                    key={task._id || task.id}
                    onClick={() => onEditTask(task)}
                    className="p-3.5 rounded-2xl border border-[#f1eae1] dark:border-[#2e263d] bg-[#fbf8f3]/60 dark:bg-[#252033]/50 hover:bg-[#f5efe6] dark:hover:bg-[#2b2538] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <PriorityBadge priority={task.priority} />
                      <StatusBadge status={task.status} />
                    </div>
                    <h4 className="font-heading text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:underline">
                      {task.title}
                    </h4>
                    {isOverdue && (
                      <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1.5 font-hand">
                        <Heart className="w-3 h-3 fill-rose-500/20" />
                        Deadline passed
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs font-hand">
                No tasks scheduled for this day 🍃
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
