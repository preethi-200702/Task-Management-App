// Realistic sample tasks for a Computer Science student's Task Management Application

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Implement Express Health-Check & API Architecture',
    description: 'Set up server routing, error middleware, and verify cross-origin requests from the React client.',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-10-10', // completed in Phase 1
    createdAt: '2026-10-09T10:00:00Z',
    category: 'Backend',
  },
  {
    id: 'task-2',
    title: 'Design Database Schema for MongoDB Atlas',
    description: 'Create Mongoose models for Users and Tasks with validation rules, timestamps, and foreign key relations.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-10-15',
    createdAt: '2026-10-11T09:30:00Z',
    category: 'Database',
  },
  {
    id: 'task-3',
    title: 'Build Responsive Dashboard UI & Theme System',
    description: 'Implement modern sidebar, statistic counters, board view, and customizable color accent palettes.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-10-13',
    createdAt: '2026-10-12T08:00:00Z',
    category: 'Frontend',
  },
  {
    id: 'task-4',
    title: 'Prepare System Design Synopsis for Project Review',
    description: 'Document architectural diagrams, API specification tables, and ER diagrams for faculty evaluation.',
    status: 'To Do',
    priority: 'High',
    dueDate: '2026-10-11', // intentionally overdue to showcase overdue indicator
    createdAt: '2026-10-08T14:15:00Z',
    category: 'College',
  },
  {
    id: 'task-5',
    title: 'Configure JWT Stateless Authentication & Cookies',
    description: 'Implement token signing, bcrypt password hashing, and authorization verification middleware.',
    status: 'To Do',
    priority: 'High',
    dueDate: '2026-10-18',
    createdAt: '2026-10-12T11:45:00Z',
    category: 'Security',
  },
  {
    id: 'task-6',
    title: 'Optimize Tailwind CSS & Asset Delivery',
    description: 'Audit production bundle size, eliminate unused CSS rules, and ensure high accessibility contrast.',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-10-12',
    createdAt: '2026-10-10T16:20:00Z',
    category: 'Frontend',
  },
  {
    id: 'task-7',
    title: 'Write Unit Tests for REST Endpoints',
    description: 'Create test suites covering task creation, status updates, edge-case validation, and 404 handlers.',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2026-10-22',
    createdAt: '2026-10-12T15:00:00Z',
    category: 'Testing',
  },
];

/**
 * Checks whether a task is overdue based on current date.
 * A task is overdue if its due date is before today AND status is not "Completed".
 */
export const isTaskOverdue = (task) => {
  if (task.status === 'Completed' || !task.dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDue = new Date(task.dueDate);
  taskDue.setHours(0, 0, 0, 0);
  return taskDue < today;
};

/**
 * Calculates real-time statistics derived dynamically from the task list.
 */
export const calculateTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const toDo = tasks.filter((t) => t.status === 'To Do').length;
  const overdue = tasks.filter(isTaskOverdue).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const byPriority = {
    High: tasks.filter((t) => t.priority === 'High').length,
    Medium: tasks.filter((t) => t.priority === 'Medium').length,
    Low: tasks.filter((t) => t.priority === 'Low').length,
  };

  return {
    total,
    completed,
    inProgress,
    toDo,
    overdue,
    completionRate,
    byPriority,
  };
};

/**
 * Friendly date formatter for display.
 */
export const formatDueDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
