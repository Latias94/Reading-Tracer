export interface Book {
  _id?: string;
  title: string;
  description: string;
  currentPage: number;
  totalPage: number;
  quote?: {
    author?: string;
    content: string;
  };
}
