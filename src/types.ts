export type Task = {
  id: string;
  title: string;
  context?: string;
  dueDate?: string; // ISO: YYYY-MM-DD
  createdAt: number;
};
