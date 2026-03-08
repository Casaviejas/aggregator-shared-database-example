import type {
  AuthHeaders,
  DeleteProfileParams,
  GetProfileParams,
  UpdateProfileParams,
} from "../types/schemas";

export async function getProfile(params: GetProfileParams) {}

export async function updateProfile(params: UpdateProfileParams) {}

export async function deleteProfile(params: DeleteProfileParams) {}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getAuthHeaders(): AuthHeaders {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
