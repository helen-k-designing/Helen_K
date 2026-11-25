export interface BlogComment {
  id: string;
  postId: number | string;
  author: string;
  text: string;
  createdAt: string;
}