import { Category, Task } from '@/types/task';
import { eventEmitter, TASKS_UPDATED, CATEGORIES_UPDATED } from './events';

const TASKS_KEY = 'tasks';
const CATEGORIES_KEY = 'categories';

export const getStoredTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const getStoredCategories = (): Category[] => {
  if (typeof window === 'undefined') return [];
  const categories = localStorage.getItem(CATEGORIES_KEY);
  return categories ? JSON.parse(categories) : [];
};

export const setStoredTasks = (tasks: Task[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  eventEmitter.emit(TASKS_UPDATED);
};

export const setStoredCategories = (categories: Category[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  eventEmitter.emit(CATEGORIES_UPDATED);
};

export const addTask = (task: Task) => {
  const tasks = getStoredTasks();
  tasks.push(task);
  setStoredTasks(tasks);
};

export const updateTask = (updatedTask: Task) => {
  const tasks = getStoredTasks();
  const index = tasks.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    setStoredTasks(tasks);
  }
};

export const deleteTask = (taskId: string) => {
  const tasks = getStoredTasks();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  setStoredTasks(filteredTasks);
};

export const addCategory = (category: Category) => {
  const categories = getStoredCategories();
  categories.push(category);
  setStoredCategories(categories);
};

export const updateCategory = (updatedCategory: Category) => {
  const categories = getStoredCategories();
  const index = categories.findIndex((category) => category.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = updatedCategory;
    setStoredCategories(categories);
  }
};

export const deleteCategory = (categoryId: string) => {
  const categories = getStoredCategories();
  const filteredCategories = categories.filter((category) => category.id !== categoryId);
  setStoredCategories(filteredCategories);
}; 