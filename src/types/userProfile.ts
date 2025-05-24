export interface UserProfile {
  id: number;
  name: string;
  email: string | null;
  auth_provider: string;
  member_since: Date;
  image_string: string | null;
  posts: [];
}
