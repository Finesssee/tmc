'use client';

import { useState } from 'react';
import { Category } from '@/types/task';
import { addCategory } from '@/lib/storage';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AnimatedButton } from '@/components/ui/animated-button';
import { motion } from 'framer-motion';

export function CategoryForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };

    addCategory(newCategory);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setColor('#3b82f6');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AnimatedButton variant="outline">Add Category</AnimatedButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div>
            <Input
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-10 p-1"
            />
            <span className="text-sm text-gray-500">Pick a color</span>
          </div>
          <div className="flex justify-end space-x-2">
            <AnimatedButton variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </AnimatedButton>
            <AnimatedButton type="submit">Create Category</AnimatedButton>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
} 