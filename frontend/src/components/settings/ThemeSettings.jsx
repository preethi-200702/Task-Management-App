import { Sun, Moon, Check, Sparkles, RefreshCw, Download, Monitor, ShieldCheck, Flower, Heart } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';
import { PriorityBadge, StatusBadge } from '../common/Badge';

export default function ThemeSettings({ onResetTasks, tasks }) {
  const {
    mode,
    setMode,
    accent,
    setAccent,
    accentConfig,
    availableAccents,
  } = useTheme();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bloomtask_tasks_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className={`w-5 h-5 ${accentConfig.textClass}`} />
          <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
            Cozy Appearance & Settings
          </h2>
        </div>
        <p className="font-hand text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your soft pastel palette, theme mood, and workspace preferences.
        </p>
      </div>

      {/* Theme Mode Card */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-slate-400" />
            Atmosphere Mode
          </h3>
          <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose between Warm Daylight (cream & vanilla) or Cozy Night Sky (soft obsidian).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Light Mode Option */}
          <button
            type="button"
            onClick={() => setMode('light')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              mode === 'light'
                ? `${accentConfig.borderClass} ${accentConfig.bgLightClass} ring-2 ${accentConfig.ringClass}`
                : 'border-[#ede5db] dark:border-[#332b42] hover:bg-[#faf7f2] dark:hover:bg-[#252033]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Sun className="w-5 h-5" />
              </div>
              {mode === 'light' && (
                <span className={`p-1 rounded-full text-white ${accentConfig.btnClass}`}>
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <h4 className="font-heading font-bold text-slate-800 dark:text-slate-100 text-sm">Warm Daylight</h4>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cream and vanilla parchment with soft warm tones.
            </p>
          </button>

          {/* Dark Mode Option */}
          <button
            type="button"
            onClick={() => setMode('dark')}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              mode === 'dark'
                ? `${accentConfig.borderClass} ${accentConfig.bgLightClass} ring-2 ${accentConfig.ringClass}`
                : 'border-[#ede5db] dark:border-[#332b42] hover:bg-[#faf7f2] dark:hover:bg-[#252033]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-purple-950 text-purple-300">
                <Moon className="w-5 h-5" />
              </div>
              {mode === 'dark' && (
                <span className={`p-1 rounded-full text-white ${accentConfig.btnClass}`}>
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            <h4 className="font-heading font-bold text-slate-800 dark:text-slate-100 text-sm">Cozy Night Sky</h4>
            <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-1">
              Deep plum slate & soft pastel highlights for nighttime journaling.
            </p>
          </button>
        </div>
      </div>

      {/* Pastel Accent Palette Swatches */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Flower className="w-4 h-4 text-pink-400" />
            Whimsical Accent Colors
          </h3>
          <p className="font-hand text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your favorite signature pastel hue: Soft Lavender, Blush Blossom, Sage Garden, Peach Sorbet, or Buttercup Gold.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {Object.values(availableAccents).map((col) => {
            const isSelected = accent === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setAccent(col.id)}
                className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2.5 transition-all text-center ${
                  isSelected
                    ? `${col.borderClass} ${col.bgLightClass} ring-2 ${col.ringClass} shadow-xs scale-102`
                    : 'border-[#ede5db] dark:border-[#332b42] hover:bg-[#faf7f2] dark:hover:bg-[#252033]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xs ${col.previewClass}`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
                </div>
                <div>
                  <span className="block font-heading font-bold text-xs text-slate-800 dark:text-slate-200">
                    {col.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {col.colorHex}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Component Preview */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100">
          Live Palette Preview
        </h3>
        <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
          Active theme: <span className="font-semibold capitalize font-sans">{mode}</span> &bull; Accent: <span className="font-semibold font-sans">{accentConfig.name}</span>
        </p>

        <div className="p-5 rounded-2xl border border-dashed border-[#e0d6c9] dark:border-[#3c344e] space-y-4 bg-[#fcf9f5]/70 dark:bg-[#252033]/40">
          {/* Interactive Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button className={`px-4 py-2 text-xs font-semibold rounded-2xl ${accentConfig.btnClass}`}>
              Primary Button
            </button>
            <button className={`px-4 py-2 text-xs font-semibold rounded-2xl border ${accentConfig.btnOutlineClass}`}>
              Outline Button
            </button>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${accentConfig.badgeClass} font-heading`}>
              Accent Badge
            </span>
            <PriorityBadge priority="High" />
            <StatusBadge status="In Progress" />
          </div>

          {/* Sample Input */}
          <div className="max-w-xs">
            <input
              type="text"
              readOnly
              value="Delicate focus ring demo"
              className={`w-full px-3.5 py-2 text-xs rounded-2xl border border-[#ede5db] dark:border-[#332b42] bg-white dark:bg-[#1f1b2b] text-slate-800 dark:text-slate-200 focus:outline-hidden ${accentConfig.ringClass}`}
            />
          </div>
        </div>
      </div>

      {/* Data Controls Card */}
      <div className="bg-white/90 dark:bg-[#1f1b2b] rounded-3xl p-6 border border-[#ede5db] dark:border-[#332b42] shadow-xs space-y-3">
        <h3 className="font-heading text-sm font-bold text-slate-800 dark:text-slate-100">
          Workspace Utilities & Export
        </h3>
        <p className="font-hand text-xs text-slate-500 dark:text-slate-400">
          Export your personal tasks as a JSON backup or reload your workspace from the database.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={handleExportJSON}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold border border-[#ede5db] dark:border-[#332b42] text-slate-700 dark:text-slate-300 hover:bg-[#faf7f2] dark:hover:bg-[#252033] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Tasks JSON
          </button>
          <button
            onClick={onResetTasks}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold border border-[#ede5db] dark:border-[#332b42] ${accentConfig.textClass} hover:bg-[#faf7f2] dark:hover:bg-[#252033] transition-colors`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync from Database
          </button>
        </div>
      </div>
    </div>
  );
}
