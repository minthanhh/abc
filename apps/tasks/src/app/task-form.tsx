import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITask } from '@nerdearla-workshop/api-interfaces';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import * as yup from 'yup';
import { FilterContext } from './filter-context';
import { classNames } from './utils/class-names';

const schema = yup.object({
  title: yup.string().min(5).required(),
  description: yup.string().max(100),
});

type FormData = Pick<ITask, 'id' | 'title' | 'description'>;

interface TaskFormProps {
  task?: ITask;
  setTask: (t: ITask | undefined) => void;
}

export const TaskForm = ({ task, setTask }: TaskFormProps) => {
  const { mutate } = useSWRConfig();
  const filter = useContext(FilterContext);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    reset();
    setValue('title', task?.title || '');
    setValue('description', task?.description || '');
  }, [task]);

  const onReset = () => {
    reset();
    setTask(undefined);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/tasks${task?.id ? `/${task?.id}` : ''}`, {
      method: task?.id ? 'PATCH' : 'POST',
      body: JSON.stringify({
        title: data.title,
        description: data.description === '' ? undefined : data.description,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response?.ok) {
      mutate(`/api/tasks?${filter}`);
      onReset();
    }
  };

  return (
    <form className="space-y-5 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">{task?.id ? 'Update ' : 'Create '}Task</h3>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                className={classNames(
                  'block w-full rounded-md shadow-sm sm:text-sm',
                  errors.title
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                    : 'border-gray-300 focus:border-slate-500 focus:outline-none focus:ring-slate-500'
                )}
                {...register('title')}
                type="text"
              />
              {errors.title && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {errors.title && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <textarea
                className={classNames(
                  'block w-full rounded-md shadow-sm sm:text-sm',
                  errors.description
                    ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
                    : 'border-gray-300 focus:border-slate-500 focus:outline-none focus:ring-slate-500'
                )}
                {...register('description')}
                rows={4}
              />
              {errors.description && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onReset}
            className="focus:ring-nerdearla-500 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-nerdearla-600 enabled:hover:bg-nerdearla-700 focus:ring-nerdearla-500 ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
