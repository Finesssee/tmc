'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, Category } from '@/types/task';
import { getStoredTasks, getStoredCategories } from '@/lib/storage';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { TASKS_UPDATED, CATEGORIES_UPDATED } from '@/lib/events';

export function CalendarView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

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

  const getCategory = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId);
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(
      (task) => format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
        </h2>
        {selectedDate &&
          getTasksForDate(selectedDate).map((task) => (
            <Card key={task.id} className="p-4">
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
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
} 