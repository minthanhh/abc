/* eslint-disable jsx-a11y/anchor-is-valid */
import { SearchIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { FilterContext } from '../filter-context';
import { TaskFilter } from '../task-filter.interface';
import { classNames } from '../utils/class-names';

const navigation = [
  { name: 'All', value: TaskFilter.all },
  { name: 'Completed', value: TaskFilter.completed },
  { name: 'Incompleted', value: TaskFilter.incompleted },
];

interface HeaderProps {
  setFilter: (filter: TaskFilter) => void;
}

export const Header = React.memo<HeaderProps>(({ setFilter }) => {
  const filter = useContext(FilterContext);

  return (
    <header className="bg-slate-900 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative flex items-center justify-center py-5 lg:justify-between">
          {/* Logo */}
          <div className="absolute left-0 flex-shrink-0 lg:static">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img className="hidden h-8 w-auto lg:block" src="assets/logo-text.svg" alt="Workflow" />
              <img className="h-8 w-auto lg:hidden" src="assets/logo.svg" alt="Workflow" />
            </a>
          </div>

          {/* Search */}
          <div className="min-w-0 flex-1 px-12 lg:hidden">
            <div className="mx-auto w-full max-w-xs">
              <div className="relative text-white focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="desktop-search"
                  className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
          <div className="grid grid-cols-3 items-center gap-8">
            <div className="col-span-2">
              <nav className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className={classNames(
                      'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10',
                      filter === item.value ? 'bg-indigo-50 !bg-opacity-10 text-white' : 'text-indigo-100'
                    )}
                    aria-current={filter === item.value ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter(item.value);
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <div className="mx-auto w-full max-w-md">
                <label htmlFor="mobile-search" className="sr-only">
                  Search - {filter}
                </label>
                <div className="relative text-white focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="mobile-search"
                    className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
