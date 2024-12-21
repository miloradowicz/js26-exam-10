export interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  publicized_at: string;
}

export interface Comment {
  id: number;
  article_id: number;
  author: string | null;
  content: string;
}

export type ArticleBody = Omit<Article, 'id' | 'publicized_at'>;
export type CommentBody = Omit<Comment, 'id'>;

export interface ErrorResponse {
  error: string;
}
