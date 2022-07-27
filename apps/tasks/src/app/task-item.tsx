/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { classNames } from './utils/class-names';
import { ITask } from '@nerdearla-workshop/api-interfaces';

interface TaskItemProps {
  task: ITask;
  active?: boolean;
  onToggle: (id: ITask['id'], value: boolean) => void;
  onDelete: (id: ITask['id']) => void;
  onSelect: (task: ITask) => void;
}

export const TaskItem = ({ task, onToggle, active = false, onSelect, onDelete }: TaskItemProps) => {
  const onToggleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    onToggle(task.id, !task.completed);
  };

  const onSelectHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    onSelect(task);
  };

  const onDeleteHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <li key={task.id} className={active ? '!border-l-nerdearla-500 border-l-4' : ''}>
      <a href="#" className="group block hover:bg-gray-50" onClick={onSelectHandler}>
        <div
          className={classNames(
            'flex items-center  py-4',
            active ? 'pl-3 pr-4 sm:pl-5 sm:pr-6' : 'pl-4 pr-4 sm:pl-6 sm:pr-6'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex-shrink-0">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                checked={task.completed}
                onChange={onToggleHandler}
                onClick={(e) => e.stopPropagation()}
                className="text-nerdearla-600 focus:ring-nerdearla-500 h-6 w-6 cursor-pointer rounded-full border-gray-300"
              />
            </div>
            <div className="relative min-w-0 flex-1 px-4">
              <div>
                <p
                  className={classNames(
                    'truncate text-sm font-medium text-indigo-600',
                    task.completed ? 'line-through' : ''
                  )}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <span className={classNames('truncate', task.completed ? 'line-through' : '')}>{task.description}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={onDeleteHandler}
              className="hidden items-center rounded-full bg-red-100 py-0.5 px-0.5 text-sm font-medium text-red-700 hover:bg-red-200 group-hover:inline-flex lg:pl-2.5 lg:pr-1"
            >
              <span className="hidden lg:block">Delete</span>
              <span className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:bg-indigo-500">
                <span className="sr-only">Remove large option</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </a>
    </li>
  );
};
