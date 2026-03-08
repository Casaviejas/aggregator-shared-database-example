export interface GetProfileParams {
  id: string;
  token: string;
}

export interface UpdateProfileParams {
  id: string;
  token: string;
  userData: {
    name?: string;
    email?: string;
  };
}

export interface DeleteProfileParams {
  id: string;
  token: string;
}

export interface AuthHeaders {
  Authorization: string;
  "Content-Type": string;
}