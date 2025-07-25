export interface Solution {
  description: string;
  code: string;
}

export interface Problem {
  title: string;
  description?: string;
  solutions: Solution[];
}