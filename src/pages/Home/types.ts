import { ReactNode } from 'react';

export interface LabItem {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
  courses: number;
  status: string;
}
