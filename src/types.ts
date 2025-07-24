export interface Solution {
  description: string;
  code: string;
}

export interface Problem {
  title: string;
  solutions: Solution[];
}