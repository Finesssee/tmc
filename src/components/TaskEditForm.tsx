'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, Category, Priority } from '@/types/task';
import { updateTask, getStoredCategories } from '@/lib/storage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';
import { CATEGORIES_UPDATED } from '@/lib/events';
import { AnimatedButton } from '@/components/ui/animated-button';

interface TaskEditFormProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskEditForm({ task, open, onOpenChange }: TaskEditFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState<Date>(new Date(task.dueDate));
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [categoryId, setCategoryId] = useState(task.categoryId);

  const refreshCategories = useCallback(() => {
    setCategories(getStoredCategories());
  }, []);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  useAutoRefresh(CATEGORIES_UPDATED, refreshCategories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate || !categoryId) return;

    const updatedTask: Task = {
      ...task,
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
      categoryId,
      updatedAt: new Date().toISOString(),
    };

    updateTask(updatedTask);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <AnimatedButton variant="outline">
                  {dueDate ? format(dueDate, 'PPP') : 'Pick a due date'}
                </AnimatedButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => date && setDueDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex justify-end space-x-2">
            <AnimatedButton variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </AnimatedButton>
            <AnimatedButton type="submit">Save Changes</AnimatedButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 