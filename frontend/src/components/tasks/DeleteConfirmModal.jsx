import { AlertTriangle, X } from '../common/Icons';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white dark:bg-[#1e1b29] rounded-3xl shadow-2xl border-2 border-rose-200/70 dark:border-rose-900/40 overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-rose-100/80 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-purple-900/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-amber-50">
            Remove this bloom? 🌱
          </h3>
          <p className="text-sm text-slate-600 dark:text-purple-200/80 mt-2 leading-relaxed">
            Are you sure you want to remove <span className="font-semibold text-slate-900 dark:text-amber-100">&ldquo;{taskTitle}&rdquo;</span> from your workspace garden? This action cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-rose-100/60 dark:border-rose-900/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 dark:text-purple-200 hover:bg-slate-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              Keep Task
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-all hover:scale-102 flex items-center gap-1.5"
            >
              <span>🗑️</span>
              <span>Yes, Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
