export interface CreateUserInput {
  name: string;
  email?: string;
  auth_provider: "local" | "facebook" | "google";
  provider_id?: string;
  password?: string;
}
