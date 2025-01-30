'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, Category } from '@/types/task';
import { getStoredTasks, getStoredCategories, updateTask, deleteTask } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { TASKS_UPDATED, CATEGORIES_UPDATED } from '@/lib/events';
import { AnimatedButton } from '@/components/ui/animated-button';
import { TaskEditForm } from '@/components/TaskEditForm';
import { motion } from 'framer-motion';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const refreshTasks = useCallback(() => {
    setTasks(getStoredTasks());
  }, []);

  const refreshCategories = useCallback(() => {
    setCategories(getStoredCategories());
  }, []);

  useEffect(() => {
    refreshTasks();
    refreshCategories();
  }, [refreshTasks, refreshCategories]);

  useAutoRefresh(TASKS_UPDATED, refreshTasks);
  useAutoRefresh(CATEGORIES_UPDATED, refreshCategories);

  const handleToggleComplete = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const getCategory = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task)}
                />
                <div>
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    {getCategory(task.categoryId) && (
                      <Badge
                        style={{
                          backgroundColor: getCategory(task.categoryId)?.color,
                          color: 'white',
                        }}
                      >
                        {getCategory(task.categoryId)?.name}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingTask(task)}
                >
                  Edit
                </AnimatedButton>
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </AnimatedButton>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
      {editingTask && (
        <TaskEditForm
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        />
      )}
    </div>
  );
} 