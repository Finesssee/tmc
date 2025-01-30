'use client';

import { useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { CategoryForm } from '@/components/CategoryForm';
import { CalendarView } from '@/components/CalendarView';
import { TaskTableView } from '@/components/TaskTableView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { Sidebar } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <FlickeringGrid
        className="fixed inset-0 z-0"
        squareSize={2}
        gridGap={12}
        color="#9CA3AF"
        maxOpacity={0.15}
        flickerChance={0.05}
      />
      <div className="relative z-10 flex">
        <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        <main className="flex-1">
          <div className="container py-8 px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Dashboard</h1>
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
        </main>
      </div>
    </div>
  );
}
