export type Priority = 'low' | 'medium' | 'high';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  categoryId: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskWithCategory = Task & {
  category: Category;
}; 