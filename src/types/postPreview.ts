export interface PostPreview {
  id: string;
  question: string;
  image_url: string;
  created_at: string;
  creator: {
    id: string;
    name: string;
    image_string: string;
  };
  category: {
    id: string;
    name: string;
  };
  upvotes: number;
  downvotes: number;
  score: number;
}
