export type LoginResult = {
  apiToken?: string;
  userId: string;
  password: string;
  lastLogin?: string;
};
export type LoginRequestDto = {
  userId: string;
  password: string;
};
