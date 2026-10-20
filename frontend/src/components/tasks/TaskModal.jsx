import { useState, useEffect } from 'react';
import { X, Calendar, Flag, CheckCircle2 as CheckCircle, AlertCircle, Sprout, Sparkles } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit }) {
  const { accentConfig } = useTheme();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
    category: 'General',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Medium',
        status: taskToEdit.status || 'To Do',
        dueDate: taskToEdit.dueDate || '',
        category: taskToEdit.category || 'General',
      });
    } else {
      // Default due date to 3 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 3);
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To Do',
        dueDate: defaultDate.toISOString().slice(0, 10),
        category: 'General',
      });
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Please name your task seedling';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title should be at least 3 characters long';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Pick a blooming due date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(taskToEdit ? { id: taskToEdit.id || taskToEdit._id } : {}),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      category: formData.category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1e1b29] rounded-3xl shadow-2xl border-2 border-amber-100/70 dark:border-purple-900/40 overflow-hidden max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with cozy banner */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-amber-100/60 dark:border-purple-900/30 bg-amber-50/40 dark:bg-purple-950/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${accentConfig.softBg} ${accentConfig.textColor} shadow-xs`}>
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-800 dark:text-amber-50 text-xl tracking-tight">
                {taskToEdit ? 'Tend to Your Bloom' : 'Plant a New Task'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-purple-300 font-hand text-base leading-none mt-0.5">
                {taskToEdit ? 'Nurture and refine this task seedling ✨' : 'Plant something wonderful in your workspace today 🌱'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-amber-200 hover:bg-white/80 dark:hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5 flex items-center gap-1.5">
              <span>🌱 Task Title</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Water the indoor plants & review chapter 4 notes..."
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border bg-amber-50/20 dark:bg-slate-900/60 text-slate-900 dark:text-amber-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden transition-all ${
                errors.title
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                  : `border-amber-200/70 dark:border-purple-800/50 focus:ring-2 ${accentConfig.ringClass}`
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5">
              📝 Notes & Details
            </label>
            <textarea
              rows={3}
              placeholder="Little thoughts, checklists, or steps to help this task bloom..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border border-amber-200/70 dark:border-purple-800/50 bg-amber-50/20 dark:bg-slate-900/60 text-slate-900 dark:text-amber-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass}`}
            />
          </div>

          {/* Row: Status & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5">
                🌸 Growth Stage
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border border-amber-200/70 dark:border-purple-800/50 bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-50 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass}`}
              >
                <option value="To Do">🌱 Seedling (To Do)</option>
                <option value="In Progress">🌿 Sprouting (In Progress)</option>
                <option value="Completed">🌸 Bloomed (Completed)</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5">
                ⭐ Priority Urgency
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border border-amber-200/70 dark:border-purple-800/50 bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-50 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass}`}
              >
                <option value="Low">🌱 Gentle (Low Priority)</option>
                <option value="Medium">🌿 Steady (Medium Priority)</option>
                <option value="High">🌸 Urgent Bloom (High Priority)</option>
              </select>
            </div>
          </div>

          {/* Row: Due Date & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5 flex items-center gap-1">
                <span>📅 Target Bloom Date</span> <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => {
                  setFormData({ ...formData, dueDate: e.target.value });
                  if (errors.dueDate) setErrors({ ...errors, dueDate: null });
                }}
                className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-50 focus:outline-hidden ${
                  errors.dueDate
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-400/20'
                    : `border-amber-200/70 dark:border-purple-800/50 focus:ring-2 ${accentConfig.ringClass}`
                }`}
              />
              {errors.dueDate && (
                <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.dueDate}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-amber-200/90 mb-1.5">
                🪴 Planter Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-2xl border border-amber-200/70 dark:border-purple-800/50 bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-50 focus:outline-hidden focus:ring-2 ${accentConfig.ringClass}`}
              >
                <option value="Frontend">💻 Frontend</option>
                <option value="Backend">⚙️ Backend</option>
                <option value="Database">🗄️ Database</option>
                <option value="Security">🔐 Security</option>
                <option value="Testing">🧪 Testing</option>
                <option value="College">🎓 College / Academics</option>
                <option value="General">✨ Cozy Everyday</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-100/60 dark:border-purple-900/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 dark:text-purple-200 hover:bg-amber-100/50 dark:hover:bg-purple-900/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm transition-all hover:scale-102 flex items-center gap-2 ${accentConfig.btnClass}`}
            >
              {taskToEdit ? (
                <>
                  <span>🌸</span>
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <span>🌱</span>
                  <span>Plant Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
