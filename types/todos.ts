export interface Todo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  priority: "urgent" | "normal" | "low";
}

export type TodoInput = Pick<Todo, "title" | "content" | "priority">;

export interface FindTodosOptions {
  sort?: "createdAt" | "updatedAt" | "priority";
  order?: "asc" | "desc";
  priorityFilter?: Todo["priority"];
  keyword?: string;
  countOnly?: boolean;
}
