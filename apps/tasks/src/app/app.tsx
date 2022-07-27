import { useState } from 'react';
import useSWR from 'swr';
import { FilterContext } from './filter-context';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { EmptyState } from './states/empty-state';
import { ErrorState } from './states/error-state';
import { LoadingState } from './states/loading-state';
import { TaskForm } from './task-form';
import { TasksList } from './task-list';
import {  TaskFilter } from './task-filter.interface';
import { ITask } from '@nerdearla-workshop/api-interfaces';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function App() {
  const [filter, setFilter] = useState<TaskFilter>(TaskFilter.all);
  const [task, setTask] = useState<ITask | undefined>(undefined);
  const { data, error } = useSWR(() => `/api/tasks?${filter}`, fetcher);

  const isLoading = !error && !data;

  return (
    <div className="min-h-full">
      <FilterContext.Provider value={filter}>
        <Header setFilter={setFilter} />
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Nerdearla Tasks</h1>
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-auto rounded-lg bg-white shadow">
                    <div className="">
                      {isLoading && <LoadingState />}
                      {error && <ErrorState error={error} />}
                      {!error && data?.length === 0 && <EmptyState />}
                      {!error && data?.length > 0 && <TasksList tasks={data} onSelect={setTask} selected={task?.id} />}
                    </div>
                  </div>
                </section>
              </div>
              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <TaskForm task={task} setTask={setTask} />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </FilterContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
