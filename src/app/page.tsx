'use client';

import { useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { CategoryForm } from '@/components/CategoryForm';
import { CalendarView } from '@/components/CalendarView';
import { TaskTableView } from '@/components/TaskTableView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <FlickeringGrid
        className="fixed inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      <div className="relative z-10">
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <div className="space-x-4">
              <CategoryForm />
              <TaskForm />
            </div>
          </div>

          <Tabs defaultValue="table" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <TaskTableView />
            </TabsContent>
            <TabsContent value="list">
              <TaskList />
            </TabsContent>
            <TabsContent value="calendar">
              <CalendarView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
