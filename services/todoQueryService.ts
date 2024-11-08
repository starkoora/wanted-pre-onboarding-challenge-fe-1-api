import type { Todo } from "../types/todos.js";

export class TodoQueryService {
  private todos: Todo[];

  constructor(todos: Todo[]) {
    this.todos = todos;
  }

  // 필터링: 우선순위 필터 적용
  filterByPriority(priority?: Todo["priority"]) {
    if (priority) {
      this.todos = this.todos.filter((todo) => todo.priority === priority);
    }
    return this;
  }

  // 검색: 키워드가 title 또는 content에 포함된 항목 필터
  searchByKeyword(keyword?: string) {
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      this.todos = this.todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(keywordLower) ||
          todo.content.toLowerCase().includes(keywordLower)
      );
    }
    return this;
  }

  // 정렬: 지정된 필드와 정렬 순서에 따라 정렬
  sortByField(
    sort?: "createdAt" | "updatedAt" | "priority",
    order: "asc" | "desc" = "desc"
  ) {
    if (sort) {
      const orderFactor = order === "asc" ? 1 : -1;

      this.todos = this.todos.sort((a, b) => {
        if (sort === "priority") {
          const priorityOrder = { urgent: 1, normal: 2, low: 3 };
          return (
            (priorityOrder[a.priority] - priorityOrder[b.priority]) *
            orderFactor
          );
        } else {
          const dateA = new Date(a[sort]).getTime();
          const dateB = new Date(b[sort]).getTime();
          return (dateA - dateB) * orderFactor;
        }
      });
    }
    return this;
  }

  // 최종 결과 반환 (countOnly가 true이면 길이만 반환)
  getResult() {
    return this.todos;
  }
}
