import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardView from './components/dashboard/DashboardView';
import TaskListView from './components/tasks/TaskListView';
import BoardView from './components/tasks/BoardView';
import CalendarView from './components/calendar/CalendarView';
import ThemeSettings from './components/settings/ThemeSettings';
import TaskModal from './components/tasks/TaskModal';
import DeleteConfirmModal from './components/tasks/DeleteConfirmModal';
import ThemeModal from './components/common/ThemeModal';
import WelcomePage from './components/auth/WelcomePage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { calculateTaskStats } from './data/sampleTasks';
import { Sprout, AlertCircle, RefreshCw } from './components/common/Icons';
import api from './services/api';

function MainApp() {
  const { accentConfig } = useTheme();
  const { user, loading, isAuthenticated } = useAuth();

  // Navigation State
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Unauthenticated Auth Screen State ('welcome' | 'login' | 'register')
  const [authView, setAuthView] = useState('welcome');

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Tasks State from Real Backend (Strict User Isolation)
  const [tasks, setTasks] = useState([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState(null);

  // Task Modals State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Backend Health Ping State
  const [backendHealth, setBackendHealth] = useState(null);
  const [isPingingBackend, setIsPingingBackend] = useState(false);
  const [backendError, setBackendError] = useState(null);

  // Fetch current user's tasks from the backend
  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsTasksLoading(true);
    setTasksError(null);
    try {
      const res = await api.getTasks();
      if (res && res.data) {
        setTasks(res.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setTasksError(err.message || 'Could not load your workspace tasks');
      setTasks([]);
    } finally {
      setIsTasksLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, fetchTasks]);

  // Derived Statistics based strictly on real tasks
  const stats = calculateTaskStats(tasks);

  // Health check handler
  const handlePingBackend = async () => {
    setIsPingingBackend(true);
    setBackendError(null);
    try {
      const data = await api.getHealth();
      setBackendHealth(data);
    } catch (err) {
      setBackendError(err.message || 'Could not connect to backend');
      setBackendHealth(null);
    } finally {
      setIsPingingBackend(false);
    }
  };

  // Task Handlers connecting to backend
  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenAddTaskWithStatus = (status) => {
    setTaskToEdit({ status });
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      const taskId = taskData.id || taskData._id;
      if (taskId) {
        // Update existing task
        const res = await api.updateTask(taskId, taskData);
        setTasks((prev) =>
          prev.map((t) => ((t._id === taskId || t.id === taskId) ? res.data : t))
        );
      } else {
        // Create new task in backend
        const res = await api.createTask(taskData);
        if (res && res.data) {
          setTasks((prev) => [res.data, ...prev]);
        }
      }
    } catch (err) {
      alert(err.message || 'Failed to save task to your workspace');
    }
  };

  const handleOpenDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    const targetId = taskToDelete._id || taskToDelete.id;
    // Optimistic removal
    setTasks((prev) => prev.filter((t) => (t._id !== targetId && t.id !== targetId)));
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);

    try {
      await api.deleteTask(targetId);
    } catch (err) {
      alert(err.message || 'Failed to delete task from server');
      fetchTasks(); // Revert
    }
  };

  const handleToggleStatus = async (taskId) => {
    const task = tasks.find((t) => (t._id === taskId || t.id === taskId));
    if (!task) return;
    const nextStatus = task.status === 'Completed' ? 'To Do' : 'Completed';

    // Optimistic local update
    setTasks((prev) =>
      prev.map((t) =>
        (t._id === taskId || t.id === taskId) ? { ...t, status: nextStatus } : t
      )
    );

    try {
      await api.updateTask(taskId, { status: nextStatus });
    } catch {
      fetchTasks(); // Revert on failure
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        (t._id === taskId || t.id === taskId) ? { ...t, status: newStatus } : t
      )
    );

    try {
      await api.updateTask(taskId, { status: newStatus });
    } catch {
      fetchTasks(); // Revert on failure
    }
  };

  // Reset tasks action in settings
  const handleResetTasks = () => {
    fetchTasks();
  };

  // 1. Loading screen while checking authentication session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#17151e] flex flex-col items-center justify-center p-4">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${accentConfig.softBg} ${accentConfig.textColor} shadow-md animate-pulse mb-4`}>
          <Sprout className="w-8 h-8 animate-bounce" />
        </div>
        <h2 className="font-heading font-bold text-lg text-slate-800 dark:text-amber-50">
          BloomTask
        </h2>
        <p className="font-hand text-sm text-slate-500 dark:text-purple-300 mt-1">
          Nurturing your cozy workspace...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated flows (Welcome landing page, Login, Register)
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <LoginPage
          onGoToRegister={() => setAuthView('register')}
          onGoToWelcome={() => setAuthView('welcome')}
        />
      );
    }
    if (authView === 'register') {
      return (
        <RegisterPage
          onGoToLogin={() => setAuthView('login')}
          onGoToWelcome={() => setAuthView('welcome')}
        />
      );
    }
    return (
      <WelcomePage
        onGoToLogin={() => setAuthView('login')}
        onGoToRegister={() => setAuthView('register')}
      />
    );
  }

  // 3. Authenticated Personal Workspace
  return (
    <div className="min-h-screen flex bg-[#fdfbf7] dark:bg-[#17151e] text-slate-800 dark:text-amber-50 transition-colors font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        taskCount={tasks.length}
        completionRate={stats.completionRate}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddTask={handleOpenAddTask}
          overdueCount={stats.overdue}
          tasks={tasks}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Notification banner if tasks failed to fetch */}
          {tasksError && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-purple-950/40 border border-amber-200 dark:border-purple-800/60 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-800 dark:text-purple-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <span>Notice: {tasksError}. Ensure backend server is running on port 5000.</span>
              </div>
              <button
                onClick={fetchTasks}
                className="px-3 py-1.5 rounded-xl font-bold bg-white dark:bg-[#201c2c] border border-amber-200 dark:border-purple-700 hover:bg-amber-100 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {activeView === 'dashboard' && (
            <DashboardView
              tasks={tasks}
              stats={stats}
              isLoading={isTasksLoading}
              onNavigateToTasks={() => setActiveView('tasks')}
              onAddTask={handleOpenAddTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleOpenDeleteConfirm}
              onToggleStatus={handleToggleStatus}
              backendHealth={backendHealth}
              onPingBackend={handlePingBackend}
              isPingingBackend={isPingingBackend}
              backendError={backendError}
            />
          )}

          {activeView === 'tasks' && (
            <TaskListView
              tasks={tasks}
              isLoading={isTasksLoading}
              onAddTask={handleOpenAddTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleOpenDeleteConfirm}
              onToggleStatus={handleToggleStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeView === 'board' && (
            <BoardView
              tasks={tasks}
              onAddTaskWithStatus={handleOpenAddTaskWithStatus}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleOpenDeleteConfirm}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeView === 'calendar' && (
            <CalendarView tasks={tasks} onEditTask={handleOpenEditTask} />
          )}

          {activeView === 'settings' && (
            <ThemeSettings onResetTasks={handleResetTasks} tasks={tasks} />
          )}
        </main>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title || ''}
      />

      <ThemeModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
