import { useContext } from 'react';
import { useSWRConfig } from 'swr';
import { FilterContext } from './filter-context';
import { TaskItem } from './task-item';
import { ITask } from '@nerdearla-workshop/api-interfaces';

interface TaskListProps {
  tasks: ITask[];
  onSelect: (task: ITask) => void;
  selected?: string;
}

export const TasksList = ({ tasks, onSelect, selected }: TaskListProps) => {
  const { mutate } = useSWRConfig();
  const filter = useContext(FilterContext);

  const onToggle = async (id: ITask['id'], completed: boolean) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      mutate(`/api/tasks?${filter}`);
    }
  };

  const onDelete = async (id: ITask['id']) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      mutate(`/api/tasks?${filter}`);
    }
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks?.map((t: ITask) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
            active={selected === t.id}
          />
        ))}
      </ul>
    </div>
  );
};
