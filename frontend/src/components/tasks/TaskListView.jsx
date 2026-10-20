import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Plus, X, Sprout, Flower, Sparkles, Heart } from '../common/Icons';
import TaskCard from './TaskCard';
import { useTheme } from '../../context/ThemeContext';

export default function TaskListView({
  tasks,
  isLoading,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
  searchQuery,
  setSearchQuery,
}) {
  const { accentConfig } = useTheme();

  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description && task.description.toLowerCase().includes(q);
          const matchCat = task.category && task.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        // Status filter
        if (statusFilter !== 'All' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') {
          return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
        }
        if (sortBy === 'dueDateDesc') {
          return new Date(b.dueDate || 0) - new Date(a.dueDate || 0);
        }
        if (sortBy === 'priority') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  const hasActiveFilters = searchQuery || statusFilter !== 'All' || priorityFilter !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-5 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search your tasks by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl border border-[#e8dfd4] dark:border-[#352c44] bg-[#fbf8f3] dark:bg-[#252033] text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass} transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-102 active:scale-98 shrink-0 ${accentConfig.btnClass}`}
          >
            <Plus className="w-4 h-4" />
            <span>Plant New Task</span>
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#f1eae1] dark:border-[#2b2538]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-heading">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#e8dfd4] dark:border-[#352c44] bg-white/80 dark:bg-[#252033] text-slate-800 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="All">All Stages</option>
                <option value="To Do">Seeds (To Do)</option>
                <option value="In Progress">Sprouting (In Progress)</option>
                <option value="Completed">Bloomed (Completed)</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-heading">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#e8dfd4] dark:border-[#352c44] bg-white/80 dark:bg-[#252033] text-slate-800 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Urgency</option>
                <option value="Medium">Medium</option>
                <option value="Low">Gentle (Low)</option>
              </select>
            </div>

            {/* Reset Filters button if any are applied */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium underline flex items-center gap-1 ml-1 cursor-pointer font-hand"
              >
                Clear filters ✕
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-heading">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-[#e8dfd4] dark:border-[#352c44] bg-white/80 dark:bg-[#252033] text-slate-800 dark:text-slate-200 focus:outline-hidden"
            >
              <option value="dueDateAsc">Due Date (Earliest first)</option>
              <option value="dueDateDesc">Due Date (Latest first)</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="title">Title (A to Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List Header Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 font-hand">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredTasks.length}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200">{tasks.length}</strong> items in your garden
        </span>
        {hasActiveFilters && (
          <span className="italic text-slate-400">Filtering applied</span>
        )}
      </div>

      {/* Task Cards Grid or Loading */}
      {isLoading ? (
        <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-12 text-center border border-[#ede5db] dark:border-[#352c44] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto animate-pulse">
            <Sprout className="w-6 h-6 animate-bounce" />
          </div>
          <p className="font-heading font-semibold text-slate-800 dark:text-amber-50 text-sm">
            Nurturing your workspace...
          </p>
          <p className="font-hand text-xs text-slate-400">
            Fetching your fresh task blooms from the database 🌱
          </p>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
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
        /* Cute Original Whimsical Empty State */
        <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-10 sm:p-14 text-center border border-dashed border-[#e3d8ca] dark:border-[#382f47] space-y-4 max-w-lg mx-auto">
          {/* Whimsical Hand-Drawn SVG Garden Pot Illustration */}
          <div className="w-20 h-20 rounded-3xl bg-[#fdf8f0] dark:bg-[#282136] text-amber-500 flex items-center justify-center mx-auto shadow-inner border border-[#ede5db] dark:border-[#3b324d] relative transform -rotate-1">
            <Sprout className="w-10 h-10 text-emerald-500 animate-bounce" />
            <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1.5 -right-1.5" />
          </div>

          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100">
              {hasActiveFilters ? 'No tasks found matching your filter' : 'Your little corner is ready!'}
            </h3>
            <p className="font-hand text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
              {hasActiveFilters
                ? 'Try tweaking your search keywords or resetting your stage filters.'
                : "Let's plant your first task and make today count. Watch it grow and bloom!"}
            </p>
          </div>

          {hasActiveFilters ? (
            <button
              onClick={resetFilters}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold ${accentConfig.btnClass}`}
            >
              Clear All Filters
            </button>
          ) : (
            <button
              onClick={onAddTask}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold shadow-xs transition-all hover:scale-103 active:scale-97 ${accentConfig.btnClass}`}
            >
              <Plus className="w-4 h-4" />
              <span>Plant Your First Task 🌸</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
