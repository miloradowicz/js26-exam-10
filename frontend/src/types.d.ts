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

export type ArticleMutation = Omit<Article, 'id' | 'image_url', 'publicized_at'> & {
  image: File | null;
};
export type ArticleGist = Omit<Article, 'content'>;
export type CommentBody = Omit<Comment, 'id'>;

export interface ErrorResponse {
  error: string;
}
