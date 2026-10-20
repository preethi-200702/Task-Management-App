import Task from '../models/Task.js';

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private (STRICT USER ISOLATION)
export const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    // Base query ALWAYS filtered by authenticated user ID
    const query = { user: req.user._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      status: 'success',
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve your tasks',
    });
  }
};

// @desc    Create a new task for the logged-in user
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Task title is required',
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Task due date is required',
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'To Do',
      priority: priority || 'Medium',
      dueDate,
      category: category || 'General',
      user: req.user._id, // Enforce current user as owner
    });

    return res.status(201).json({
      status: 'success',
      message: 'Task planted successfully 🌱',
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to create task',
    });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }

    // Ensure the task belongs to the authenticated user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to view this task',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: task,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve task',
    });
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }

    // Verify task ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this task',
      });
    }

    const { title, description, status, priority, dueDate, category } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (category !== undefined) task.category = category;

    const updatedTask = await task.save();

    return res.status(200).json({
      status: 'success',
      message: 'Task updated successfully 🌸',
      data: updatedTask,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update task',
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }

    // Verify task ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to delete this task',
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      status: 'success',
      message: 'Task removed from your garden 🌿',
      id: req.params.id,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete task',
    });
  }
};
