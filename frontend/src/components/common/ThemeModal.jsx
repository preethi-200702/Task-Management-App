import { X, Sun, Moon, Check, Sparkles, Flower } from './Icons';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeModal() {
  const {
    mode,
    setMode,
    accent,
    setAccent,
    accentConfig,
    availableAccents,
    isThemeModalOpen,
    setIsThemeModalOpen,
  } = useTheme();

  if (!isThemeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#fdfbf7] dark:bg-[#1f1b2b] rounded-3xl shadow-2xl border border-[#ede5db] dark:border-[#332b42] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#f1eae1] dark:border-[#2b2538] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-2xl ${accentConfig.bgLightClass} ${accentConfig.textClass}`}>
              <Flower className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-800 dark:text-slate-100 text-base">
                Theme & Palette Mood
              </h3>
              <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
                Personalize your cozy little workspace
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsThemeModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-[#f4efe8] dark:hover:bg-[#2b2538] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Theme Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-heading">
              Atmosphere
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('light')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                  mode === 'light'
                    ? `${accentConfig.borderClass} ${accentConfig.bgLightClass} ${accentConfig.textClass} ring-2 ${accentConfig.ringClass}`
                    : 'border-[#ede5db] dark:border-[#332b42] text-slate-700 dark:text-slate-300 hover:bg-[#faf7f2] dark:hover:bg-[#252033]'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="font-heading">Warm Light</span>
                {mode === 'light' && <Check className="w-4 h-4 ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => setMode('dark')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-sm font-semibold transition-all ${
                  mode === 'dark'
                    ? `${accentConfig.borderClass} ${accentConfig.bgLightClass} ${accentConfig.textClass} ring-2 ${accentConfig.ringClass}`
                    : 'border-[#ede5db] dark:border-[#332b42] text-slate-700 dark:text-slate-300 hover:bg-[#faf7f2] dark:hover:bg-[#252033]'
                }`}
              >
                <Moon className="w-4 h-4 text-purple-400" />
                <span className="font-heading">Cozy Dark</span>
                {mode === 'dark' && <Check className="w-4 h-4 ml-auto" />}
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-heading">
              Whimsical Accent ({accentConfig.name})
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {Object.values(availableAccents).map((col) => {
                const isSelected = accent === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setAccent(col.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-slate-800 dark:border-white ring-2 ring-purple-300 dark:ring-purple-700 bg-white dark:bg-[#252033] scale-102'
                        : 'border-transparent hover:bg-[#f4efe8] dark:hover:bg-[#252033]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-white shadow-xs ${col.previewClass}`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </span>
                    <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-full font-heading">
                      {col.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-2xl bg-[#faf6f0] dark:bg-[#252033] border border-[#eee6dc] dark:border-[#382f47]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2 font-heading">
              Quick Preview
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${accentConfig.badgeClass} font-heading`}>
                {accentConfig.name}
              </span>
              <button
                type="button"
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-2xl ${accentConfig.btnClass}`}
              >
                Sample Button
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#fbf8f3] dark:bg-[#1a1724] border-t border-[#f1eae1] dark:border-[#2b2538] flex justify-end shrink-0">
          <button
            onClick={() => setIsThemeModalOpen(false)}
            className={`px-5 py-2 text-xs font-semibold rounded-2xl shadow-xs ${accentConfig.btnClass}`}
          >
            All Done 🌸
          </button>
        </div>
      </div>
    </div>
  );
}
