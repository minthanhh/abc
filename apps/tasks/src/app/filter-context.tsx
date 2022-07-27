import { createContext } from 'react';
import { TaskFilter } from './task-filter.interface';

export const FilterContext = createContext<TaskFilter>(TaskFilter.all);
